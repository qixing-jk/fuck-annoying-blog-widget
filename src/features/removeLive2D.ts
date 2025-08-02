import { watchAndDestroy } from '../utils'

export default function removeLive2D() {
  const ELEMENT_ID = 'live2d-widget'
  watchAndDestroy(`#${ELEMENT_ID}`)
}
