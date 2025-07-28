import { EventInterceptor, EventInterceptorPayload } from '../services/eventInterceptorService'
import { COMMON_DOM_TARGETS } from '../constants'
import { PropertyInterceptorPayload } from '../services/propertyInterceptorService'

const eventInterceptor: EventInterceptor = (type) => {
  if (type === 'click') {
    console.log('Interceptor is active and blocked a "click" listener.')
    return true
  }
  return false
}

export const propertyInterceptors: PropertyInterceptorPayload[] = [
  {
    targetList: COMMON_DOM_TARGETS,
    propertyName: 'onclick',
    setter: () => true, // 直接返回 true 来阻止任何赋值
    getter: () => undefined, // 返回 undefined 表示我们不关心谁来读取它，但这个 getter 必须存在才能覆盖
  },
]

export const eventInterceptorPayload: EventInterceptorPayload = {
  eventInterceptorTargetList: COMMON_DOM_TARGETS,
  eventInterceptor,
}

export default function removeClickEffects() {
  console.log('remove click effects')
}
