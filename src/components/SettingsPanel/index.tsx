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
    window.location.reload()
  }

  return (
    <>
      <style>{styleText}</style>
      <div className={styles.mask}>
        <div className={styles.panel}>
          <h2 className={styles.title}>{t('panelTitle')}</h2>
          <div className={styles.tabs}>
            <button
              className={[
                styles.tabBtn,
                styles.tabBtnLeft,
                tab === 'site' ? styles.tabBtnActive : '',
              ].join(' ')}
              onClick={() => setTab('site')}
            >
              {t('currentSiteConfigTab', '当前站点配置')}
            </button>
            <button
              className={[
                styles.tabBtn,
                styles.tabBtnRight,
                tab === 'global' ? styles.tabBtnActive : '',
              ].join(' ')}
              onClick={() => setTab('global')}
            >
              {t('globalConfigTab', '全局配置')}
            </button>
          </div>
          <div className={styles.featureList}>
            {featureKeys.map((key) => (
              <div key={key} className={styles.featureItem}>
                <label title={t(`features:${key}.description`, '')}>
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
          <button className={styles.saveBtn} onClick={handleSave}>
            {t('save', '保存')}
          </button>
          {onClose && (
            <button className={styles.closeBtn} onClick={onClose} title={t('closeTitle')}>
              ×
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default SettingsPanel
