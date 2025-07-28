import { SiteConfig } from '../types'

// 定义各种拦截器的函数签名
export type PropertySetterInterceptor = (value: any) => boolean // 返回 true 表示成功拦截并阻止后续
export type PropertyGetterInterceptor = () => any // 返回非 undefined 的值表示成功拦截并返回值

// 定义一个功能模块需要提供的拦截器载荷
export interface PropertyInterceptorPayload {
  targetList: EventTarget | EventTarget[] // 拦截的目标对象，如 document, window
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
 * 将所有注册规则按“目标对象 -> 属性名”进行分组。
 * 支持单个对象或对象数组作为 target。
 * @param registrations - 原始的规则注册列表。
 * @returns 分组后的 Map。
 */
function groupRegistrations(
  registrations: PropertyInterceptorRegistration[]
): Map<object, Map<string, PropertyInterceptorRegistration[]>> {
  const grouped = new Map<object, Map<string, PropertyInterceptorRegistration[]>>()

  for (const reg of registrations) {
    // 统一处理，将单个 target 和数组 target 都视为数组
    const targets = Array.isArray(reg.targetList) ? reg.targetList : [reg.targetList]

    for (const target of targets) {
      // 为每个 target 获取或创建属性映射
      if (!grouped.has(target)) {
        grouped.set(target, new Map())
      }
      const propertyMap = grouped.get(target)!

      // 为每个属性获取或创建规则列表
      if (!propertyMap.has(reg.propertyName)) {
        propertyMap.set(reg.propertyName, [])
      }
      propertyMap.get(reg.propertyName)!.push(reg)
    }
  }

  return grouped
}

/**
 * 工厂函数：创建一个被拦截的 setter 函数。
 * @param ruleList - 应用于此属性的所有规则。
 * @param originalDescriptor - 原始属性描述符。
 * @param activeConfig - 当前激活的功能配置。
 * @param propertyName - 属性名（用于日志）。
 * @returns 一个新的 setter 函数。
 */
function createInterceptorSetter(
  ruleList: PropertyInterceptorRegistration[],
  originalDescriptor: PropertyDescriptor | undefined,
  activeConfig: Partial<SiteConfig>,
  propertyName: string
): (value: any) => void {
  return function setter(this: any, value: any) {
    // 决策逻辑：任何一个已启用的拦截器成功阻止，就立即停止
    for (const rule of ruleList) {
      if (activeConfig[rule.featureName] && rule.setter) {
        // 如果 setter 返回 true，则表示拦截成功并阻止后续操作
        if (rule.setter.call(this, value) === true) {
          console.log(
            `[Purify] Setter for "${propertyName}" blocked by feature "${rule.featureName}".`
          )
          return // 成功拦截，直接返回
        }
      }
    }

    // 如果没有任何拦截器阻止，则调用原始的 setter (如果存在)
    originalDescriptor?.set?.call(this, value)
  }
}

/**
 * 工厂函数：创建一个被拦截的 getter 函数。
 * @param ruleList - 应用于此属性的所有规则。
 * @param originalDescriptor - 原始属性描述符。
 * @param activeConfig - 当前激活的功能配置。
 * @param propertyName - 属性名（用于日志）。
 * @returns 一个新的 getter 函数。
 */
function createInterceptorGetter(
  ruleList: PropertyInterceptorRegistration[],
  originalDescriptor: PropertyDescriptor | undefined,
  activeConfig: Partial<SiteConfig>,
  propertyName: string
): () => any {
  return function getter(this: any) {
    // 决策逻辑：返回第一个已启用的拦截器提供的非 undefined 值
    for (const rule of ruleList) {
      if (activeConfig[rule.featureName] && rule.getter) {
        const result = rule.getter.call(this)
        if (result !== undefined) {
          console.log(
            `[Purify] Getter for "${propertyName}" intercepted by feature "${rule.featureName}".`
          )
          return result // 成功拦截，返回值
        }
      }
    }

    // 如果没有任何拦截器返回值，则调用原始的 getter (如果存在)
    return originalDescriptor?.get?.call(this)
  }
}

export function installPropertyInterceptor(activeConfig: Partial<SiteConfig>) {
  if (isInstalled) return
  console.log('[Purify] Installing Property Interceptor Service...')

  const groupedRegistrations = groupRegistrations(registrations)

  for (const [target, propertyMap] of groupedRegistrations.entries()) {
    // 为每个目标对象维护一个已拦截属性的集合
    if (!interceptedProperties.has(target)) {
      interceptedProperties.set(target, new Set())
    }
    const interceptedSet = interceptedProperties.get(target)!

    for (const [propertyName, ruleList] of propertyMap.entries()) {
      if (interceptedSet.has(propertyName)) continue // 防止重复拦截

      const originalDescriptor = Object.getOwnPropertyDescriptor(target, propertyName)
      if (originalDescriptor?.configurable === false) {
        console.warn(
          `[Purify] Property "${propertyName}" on`,
          target,
          `is not configurable and cannot be intercepted.`
        )
        continue
      }

      Object.defineProperty(target, propertyName, {
        configurable: true, // 建议为 true，以便于测试或未来的移除操作
        set: createInterceptorSetter(ruleList, originalDescriptor, activeConfig, propertyName),
        get: createInterceptorGetter(ruleList, originalDescriptor, activeConfig, propertyName),
      })

      interceptedSet.add(propertyName)
    }
  }

  isInstalled = true
  console.log('[Purify] Property Interceptor Service installed successfully.')
}
