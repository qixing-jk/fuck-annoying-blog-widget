import { watchAndDestroy } from '../utils'

export default function removeLive2D() {
  const elementSelectorList = ['#live2d-widget', '#waifu']
  for (const selector of elementSelectorList) {
    watchAndDestroy(selector)
  }
}
