import { PropertyInterceptorPayload } from '../services/propertyInterceptorService'
import { watchAndDestroy } from '../utils'

export const propertyInterceptors: PropertyInterceptorPayload[] = [
  {
    targetList: window,
    propertyName: 'startSakura',
    setter: () => true, // 直接返回 true 来阻止任何赋值
    getter: () => undefined, // 返回 undefined 表示我们不关心谁来读取它，但这个 getter 必须存在才能覆盖
  },
]

function removeSakuraEffect() {
  const ELEMENT_ID = 'canvas_sakura'
  watchAndDestroy(`#${ELEMENT_ID}`, () => {
    const canvas = document.getElementById(ELEMENT_ID)
    if (canvas) {
      canvas.remove()
      console.log('[Sakura Blocker] canvas removed.')
    }
  })
}

export default function removeBackgroundEffects() {
  console.log('remove background effects')
  removeSakuraEffect()
}
