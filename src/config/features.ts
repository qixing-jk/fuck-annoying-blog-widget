import { FeatureFunction, FeatureKey } from '../types'
import {
  EventInterceptorPayload,
  registerEventInterceptor,
} from '../services/eventInterceptorService'
import {
  PropertyInterceptorPayload,
  registerPropertyInterceptor,
} from '../services/propertyInterceptorService'
import { createLogger } from '../utils/logger'
import i18n from 'i18next'
import { defaultGlobalConfig } from './index'

// 功能模块结构
interface FeatureModule {
  default: FeatureFunction
  eventInterceptorPayload?: EventInterceptorPayload
  propertyInterceptors?: PropertyInterceptorPayload[]
}

export const featureKeys = Object.keys(defaultGlobalConfig) as FeatureKey[]
export const featureRegistry: Partial<Record<FeatureKey, FeatureFunction>> = {}

const logger = createLogger('features')

// 自动注册功能到 featureRegistry
const modules = import.meta.glob<true, string, FeatureModule>('../features/*.ts', { eager: true })
for (const path in modules) {
  const module = modules[path]
  const keyMatch = path.match(/\/(\w+)\.ts$/)
  if (keyMatch && featureKeys.includes(keyMatch[1] as FeatureKey)) {
    const featureName = keyMatch[1] as FeatureKey
    featureRegistry[featureName] = module.default
    if (module.eventInterceptorPayload) {
      logger.info(i18n.t('features:loadFeatures.eventInterceptorFound', { featureName }))
      registerEventInterceptor({ featureName, ...module.eventInterceptorPayload })
    }
    if (module.propertyInterceptors) {
      logger.info(i18n.t('features:loadFeatures.propertyInterceptorsFound', { featureName }))
      for (const payload of module.propertyInterceptors) {
        registerPropertyInterceptor({ featureName, ...payload })
      }
    }
  }
}
