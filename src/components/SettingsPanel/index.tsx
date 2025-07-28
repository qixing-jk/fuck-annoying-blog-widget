import React, { useEffect, useState } from 'react'
import { getConfigForCurrentSite, saveConfigForCurrentSite } from '../../services/configService'
import { featureKeys } from '../../config/features'
import { useTranslation } from 'react-i18next'

interface SettingsPanelProps {
  onClose?: () => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [config, setConfig] = useState<any>({})
  const { t } = useTranslation()

  useEffect(() => {
    setConfig(getConfigForCurrentSite())
  }, [])

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...config, [key]: e.target.checked }
    setConfig(updated)
    saveConfigForCurrentSite({ [key]: e.target.checked })
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
          width: 340,
          boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <h2 style={{ marginBottom: 16, textAlign: 'center' }}>{t('panelTitle')}</h2>
        {featureKeys.map((key) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label>
              <input type="checkbox" checked={!!config[key]} onChange={handleChange(key)} />{' '}
              {t(`features:${key}.label`)}
            </label>
          </div>
        ))}
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
