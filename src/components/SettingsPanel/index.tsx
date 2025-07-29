import React, { useEffect, useState } from 'react'
import {
  getAllConfigs,
  getConfigForCurrentSite,
  saveConfigForCurrentSite,
  saveGlobalConfig,
} from '../../services/configService'
import { featureKeys } from '../../config/features'
import { useTranslation } from 'react-i18next'

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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.15)',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 8,
          width: 360,
          boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <h2 style={{ marginBottom: 16, textAlign: 'center' }}>{t('panelTitle')}</h2>
        <div style={{ display: 'flex', marginBottom: 20 }}>
          <button
            style={{
              flex: 1,
              padding: 8,
              borderBottom: tab === 'site' ? '2px solid #1677ff' : '2px solid #eee',
              background: 'none',
              fontWeight: tab === 'site' ? 'bold' : 'normal',
              color: tab === 'site' ? '#1677ff' : '#333',
              cursor: 'pointer',
              borderTopLeftRadius: 6,
              borderTopRightRadius: 0,
              border: 'none',
              outline: 'none',
            }}
            onClick={() => setTab('site')}
          >
            {t('currentSiteConfigTab', '当前站点配置')}
          </button>
          <button
            style={{
              flex: 1,
              padding: 8,
              borderBottom: tab === 'global' ? '2px solid #1677ff' : '2px solid #eee',
              background: 'none',
              fontWeight: tab === 'global' ? 'bold' : 'normal',
              color: tab === 'global' ? '#1677ff' : '#333',
              cursor: 'pointer',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 6,
              border: 'none',
              outline: 'none',
            }}
            onClick={() => setTab('global')}
          >
            {t('globalConfigTab', '全局配置')}
          </button>
        </div>
        <div style={{ minHeight: 220 }}>
          {featureKeys.map((key) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label>
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
        <button
          style={{
            width: '100%',
            padding: '10px 0',
            background: '#1677ff',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontWeight: 'bold',
            fontSize: 16,
            marginTop: 16,
            cursor: 'pointer',
            letterSpacing: 1,
          }}
          onClick={handleSave}
        >
          {t('save', '保存')}
        </button>
        {onClose && (
          <button
            style={{
              position: 'absolute',
              top: 12,
              right: 16,
              background: 'transparent',
              border: 'none',
              fontSize: 22,
              cursor: 'pointer',
              color: '#999',
            }}
            onClick={onClose}
            title={t('closeTitle')}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default SettingsPanel
