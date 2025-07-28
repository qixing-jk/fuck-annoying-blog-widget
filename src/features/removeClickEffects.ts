import {EventInterceptor} from "../services/eventInterceptorService.ts";

export const eventInterceptor: EventInterceptor = (type) => {
  if (type === 'visibilitychange') {
    console.log('Interceptor is active and blocked a "visibilitychange" listener.');
    return true;
  }
  return false;
};
export default function removeClickEffects() {
  console.log('[Tampermonkey] remove click effects');
  // Approximate implementation: removes click effect elements from the page
  if (typeof document !== 'undefined') {
    const clickEffects = document.querySelectorAll('.click-effect');
    clickEffects.forEach(effect => effect.remove());
  }
}
