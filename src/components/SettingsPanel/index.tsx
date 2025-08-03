import React, { useEffect, useState } from 'react'
import {
  getAllConfigs,
  getConfigForCurrentSite,
  saveConfigForCurrentSite,
  saveGlobalConfig,
} from '../../services/configService'
import { featureKeys } from '../../config/features'
import { useTranslation } from 'react-i18next'
import styles from './index.module.css'
import styleText from './index.module.css?inline'
import pkg from '../../../package.json'
import { showModal } from '../Modal'
import { showBanner } from '../Banner'
import Index from '../SwitchPill'

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

  return (
    <>
      <style>{styleText}</style>
      <div className={styles.mask}>
        <div className={styles.panel}>
          {/* 顶部关闭按钮单独一行 */}
          <div className={styles.headerBar}>
            {onClose && (
              <button
                className={styles.closeBtn}
                onClick={handlePanelClose}
                title={t('common:closeTitle')}
              >
                ×
              </button>
            )}
          </div>
          {/* 标题和版本号一行 */}
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{t('common:panelTitle')}</h2>
            <span className={styles.version}>V{pkg.version}</span>
          </div>
          <div className={styles.tabs}>
            <button
              className={[
                styles.tabBtn,
                styles.tabBtnLeft,
                tab === 'site' ? styles.tabBtnActive : '',
              ].join(' ')}
              onClick={() => handleTabSwitch('site')}
            >
              {t('common:currentSiteConfigTab')}
            </button>
            <button
              className={[
                styles.tabBtn,
                styles.tabBtnRight,
                tab === 'global' ? styles.tabBtnActive : '',
              ].join(' ')}
              onClick={() => handleTabSwitch('global')}
            >
              {t('common:globalConfigTab')}
            </button>
          </div>
          <div className={styles.featureList}>
            {featureKeys.map((key) => (
              <div key={key} className={styles.featureItemRow}>
                <div className={styles.featureItemLabel} title={t(`features:${key}.description`)}>
                  {t(`features:${key}.label`)}
                </div>
                <div className={styles.featureItemControl}>
                  <Index
                    checked={tab === 'site' ? !!siteConfig[key] : !!globalConfig[key]}
                    onChange={handleChange(key, tab)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 新增底部操作区 */}
          <div className={styles.footerBar}>
            <div>
              <button className={styles.saveBtn} onClick={handleSave}>
                {t('common:save')}
              </button>
              <button className={styles.saveBtn} onClick={handleSaveAndreFresh}>
                {t('common:saveAndRefresh')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPanel
