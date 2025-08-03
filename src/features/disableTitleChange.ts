import { EventInterceptor, EventInterceptorPayload } from '../services/eventInterceptorService'
import { PropertyInterceptorPayload } from '../services/propertyInterceptorService'
import { createLogger } from '../utils/logger'
import i18n from 'i18next'

const logger = createLogger('disableTitleChange')

export const propertyInterceptors: PropertyInterceptorPayload[] = [
  {
    targetList: document,
    propertyName: 'onvisibilitychange',
    setter: () => true, // 直接返回 true 来阻止任何赋值
    getter: () => undefined, // 返回 undefined 表示我们不关心谁来读取它，但这个 getter 必须存在才能覆盖
  },
]
const eventInterceptor: EventInterceptor = (type) => {
  const blockedEventType = 'visibilitychange'
  if (type === blockedEventType) {
    logger.info(i18n.t('services:eventInterceptor.blocked', { blockedEventType }))
    return true
  }
  return false
}

export const eventInterceptorPayload: EventInterceptorPayload = {
  eventInterceptor,
}
