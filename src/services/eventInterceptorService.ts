import { FeatureKey, SiteConfig } from '../types'
import { isElementInBlacklist } from '../utils'
import { createLogger } from '../utils/logger'
import i18n from 'i18next'
import { blockedEventType } from '../features/removeCursorTrailEffect'

/**
 * 定义一个拦截器的函数签名，保持不变。
 * @returns {boolean} true 表示阻止，false 表示放行。
 */
export type EventInterceptor = (
  type: string,
  listener: EventListenerOrEventListenerObject | null,
  options?: AddEventListenerOptions | boolean
) => boolean

// 定义一个功能模块需要提供的拦截器载荷
export interface EventInterceptorPayload {
  eventInterceptorTargetList?: EventTarget[]
  eventInterceptor: EventInterceptor
  blockedEventType?: string[]
}

/**
 * 定义拦截器注册对象的结构。
 * 它将功能名 (key) 和拦截器函数绑定在一起。
 */
export interface EventInterceptorRegistration extends EventInterceptorPayload {
  featureName: FeatureKey
}

// 存储所有注册的拦截器对象
const registrations: EventInterceptorRegistration[] = []
let isInstalled = false

const logger = createLogger('eventInterceptorService')

/**
 * 注册一个新的事件拦截器。
 * @param registration 包含功能名和拦截函数的注册对象。
 */
export function registerEventInterceptor(registration: EventInterceptorRegistration) {
  registrations.push(registration)
}

/**
 * 安装事件拦截服务，现在需要传入激活的配置。
 * @param activeConfig 一个对象，键是功能名，值是布尔值，表示该功能是否启用。
 */
export function installEventInterceptor(activeConfig: Partial<SiteConfig>) {
  if (isInstalled) {
    return
  }
  logger.info(i18n.t('services:eventInterceptor.install'), activeConfig)

  // 预先阻止已知的阻断事件类型，避免它们触发任何监听器
  for (const reg of registrations) {
    if (
      !activeConfig[reg.featureName] ||
      !reg.eventInterceptorTargetList ||
      blockedEventType.length === 0
    ) {
      continue
    }
    for (const eventTarget of reg.eventInterceptorTargetList) {
      blockedEventType.forEach((eventType) => {
        eventTarget.addEventListener(
          eventType,
          (e) => {
            e.stopImmediatePropagation()
          },
          true
        )
      })
    }
  }

  // 保存原始的 addEventListener 方法
  const originalAddEventListener = EventTarget.prototype.addEventListener

  // 重写 addEventListener 方法，拦截事件监听器的注册
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    logger.info(i18n.t('services:eventInterceptor.run'), {
      type,
      target: this,
    })

    // 遍历所有已注册的规则
    for (const reg of registrations) {
      // 核心检查：只有当这条规则所属的功能在配置中被启用
      if (activeConfig[reg.featureName]) {
        // 才去执行它的拦截函数。
        if (
          reg.eventInterceptor &&
          isElementInBlacklist(this, reg.eventInterceptorTargetList) &&
          reg.eventInterceptor(type, listener, options)
        ) {
          // 如果拦截函数决定阻止，则立即返回。
          return
        }
      }
    }

    // 如果所有已启用的拦截器都放行，则调用原始函数。
    return originalAddEventListener.call(this, type, listener, options)
  }

  isInstalled = true
  logger.info(i18n.t('services:eventInterceptor.installSuccess'))
}
