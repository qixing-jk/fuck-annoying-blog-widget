import { SiteConfig } from '../types'

// 定义各种拦截器的函数签名
export type PropertySetterInterceptor = (value: any) => boolean // 返回 true 表示成功拦截并阻止后续
export type PropertyGetterInterceptor = () => any // 返回非 undefined 的值表示成功拦截并返回值

// 定义一个功能模块需要提供的拦截器载荷
export interface PropertyInterceptorPayload {
  target: object // 拦截的目标对象，如 document, window
  propertyName: string // 目标属性名，如 'onvisibilitychange'
  setter?: PropertySetterInterceptor
  getter?: PropertyGetterInterceptor
}

// 定义服务内部存储的完整注册对象结构
export interface PropertyInterceptorRegistration extends PropertyInterceptorPayload {
  featureName: keyof SiteConfig
}

const registrations: PropertyInterceptorRegistration[] = []
let isInstalled = false

// 记录已拦截过的属性，防止重复 defineProperty
const interceptedProperties = new WeakMap<object, Set<string>>()

/**
 * 注册一个新的属性拦截器规则。
 */
export function registerPropertyInterceptor(registration: PropertyInterceptorRegistration) {
  registrations.push(registration)
}

/**
 * 安装属性拦截服务。
 * @param activeConfig 用户启用的功能配置
 */
export function installPropertyInterceptor(activeConfig: Partial<SiteConfig>) {
  if (isInstalled) return

  console.log('[Purify] Installing Property Interceptor Service...')

  // 将所有注册的规则按 "目标对象 -> 属性名" 进行分组
  const groupedRegistrations = new Map<object, Map<string, PropertyInterceptorRegistration[]>>()
  for (const reg of registrations) {
    if (!groupedRegistrations.has(reg.target)) {
      groupedRegistrations.set(reg.target, new Map())
    }
    const propertyMap = groupedRegistrations.get(reg.target)!
    if (!propertyMap.has(reg.propertyName)) {
      propertyMap.set(reg.propertyName, [])
    }
    propertyMap.get(reg.propertyName)!.push(reg)
  }

  // 遍历分组，对每个属性只进行一次 defineProperty
  for (const [target, propertyMap] of groupedRegistrations.entries()) {
    for (const [propertyName, ruleList] of propertyMap.entries()) {
      // 检查是否已拦截
      let interceptedSet = interceptedProperties.get(target)
      if (!interceptedSet) {
        interceptedSet = new Set()
        interceptedProperties.set(target, interceptedSet)
      }
      if (interceptedSet.has(propertyName)) {
        // 已拦截，跳过
        continue
      }

      // 关键：在修补前，保存原始的属性描述符
      const originalDescriptor = Object.getOwnPropertyDescriptor(target, propertyName)
      // 如果属性已存在且不可配置，则跳过
      if (originalDescriptor && originalDescriptor.configurable === false) {
        continue
      }

      Object.defineProperty(target, propertyName, {
        configurable: false,

        // 定义新的 set 存取器
        set: function (value) {
          // 决策逻辑：任何一个已启用的拦截器成功阻止，就立即停止
          for (const rule of ruleList) {
            if (activeConfig[rule.featureName] && rule.setter) {
              if (rule.setter.call(this, value) === true) {
                console.log(
                  `[Property Interceptor] Setter for "${propertyName}" blocked by feature "${rule.featureName}".`
                )
                return // 成功拦截，直接返回
              }
            }
          }
          // 如果没有任何拦截器阻止，则调用原始的 setter (如果存在)
          console.log(`[Property Interceptor] Setter for "${propertyName}" was not blocked.`)
          originalDescriptor?.set?.call(this, value)
        },

        // 定义新的 get 存取器
        get: function () {
          // 决策逻辑：返回第一个已启用的拦截器提供的非 undefined 值
          for (const rule of ruleList) {
            if (activeConfig[rule.featureName] && rule.getter) {
              const result = rule.getter.call(this)
              if (result !== undefined) {
                console.log(
                  `[Property Interceptor] Getter for "${propertyName}" intercepted by feature "${rule.featureName}".`
                )
                return result // 成功拦截，返回值
              }
            }
          }
          // 如果没有任何拦截器返回值，则调用原始的 getter (如果存在)
          console.log(`[Property Interceptor] Getter for "${propertyName}" was not intercepted.`)
          return originalDescriptor?.get?.call(this)
        },
      })
      // 标记为已拦截
      interceptedSet.add(propertyName)
    }
  }

  isInstalled = true
  console.log('[Purify] Property Interceptor Service installed successfully.')
}
