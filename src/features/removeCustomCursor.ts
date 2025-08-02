import { watchAndDestroy } from '../utils'

export default function removeCustomCursor() {
  const ELEMENT_ID = 'cursor'
  watchAndDestroy(`#${ELEMENT_ID}`)
  const style = document.createElement('style')
  style.textContent = `
        * {
            cursor: default !important;
        }
    `
  document.documentElement.appendChild(style)
}
