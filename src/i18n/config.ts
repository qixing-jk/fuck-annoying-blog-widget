import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {deepmerge} from 'deepmerge-ts';
import {DEFAULT_NS} from "../constants.ts";

// 1. 动态扫描所有 .json 翻译文件
const localeModules = import.meta.glob<true, string, any>('./**/*.json', {eager: true});
const namespaceSet: Set<string> = new Set();

// 2. 自动构建 i18next 需要的 resources 对象
const resources: Record<string, any> = {};
for (const path in localeModules) {
    const content = localeModules[path].default;

    // 从路径中解析出语言和命名空间
    // e.g., ./en/features.json -> ["en", "features"]
    const pathParts = path.replace('./', '').replace('.json', '').split('/');
    const lang = pathParts[0];
    const namespace = pathParts[1];
    namespaceSet.add(namespace);

    if (lang && namespace) {
        // 使用深度合并，确保不会覆盖同语言下的其他命名空间
        resources[lang] = deepmerge(resources[lang] || {}, {[namespace]: content});
    }
}

const NS: string[] = [...namespaceSet];

console.log('i18n resources loaded automatically:', NS, resources);

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // 明确定义我们拥有的命名空间
        ns: NS,
        defaultNS: DEFAULT_NS, // 设置默认命名空间
        fallbackLng: 'en', // 关键的后备语言
        resources,

        interpolation: {
            escapeValue: false,
        },
        debug: process.env.NODE_ENV === 'development', // 生产环境建议关闭
    });

export default i18n;