import { SiteConfig } from '../types'

/**
 * 定义一个拦截器的函数签名，保持不变。
 * @returns {boolean} true 表示阻止，false 表示放行。
 */
export type EventInterceptor = (
  type: string,
  listener: EventListenerOrEventListenerObject | null,
  options?: AddEventListenerOptions | boolean
) => boolean

/**
 * 定义拦截器注册对象的结构。
 * 它将功能名 (key) 和拦截器函数绑定在一起。
 */
export interface EventInterceptorRegistration {
  featureName: keyof SiteConfig // 使用 keyof SiteConfig 确保类型安全
  eventInterceptor: EventInterceptor
}

// 存储所有注册的拦截器对象
const registrations: EventInterceptorRegistration[] = []
let isInstalled = false

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

  console.log('[Purify] Installing Event Interceptor Service with config:', activeConfig)

  const originalAddEventListener = EventTarget.prototype.addEventListener

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    // 遍历所有已注册的规则
    for (const reg of registrations) {
      // 核心检查：只有当这条规则所属的功能在配置中被启用
      if (activeConfig[reg.featureName]) {
        // 才去执行它的拦截函数。
        if (reg.eventInterceptor && reg.eventInterceptor(type, listener, options)) {
          // 如果拦截函数决定阻止，则立即返回。
          return
        }
      }
    }

    // 如果所有已启用的拦截器都放行，则调用原始函数。
    return originalAddEventListener.call(this, type, listener, options)
  }

  isInstalled = true
  console.log('[Purify] Event Interceptor Service installed successfully.')
}
