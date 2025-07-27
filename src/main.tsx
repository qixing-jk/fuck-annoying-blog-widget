import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import {GM_registerMenuCommand} from '$';

import {getConfigForCurrentSite} from './services/configService';
import {featureRegistry} from './features'; // 直接导入注册表
import {SiteConfig} from './types';
import {ROOT_ELEMENT_ID} from "./constants.ts";

// 核心净化逻辑

// 1. 获取当前网站的激活配置
const activeConfig = getConfigForCurrentSite();

// 2. 遍历激活的配置项
for (const key in activeConfig) {
    const featureName = key as keyof SiteConfig;
    const isEnabled = activeConfig[featureName];

    // 3. 如果配置为 true，并且该功能存在于注册表中
    if (isEnabled && featureRegistry[featureName]) {
        try {
            // 4. 动态调用执行函数
            featureRegistry[featureName]();
        } catch (error) {
            console.error(`[Purify] Error executing feature: ${featureName}`, error);
        }
    }
}

ReactDOM.createRoot(
    (() => {
        const app = document.createElement('div');
        app.id = ROOT_ELEMENT_ID
        document.body.append(app);
        return app;
    })(),
).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
);

GM_registerMenuCommand('网站净化设置', () => {
    if (typeof window.toggleSettingsPanel === 'function') {
        window.toggleSettingsPanel();
    }
});
