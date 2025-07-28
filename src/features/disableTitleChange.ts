import {EventInterceptor} from '../services/eventInterceptorService';
import {PropertyInterceptorPayload} from "../services/propertyInterceptorService";

export const propertyInterceptors: PropertyInterceptorPayload[] = [
    {
        target: document,
        propertyName: 'onvisibilitychange',
        setter: () => true, // 直接返回 true 来阻止任何赋值
        getter: () => undefined // 返回 undefined 表示我们不关心谁来读取它，但这个 getter 必须存在才能覆盖
    }
];
export const eventInterceptor: EventInterceptor = (type) => {
    if (type === 'visibilitychange') {
        console.log('Event Interceptor is active and blocked a "visibilitychange" listener.');
        return true;
    }
    return false;
};
