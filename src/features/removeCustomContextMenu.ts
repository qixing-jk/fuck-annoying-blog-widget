import { PropertyInterceptorPayload } from '../services/propertyInterceptorService'
import { COMMON_DOM_TARGETS } from '../constants'

export const propertyInterceptors: PropertyInterceptorPayload[] = [
  {
    targetList: COMMON_DOM_TARGETS,
    propertyName: 'oncontextmenu',
    setter: () => true, // 直接返回 true 来阻止任何赋值
    getter: () => undefined, // 返回 undefined 表示我们不关心谁来读取它，但这个 getter 必须存在才能覆盖
  },
]

export default function removeCustomContextMenu() {}
