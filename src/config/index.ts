import { AllConfigs, FeatureFunction, SiteConfig } from '../types'
import i18n from 'i18next'
import { createLogger } from '../utils/logger'

// 自动生成全局默认配置 (默认所有功能都关闭)
const featureModules = import.meta.glob<true, string, { default: FeatureFunction }>(
  '../features/*.ts',
  { eager: true }
)

const defaultGlobalConfig: Partial<SiteConfig> = {}

for (const path in featureModules) {
  const match = path.match(/\/(\w+)\.ts$/)
  if (match) {
    const featureName = match[1]
    if (featureName !== 'index') {
      // 自动为发现的每个功能设置默认值为 false
      defaultGlobalConfig[featureName as keyof SiteConfig] = false
    }
  }
}

// 定义特定网站准备的、覆盖全局的预设值
const siteSpecificDefaults: AllConfigs = {
  // 网站预设
  // "example.com": {
  //     disableTitleChange: true,
  //     removeBackgroundEffects: true,
  //     removeMusicPlayer: true,
  //     removeCustomCursor: true,
  //     removeLive2D: true,
  //     removeClickEffects: true
  // }
}

// 组合成最终的默认配置对象并导出
export const defaultConfigs: AllConfigs = {
  global: defaultGlobalConfig,
  ...siteSpecificDefaults,
}

const logger = createLogger('config')
// 打印日志，方便在开发时确认默认配置是否正确生成
logger.info(i18n.t('config:defaultConfigs'), defaultConfigs)
