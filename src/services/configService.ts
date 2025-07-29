import { AllConfigs, SiteConfig } from '../types'
import { defaultConfigs } from '../config' // ❗ 导入我们动态生成的默认配置
import { GM_getValue, GM_setValue } from '$'
import { STORAGE_KEY } from '../constants'

// 获取所有配置
export function getAllConfigs(): AllConfigs {
  return GM_getValue(STORAGE_KEY, defaultConfigs)
}

// 读取当前网站的配置，如果不存在则返回一个空对象
export function getConfigForCurrentSite(): Partial<SiteConfig> {
  const allStoredConfigs = getAllConfigs()
  // 注意：这里的 'global' 是指用户存储的全局设置，它会覆盖我们的默认全局设置
  const globalConfig = allStoredConfigs['global'] || {}
  const hostConfig = allStoredConfigs[window.location.hostname] || {}

  // 合并顺序：默认全局配置 -> 用户存储的全局配置 -> 用户存储的站点配置
  return { ...defaultConfigs.global, ...globalConfig, ...hostConfig }
}

// 保存对当前网站的配置修改
export function saveConfigForCurrentSite(newConfig: Partial<SiteConfig>) {
  const allStoredConfigs = getAllConfigs()
  allStoredConfigs[window.location.hostname] = {
    ...allStoredConfigs[window.location.hostname],
    ...newConfig,
  }
  GM_setValue(STORAGE_KEY, allStoredConfigs)
}

// 保存全局配置
export function saveGlobalConfig(newConfig: Partial<SiteConfig>) {
  const allStoredConfigs = getAllConfigs()
  allStoredConfigs['global'] = {
    ...allStoredConfigs['global'],
    ...newConfig,
  }
  GM_setValue(STORAGE_KEY, allStoredConfigs)
}
