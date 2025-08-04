import { AllConfigs, SiteConfig } from '../types'
import { defaultConfigs } from '../config' // ❗ 导入我们动态生成的默认配置
import { GM_getValue, GM_setValue } from '$'
import { STORAGE_KEY } from '../constants'
import { deepmergeNoArray } from '../utils'

// 获取所有配置
export function getAllConfigs(): AllConfigs {
  return GM_getValue(STORAGE_KEY, defaultConfigs)
}

// 读取当前网站的配置，如果不存在则返回一个空对象
export function getConfigForCurrentSite(): Partial<SiteConfig> {
  const allStoredConfigs = getAllConfigs()
  const globalConfig = allStoredConfigs['global'] || {}
  const hostConfig = allStoredConfigs[window.location.hostname] || {}

  // 深度合并：默认全局 -> 用户全局 -> 用户站点
  return deepmergeNoArray(defaultConfigs.global, globalConfig, hostConfig)
}

// 保存对当前网站的配置修改
export function saveConfigForCurrentSite(newConfig: Partial<SiteConfig>) {
  const allStoredConfigs = getAllConfigs()
  const oldHostConfig = allStoredConfigs[window.location.hostname] || {}

  allStoredConfigs[window.location.hostname] = deepmergeNoArray(oldHostConfig, newConfig)
  GM_setValue(STORAGE_KEY, allStoredConfigs)
}

// 保存全局配置
export function saveGlobalConfig(newConfig: Partial<SiteConfig>) {
  const allStoredConfigs = getAllConfigs()
  const oldGlobalConfig = allStoredConfigs['global'] || {}

  allStoredConfigs['global'] = deepmergeNoArray(oldGlobalConfig, newConfig)
  GM_setValue(STORAGE_KEY, allStoredConfigs)
}
