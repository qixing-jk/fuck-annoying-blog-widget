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
import { defaultAutoExpandCodeBlocksConfig } from '../../config'
import FeatureList from './FeatureList'

interface SettingsPanelProps {
  onClose?: () => void
}

export type TabType = 'site' | 'global'
const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [tab, setTab] = useState<TabType>('site')
  const [siteConfig, setSiteConfig] = useState<any>({})
  const [globalConfig, setGlobalConfig] = useState<any>({})
  const { t } = useTranslation()

  useEffect(() => {
    // Ensure autoExpandCodeBlocks has proper structure when initializing
    const siteConfig = getConfigForCurrentSite()
    if (
      siteConfig.autoExpandCodeBlocks &&
      !Array.isArray(siteConfig.autoExpandCodeBlocks.selectors)
    ) {
      siteConfig.autoExpandCodeBlocks.selectors = BUTTON_SELECTORS
    }
    siteConfig.autoExpandCodeBlocks = {
      ...(siteConfig.autoExpandCodeBlocks || {}),
      ...defaultAutoExpandCodeBlocksConfig,
    }
    setSiteConfig(siteConfig)

    const all = getAllConfigs()
    const globalConfig = all['global'] || {}
    if (
      globalConfig.autoExpandCodeBlocks &&
      !Array.isArray(globalConfig.autoExpandCodeBlocks.selectors)
    ) {
      globalConfig.autoExpandCodeBlocks.selectors = BUTTON_SELECTORS
    }
    setGlobalConfig(globalConfig)
  }, [])

  const isSiteDirty = () => JSON.stringify(siteConfig) !== JSON.stringify(getConfigForCurrentSite())
  const isGlobalDirty = () => {
    const all = getAllConfigs()
    return JSON.stringify(globalConfig) !== JSON.stringify(all['global'] || {})
  }

  const handleChange = (key: string, type: TabType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (type === 'site') {
      setSiteConfig((prev: any) => {
        // For autoExpandCodeBlocks, we need to preserve the existing config and just update the enabled state
        if (key === 'autoExpandCodeBlocks') {
          return {
            ...prev,
            [key]: {
              ...(prev[key] || { selectors: BUTTON_SELECTORS }),
              enabled: value,
            },
          }
        }
        // For other features, just update the value directly
        return { ...prev, [key]: value }
      })
    } else {
      setGlobalConfig((prev: any) => {
        if (key === 'autoExpandCodeBlocks') {
          return {
            ...prev,
            [key]: {
              ...(prev[key] || { selectors: BUTTON_SELECTORS }),
              enabled: value,
            },
          }
        }
        return { ...prev, [key]: value }
      })
    }
  }

  const handleSelectorsChange = (e: React.ChangeEvent<HTMLTextAreaElement>, type: TabType) => {
    const selectors = e.target.value.split('\n').filter((s) => s.trim())

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
  const confirmAndSaveIfDirty = async (dirtyCheckFn: () => boolean, saveFn: () => void, t: any) => {
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
    const proceed = await confirmAndSaveIfDirty(dirtyCheck, save, t)
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
    const proceed = await confirmAndSaveIfDirty(dirtyCheck, save, t)
    if (proceed && onClose) onClose()
    // 取消时不关闭面板
  }

  // HeaderBar 子组件
  const HeaderBar: React.FC<{ onClose?: () => void; closeTitle: string }> = ({
    onClose,
    closeTitle,
  }) => (
    <div className={styles.headerBar}>
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose} title={closeTitle}>
          ×
        </button>
      )}
    </div>
  )

  // TitleRow 子组件
  const TitleRow: React.FC<{ title: string; version: string }> = ({ title, version }) => (
    <div className={styles.titleRow}>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.version}>V{version}</span>
    </div>
  )

  // Tabs 子组件
  interface TabsProps {
    tab: TabType
    onTabSwitch: (tab: TabType) => void
    siteLabel: string
    globalLabel: string
  }

  const Tabs: React.FC<TabsProps> = ({ tab, onTabSwitch, siteLabel, globalLabel }) => (
    <div className={styles.tabs}>
      <button
        className={[
          styles.tabBtn,
          styles.tabBtnLeft,
          tab === 'site' ? styles.tabBtnActive : '',
        ].join(' ')}
        onClick={() => onTabSwitch('site')}
      >
        {siteLabel}
      </button>
      <button
        className={[
          styles.tabBtn,
          styles.tabBtnRight,
          tab === 'global' ? styles.tabBtnActive : '',
        ].join(' ')}
        onClick={() => onTabSwitch('global')}
      >
        {globalLabel}
      </button>
    </div>
  )

  // FooterBar 子组件
  const FooterBar: React.FC<{
    onSave: () => void
    onSaveAndRefresh: () => void
    saveText: string
    saveAndRefreshText: string
  }> = ({ onSave, onSaveAndRefresh, saveText, saveAndRefreshText }) => (
    <div className={styles.footerBar}>
      <div>
        <button className={styles.saveBtn} onClick={onSave}>
          {saveText}
        </button>
        <button className={styles.saveBtn} onClick={onSaveAndRefresh}>
          {saveAndRefreshText}
        </button>
      </div>
    </div>
  )

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
