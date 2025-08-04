import { AllConfigs, SiteConfig } from '../types'
import i18n from 'i18next'
import { createLogger } from '../utils/logger'

// 只负责配置类型和默认配置

// 默认全局配置（所有功能都关闭/默认）
export const defaultGlobalConfig: SiteConfig = {
  autoExpandCodeBlocks: false,
  removeClickEffects: false,
  disableTitleChange: false,
  removeBackgroundEffects: false,
  removeMusicPlayer: false,
  removeCustomCursor: false,
  removeLive2D: false,
  removeCustomContextMenu: false,
}

// 站点级预设（如有）
export const siteSpecificDefaults: AllConfigs = {
  // "example.com": {
  //   removeClickEffects: true
  // }
}

// 最终默认配置对象
export const defaultConfigs: AllConfigs = {
  global: defaultGlobalConfig,
  ...siteSpecificDefaults,
}

const logger = createLogger('config')
logger.info(i18n.t('config:defaultConfigs'), defaultConfigs)
