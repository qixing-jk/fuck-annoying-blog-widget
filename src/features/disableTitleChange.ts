import {EventInterceptor} from '../services/eventInterceptorService';

export const interceptor: EventInterceptor = (type) => {
    if (type === 'visibilitychange') {
        console.log('Interceptor is active and blocked a "visibilitychange" listener.');
        return true;
    }
    return false;
};


export default function disableTitleChange() {
    console.log('Disabling title change...');
    // 拦截 document.onvisibilitychange 的赋值
    Object.defineProperty(document, 'onvisibilitychange', {
        set: function () {
            console.log('Blocked assignment to onvisibilitychange');
        },
        get: function () {
            return undefined;
        },
        configurable: false
    });
}
