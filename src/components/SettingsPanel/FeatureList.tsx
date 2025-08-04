// FeatureList 子组件
import { FeatureKey } from '../../types'
import { featureKeys } from '../../config/features'
import { defaultAutoExpandCodeBlocksConfig } from '../../config'
import Index from '../SwitchPill'
import FeatureItemRow from './FeatureItemRow'
import { BUTTON_SELECTORS } from '../../constants'
import styles from './index.module.css'
import { t } from 'i18next'
import { TabType } from './Tabs'

interface FeatureListProps {
  config: any
  type: TabType
  onFeatureChange: (key: string, type: TabType) => (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelectorsChange: (e: React.ChangeEvent<HTMLTextAreaElement>, type: TabType) => void
}

const FeatureList: React.FC<FeatureListProps> = ({
  config,
  type,
  onFeatureChange,
  onSelectorsChange,
}) => {
  return (
    <>
      {featureKeys.map((key: FeatureKey) => {
        // Special handling for autoExpandCodeBlocks
        const label = t(`features:${key}.label`)
        const description = t(`features:${key}.description`)

        if (key === 'autoExpandCodeBlocks') {
          // Ensure we have a valid config with selectors array
          const value = config[key] || defaultAutoExpandCodeBlocksConfig
          return (
            <FeatureItemRow
              key={key}
              label={label}
              description={description}
              checked={value.enabled}
              onChange={onFeatureChange(key, type)}
              ControlComponent={Index}
            >
              {value.enabled && (
                <div className={styles.selectorContainer}>
                  <label
                    className={styles.selectorLabel}
                    title={t('features:autoExpandCodeBlocks.selectorsHint')}
                  >
                    {t('features:autoExpandCodeBlocks.selectorsLabel')}
                  </label>
                  <textarea
                    className={styles.selectorInput}
                    value={value.selectors?.join('\n') || ''}
                    onChange={(e) => onSelectorsChange(e, type)}
                    placeholder={BUTTON_SELECTORS.join('\n')}
                    rows={4}
                  />
                </div>
              )}
            </FeatureItemRow>
          )
        }

        // Default handling for other features
        const isEnabled = config[key]

        return (
          <FeatureItemRow
            key={key}
            label={label}
            description={description}
            checked={!!isEnabled}
            onChange={onFeatureChange(key, type)}
            ControlComponent={Index}
          />
        )
      })}
    </>
  )
}

export default FeatureList
