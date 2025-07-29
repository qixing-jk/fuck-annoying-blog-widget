import { watchAndDestroy } from '../utils'

export default function removeCustomCursor() {
  console.log('remove custom cursor')
  const ELEMENT_ID = 'cursor'
  watchAndDestroy(`#${ELEMENT_ID}`, {
    afterFound: () => {
      console.log('[Cursor Blocker] cursor removed.')
    },
  })
  const style = document.createElement('style')
  style.textContent = `
        * {
            cursor: default !important;
        }
    `
  document.documentElement.appendChild(style)
}
