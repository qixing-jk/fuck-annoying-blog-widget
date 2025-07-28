import {FeatureFunction, SiteConfig} from '../types';
import {EventInterceptor, registerInterceptor} from '../services/eventInterceptorService';
import {PropertyInterceptorPayload, registerPropertyInterceptor} from '../services/propertyInterceptorService';

// 定义功能模块应该导出的完整结构
interface FeatureModule {
    default: FeatureFunction;
    interceptor?: EventInterceptor; // 拦截器是可选的
    propertyInterceptors?: PropertyInterceptorPayload[];
}


export const featureKeys: string[] = [];
export const featureRegistry: Record<string, FeatureFunction> = {};
export const defaultGlobalConfig: Record<string, boolean> = {};

// 扫描所有功能模块
const modules = import.meta.glob<true, string, FeatureModule>('../features/*.ts', {eager: true});

for (const path in modules) {
    const module = modules[path];
    const keyMatch = path.match(/\/(\w+)\.ts$/);

    if (keyMatch && keyMatch[1] !== 'index') {
        // 自动从文件名中获取 featureName，不再有魔法字符串！
        const featureName = keyMatch[1] as keyof SiteConfig;

        // 填充其他注册表和配置
        featureKeys.push(featureName);
        featureRegistry[featureName] = module.default;
        defaultGlobalConfig[featureName] = false;

        // 检查模块是否导出了一个 'interceptor'
        if (module.interceptor) {
            console.log(`[Feature Loader] Found interceptor for feature: ${featureName}`);
            // 代表该模块，使用自动获取的 featureName 进行注册
            registerInterceptor({
                featureName: featureName,
                interceptor: module.interceptor
            });
        }

        if (module.propertyInterceptors) {
            console.log(`[Feature Loader] Found property interceptors for feature: ${featureName}`);
            // 遍历模块提供的所有拦截器载荷
            for (const payload of module.propertyInterceptors) {
                // 代表模块进行注册，并附加上 featureName
                registerPropertyInterceptor({
                    featureName: featureName,
                    ...payload
                });
            }
        }
    }
}