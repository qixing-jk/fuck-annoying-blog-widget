import React, { useEffect, useState } from 'react'
import {
  getAllConfigs,
  getConfigForCurrentSite,
  saveConfigForCurrentSite,
  saveGlobalConfig,
} from '../../services/configService'
import { useTranslation } from 'react-i18next'
import styles from './index.module.css'
import styleText from './index.module.css?inline'
import pkg from '../../../package.json'
import { showModal } from '../Modal'
import { showBanner } from '../Banner'
import { BUTTON_SELECTORS } from '../../constants'
import FeatureList from './FeatureList'
import HeaderBar from './HeaderBar'
import TitleRow from './TitleRow'
import Tabs, { TabType } from './Tabs'
import FooterBar from './FooterBar'
import { deepmergeNoArray } from '../../utils'

interface SettingsPanelProps {
  onClose?: () => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [tab, setTab] = useState<TabType>('site')
  const [siteConfig, setSiteConfig] = useState<any>({})
  const [globalConfig, setGlobalConfig] = useState<any>({})
  const { t } = useTranslation()

  useEffect(() => {
    // 初始化站点配置
    const siteConfig = getConfigForCurrentSite()
    setSiteConfig(siteConfig)

    // 初始化全局配置
    const allConfigs = getAllConfigs()
    const globalConfig = allConfigs['global']

    setGlobalConfig(globalConfig)
  }, [])

  const isSiteDirty = () => JSON.stringify(siteConfig) !== JSON.stringify(getConfigForCurrentSite())
  const isGlobalDirty = () => {
    const all = getAllConfigs()
    return JSON.stringify(globalConfig) !== JSON.stringify(all['global'] || {})
  }

  const handleChange = (key: string, type: TabType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    const updater = (prev: any) => {
      const patch =
        key === 'autoExpandCodeBlocks'
          ? { [key]: { enabled: value } } // deepmerge 会合并原 selectors
          : { [key]: value }

      return deepmergeNoArray(prev, patch)
    }

    if (type === 'site') {
      setSiteConfig(updater)
    } else {
      setGlobalConfig(updater)
    }
  }

  const handleSelectorsChange = (e: React.ChangeEvent<HTMLTextAreaElement>, type: TabType) => {
    const selectors = e.target.value.split('\n')

    const updateFn = (prev: any) => {
      // Ensure we have a proper autoExpandCodeBlocks object
      const currentConfig = prev.autoExpandCodeBlocks || {
        enabled: false,
        selectors: [...BUTTON_SELECTORS],
      }
      return {
        ...prev,
        autoExpandCodeBlocks: {
          ...currentConfig,
          selectors,
        },
      }
    }

    if (type === 'site') {
      setSiteConfig(updateFn)
    } else {
      setGlobalConfig(updateFn)
    }
  }

  // 通用的脏数据检测与保存确认流程
  const confirmAndSaveIfDirty = async (dirtyCheckFn: () => boolean, saveFn: () => void) => {
    if (dirtyCheckFn()) {
      const ok = await showModal({
        title: t('common:unsavedTitle'),
        content: t('common:unsavedContent'),
        okText: t('common:save'),
        cancelText: t('common:cancel'),
      })
      if (ok) {
        saveFn()
        return true
      }
      return false
    }
    return true
  }

  const handleTabSwitch = async (nextTab: TabType) => {
    const dirtyCheck = tab === 'site' ? isSiteDirty : isGlobalDirty
    const save =
      tab === 'site'
        ? () => saveConfigForCurrentSite(siteConfig)
        : () => saveGlobalConfig(globalConfig)
    const proceed = await confirmAndSaveIfDirty(dirtyCheck, save)
    if (proceed) setTab(nextTab)
    // 取消时什么都不做
  }

  const handleSave = () => {
    if (tab === 'site') {
      saveConfigForCurrentSite(siteConfig)
    } else {
      saveGlobalConfig(globalConfig)
    }
    showBanner(t('common:saveSuccess'), 'success')
  }

  const handleSaveAndreFresh = () => {
    handleSave()
    window.location.reload()
  }

  const handlePanelClose = async () => {
    const dirtyCheck = tab === 'site' ? isSiteDirty : isGlobalDirty
    const save =
      tab === 'site'
        ? () => saveConfigForCurrentSite(siteConfig)
        : () => saveGlobalConfig(globalConfig)
    await confirmAndSaveIfDirty(dirtyCheck, save)
    // 取消时也关闭面板
    onClose && onClose()
  }

  return (
    <>
      <style>{styleText}</style>
      <div className={styles.mask}>
        <div className={styles.panel}>
          {/* 顶部关闭按钮单独一行 */}
          <HeaderBar onClose={handlePanelClose} closeTitle={t('common:closeTitle')} />
          {/* 标题和版本号一行 */}
          <TitleRow title={t('common:panelTitle')} version={pkg.version} />
          <Tabs
            tab={tab}
            onTabSwitch={handleTabSwitch}
            siteLabel={t('common:currentSiteConfigTab')}
            globalLabel={t('common:globalConfigTab')}
          />
          <div className={styles.featureList}>
            {tab === 'site' ? (
              <FeatureList
                config={siteConfig}
                type="site"
                onFeatureChange={handleChange}
                onSelectorsChange={handleSelectorsChange}
              />
            ) : (
              <FeatureList
                config={globalConfig}
                type="global"
                onFeatureChange={handleChange}
                onSelectorsChange={handleSelectorsChange}
              />
            )}
          </div>
          {/* 新增底部操作区 */}
          <FooterBar
            onSave={handleSave}
            onSaveAndRefresh={handleSaveAndreFresh}
            saveText={t('common:save')}
            saveAndRefreshText={t('common:saveAndRefresh')}
          />
        </div>
      </div>
    </>
  )
}

export default SettingsPanel
