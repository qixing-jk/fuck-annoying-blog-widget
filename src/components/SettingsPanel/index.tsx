import React, { useEffect, useState } from 'react'
import {
  getAllConfigs,
  getConfigForCurrentSite,
  saveConfigForCurrentSite,
  saveGlobalConfig,
} from '../../services/configService'
import { featureKeys } from '../../config/features'
import { useTranslation } from 'react-i18next'
import styles from './SettingsPanel.module.css'
import styleText from './SettingsPanel.module.css?inline'
import pkg from '../../../package.json'

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

  const handleChange = (key: string, type: TabType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'site') {
      setSiteConfig((prev: any) => ({ ...prev, [key]: e.target.checked }))
    } else {
      setGlobalConfig((prev: any) => ({ ...prev, [key]: e.target.checked }))
    }
  }

  const handleSave = () => {
    if (tab === 'site') {
      saveConfigForCurrentSite(siteConfig)
    } else {
      saveGlobalConfig(globalConfig)
    }
    if (onClose) onClose()
  }

  const handleSaveAndreFresh = () => {
    handleSave()
    window.location.reload()
  }

  return (
    <>
      <style>{styleText}</style>
      <div className={styles.mask}>
        <div className={styles.panel}>
          {/* 顶部关闭按钮单独一行 */}
          <div className={styles.headerBar}>
            {onClose && (
              <button className={styles.closeBtn} onClick={onClose} title={t('common:closeTitle')}>
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
              onClick={() => setTab('site')}
            >
              {t('common:currentSiteConfigTab')}
            </button>
            <button
              className={[
                styles.tabBtn,
                styles.tabBtnRight,
                tab === 'global' ? styles.tabBtnActive : '',
              ].join(' ')}
              onClick={() => setTab('global')}
            >
              {t('common:globalConfigTab')}
            </button>
          </div>
          <div className={styles.featureList}>
            {featureKeys.map((key) => (
              <div key={key} className={styles.featureItem}>
                <label title={t(`features:${key}.description`)}>
                  <input
                    type="checkbox"
                    checked={tab === 'site' ? !!siteConfig[key] : !!globalConfig[key]}
                    onChange={handleChange(key, tab)}
                  />{' '}
                  {t(`features:${key}.label`)}
                </label>
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
