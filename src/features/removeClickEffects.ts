export const featureInfo = {
  label: "移除点击特效"
};
export default function removeClickEffects() {
  console.log('[Tampermonkey] remove click effects');
  // Approximate implementation: removes click effect elements from the page
  if (typeof document !== 'undefined') {
    const clickEffects = document.querySelectorAll('.click-effect');
    clickEffects.forEach(effect => effect.remove());
  }
}
