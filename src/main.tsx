import './i18n/config'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import { GM_registerMenuCommand } from '$'

import { getConfigForCurrentSite } from './services/configService'
import { featureRegistry } from './features' // 直接导入注册表
import { FeatureKey } from './types'
import { ROOT_ELEMENT_ID } from './constants'
import { installEventInterceptor } from './services/eventInterceptorService'
import { installPropertyInterceptor } from './services/propertyInterceptorService'
import i18n from 'i18next'
import { createLogger } from './utils/logger'

const logger = createLogger('main')
// 核心净化逻辑

// 获取当前网站的激活配置
const activeConfig = getConfigForCurrentSite()
installEventInterceptor(activeConfig)
installPropertyInterceptor(activeConfig)
// 遍历激活的配置项
for (const key in activeConfig) {
  const featureName = key as FeatureKey
  const isEnabled = activeConfig[featureName]

  // 如果配置为 true，并且该功能存在于注册表中
  if (isEnabled && featureRegistry[featureName]) {
    try {
      // 动态调用执行函数
      logger.info(i18n.t('features:executeFeatures.start', { featureName: featureName }))
      featureRegistry[featureName]()
      logger.info(i18n.t('features:executeFeatures.end', { featureName: featureName }))
    } catch (error) {
      logger.error(i18n.t('features:executeFeatures.error'), error)
    }
  }
}

// 创建一个变量来持有 React Root 的引用，初始为 null
let appRoot: ReactDOM.Root | null = null

// 注册菜单命令
GM_registerMenuCommand(i18n.t('common:panelTitle'), () => {
  // 检查 appRoot 是否已经被创建
  if (!appRoot) {
    // --- 首次点击，执行挂载逻辑 ---
    // 1. 创建挂载点和 Shadow DOM
    const appContainer = document.createElement('div')
    appContainer.id = ROOT_ELEMENT_ID
    document.body.append(appContainer)

    const shadowRoot = appContainer.attachShadow({ mode: 'open' })

    const shadowApp = document.createElement('div')
    shadowApp.id = 'shadow-app-root'
    shadowRoot.appendChild(shadowApp)

    // 2. 创建 React Root 并渲染 App
    appRoot = ReactDOM.createRoot(shadowApp)
    appRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } else {
    if (typeof window.toggleSettingsPanel === 'function') {
      window.toggleSettingsPanel()
    }
  }
})
