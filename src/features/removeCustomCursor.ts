export default function removeCustomCursor() {
  console.log('[Tampermonkey] remove custom cursor')
  // Approximate implementation: resets cursor to default
  if (typeof document !== 'undefined') {
    document.body.style.cursor = 'default'
    const customCursor = document.querySelector('.custom-cursor')
    if (customCursor) customCursor.remove()
  }
}
