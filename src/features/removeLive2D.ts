import { watchAndDestroy } from '../utils'

export default function removeLive2D() {
  console.log('remove Live2D')
  const ELEMENT_ID = 'live2d-widget'
  watchAndDestroy(`#${ELEMENT_ID}`, {
    afterFound: () => {
      console.log('[Sakura Blocker] canvas removed.')
    },
  })
}
