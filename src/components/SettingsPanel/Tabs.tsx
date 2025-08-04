import React from 'react'
import styles from './index.module.css'

export type TabType = 'site' | 'global'

interface TabsProps {
  tab: TabType
  onTabSwitch: (tab: TabType) => void
  siteLabel: string
  globalLabel: string
}

const Tabs: React.FC<TabsProps> = ({ tab, onTabSwitch, siteLabel, globalLabel }) => (
  <div className={styles.tabs}>
    <button
      className={`${styles.tabBtn} ${tab === 'site' ? styles.tabBtnActive : ''}`}
      onClick={() => onTabSwitch('site')}
    >
      {siteLabel}
    </button>
    <button
      className={`${styles.tabBtn} ${tab === 'global' ? styles.tabBtnActive : ''}`}
      onClick={() => onTabSwitch('global')}
    >
      {globalLabel}
    </button>
  </div>
)

export default Tabs
