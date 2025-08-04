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
import Index from '../SwitchPill'
import { featureKeys } from '../../config/features'

interface SettingsPanelProps {
  onClose?: () => void
}

type TabType = 'site' | 'global'

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [tab, setTab] = useState<TabType>('site')
  const [siteConfig, setSiteConfig] = useState<any>({})
  const [globalConfig, setGlobalConfig] = useState<any>({})
  const { t } = useTranslation()

  useEffect(() => {
    setSiteConfig(getConfigForCurrentSite())
    const all = getAllConfigs()
    setGlobalConfig(all['global'] || {})
  }, [])

  const isSiteDirty = () => JSON.stringify(siteConfig) !== JSON.stringify(getConfigForCurrentSite())
  const isGlobalDirty = () => {
    const all = getAllConfigs()
    return JSON.stringify(globalConfig) !== JSON.stringify(all['global'] || {})
  }

  const handleChange = (key: string, type: TabType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'site') {
      setSiteConfig((prev: any) => ({ ...prev, [key]: e.target.checked }))
    } else {
      setGlobalConfig((prev: any) => ({ ...prev, [key]: e.target.checked }))
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

  // FeatureItemRow 子组件，简化主渲染逻辑
  interface FeatureItemRowProps {
    label: string
    description: string
    checked: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    ControlComponent: React.FC<{
      checked: boolean
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }>
  }

  const FeatureItemRow: React.FC<FeatureItemRowProps> = ({
    label,
    description,
    checked,
    onChange,
    ControlComponent,
  }) => (
    <div className={styles.featureItemRow}>
      <div className={styles.featureItemLabel} title={description}>
        {label}
      </div>
      <div className={styles.featureItemControl}>
        <ControlComponent checked={checked} onChange={onChange} />
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
            {featureKeys.map((key) => (
              <FeatureItemRow
                key={key}
                label={t(`features:${key}.label`)}
                description={t(`features:${key}.description`)}
                checked={tab === 'site' ? !!siteConfig[key] : !!globalConfig[key]}
                onChange={handleChange(key, tab)}
                ControlComponent={Index}
              />
            ))}
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
