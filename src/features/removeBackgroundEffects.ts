export const featureInfo = {
  label: "移除背景特效"
};
export default function removeBackgroundEffects() {
  console.log('[Tampermonkey] remove background effects');
  // Approximate implementation: removes background effects from the page
  if (typeof document !== 'undefined') {
    const bgEffects = document.querySelectorAll('.background-effect');
    bgEffects.forEach(effect => effect.remove());
  }
}
