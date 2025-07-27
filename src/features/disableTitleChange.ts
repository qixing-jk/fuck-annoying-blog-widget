export const featureInfo = {
  label: "禁止网站修改标题"
};

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
