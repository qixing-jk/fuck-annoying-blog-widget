import { watchAndDestroy } from '../utils'

export default function removeLive2D() {
  console.log('remove Live2D')
  const ELEMENT_ID = 'live2d-widget'
  watchAndDestroy(`#${ELEMENT_ID}`, () => {
    const canvas = document.getElementById(ELEMENT_ID)
    if (canvas) {
      canvas.remove()
      console.log('[Sakura Blocker] canvas removed.')
    }
  })
}
