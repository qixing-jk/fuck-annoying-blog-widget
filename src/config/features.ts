import {FeatureFunction, SiteConfig} from '../types';

// 定义 UI 选项的类型
export interface FeatureOption {
    key: keyof SiteConfig;
    label: string;
}

// 定义功能模块应该导出的结构
interface FeatureModule {
    default: FeatureFunction;
    featureInfo: {
        label: string;
    };
}

// 核心：自动扫描、注册并生成配置
export const featureOptions: FeatureOption[] = []; // 用于 UI 的配置数组
export const featureRegistry: Record<string, FeatureFunction> = {}; // 用于执行的注册表
export const defaultGlobalConfig: Record<string, boolean> = {}; // 用于生成的默认配置

// 使用 import.meta.glob 扫描所有功能模块
const modules = import.meta.glob<true, string, FeatureModule>('../features/*.ts', {eager: true});

for (const path in modules) {
    const module = modules[path];
    const keyMatch = path.match(/\/(\w+)\.ts$/);

    // 确保模块符合我们的约定（有key，且不是index文件，并且导出了featureInfo）
    if (keyMatch && keyMatch[1] !== 'index' && module.featureInfo) {
        const key = keyMatch[1] as keyof SiteConfig;

        // 1. 填充功能注册表 (用于执行)
        featureRegistry[key] = module.default;

        // 2. 填充 UI 选项数组
        featureOptions.push({
            key: key,
            label: module.featureInfo.label
        });

        // 3. 填充全局默认配置对象
        defaultGlobalConfig[key] = false;
    }
}

// (可选但推荐) 按中文拼音或笔画排序，让UI显示更稳定有序
featureOptions.sort((a, b) => a.label.localeCompare(b.label, 'zh-Hans-CN'));

console.log('[Purify] UI options generated automatically:', featureOptions);