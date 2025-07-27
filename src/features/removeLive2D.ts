export const featureInfo = {
    label: "移除Live2D看板娘"
};
export default function removeLive2D() {
    console.log('[Tampermonkey] remove Live2D');
    // Approximate implementation: removes Live2D widgets from the page
    if (typeof document !== 'undefined') {
        const live2d = document.querySelectorAll('.live2d-widget');
        live2d.forEach(widget => widget.remove());
    }
}
