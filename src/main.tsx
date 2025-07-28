import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import {GM_registerMenuCommand} from '$';

import {getConfigForCurrentSite} from './services/configService';
import {featureRegistry} from './features'; // 直接导入注册表
import {SiteConfig} from './types';
import {ROOT_ELEMENT_ID} from "./constants.ts";
import {installEventInterceptor} from "./services/eventInterceptorService";
import {installPropertyInterceptor} from "./services/propertyInterceptorService";

// 核心净化逻辑

// 获取当前网站的激活配置
const activeConfig = getConfigForCurrentSite();
installEventInterceptor(activeConfig);
installPropertyInterceptor(activeConfig);
// 遍历激活的配置项
for (const key in activeConfig) {
    const featureName = key as keyof SiteConfig;
    const isEnabled = activeConfig[featureName];

    // 如果配置为 true，并且该功能存在于注册表中
    if (isEnabled && featureRegistry[featureName]) {
        try {
            // 动态调用执行函数
            featureRegistry[featureName]();
        } catch (error) {
            console.error(`[Purify] Error executing feature: ${featureName}`, error);
        }
    }
}

ReactDOM.createRoot(
    (() => {
        const app = document.createElement('div');
        app.id = ROOT_ELEMENT_ID;
        // 创建 ShadowRoot
        const shadowRoot = app.attachShadow({mode: 'open'});
        document.body.append(app);
        // 创建 shadow 下的挂载点
        const shadowApp = document.createElement('div');
        shadowApp.id = 'shadow-app-root';
        shadowRoot.appendChild(shadowApp);
        return shadowApp;
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
