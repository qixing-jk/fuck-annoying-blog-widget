
export default function disableTitleChange() {
  console.log('[Tampermonkey] Disabling title change...');
  // Approximate implementation: disables the ability to change the document title
  if (typeof document !== 'undefined') {
    Object.defineProperty(document, 'title', {
      set: () => {},
      configurable: false
    });
  }
}
