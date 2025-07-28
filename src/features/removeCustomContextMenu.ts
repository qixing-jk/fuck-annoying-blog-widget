import { PropertyInterceptorPayload } from '../services/propertyInterceptorService'

export const propertyInterceptors: PropertyInterceptorPayload[] = [
  {
    targetList: document,
    propertyName: 'oncontextmenu',
    setter: () => true, // 直接返回 true 来阻止任何赋值
    getter: () => undefined, // 返回 undefined 表示我们不关心谁来读取它，但这个 getter 必须存在才能覆盖
  },
  {
    targetList: window,
    propertyName: 'oncontextmenu',
    setter: () => true, // 直接返回 true 来阻止任何赋值
    getter: () => undefined, // 返回 undefined 表示我们不关心谁来读取它，但这个 getter 必须存在才能覆盖
  },
]

export default function removeCustomContextMenu() {
  console.log('Removing custom context menu...')
}
