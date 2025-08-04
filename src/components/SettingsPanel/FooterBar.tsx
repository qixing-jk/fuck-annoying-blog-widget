import React from 'react'
import styles from './index.module.css'

interface FooterBarProps {
  onSave: () => void
  onSaveAndRefresh: () => void
  saveText: string
  saveAndRefreshText: string
}

const FooterBar: React.FC<FooterBarProps> = ({
  onSave,
  onSaveAndRefresh,
  saveText,
  saveAndRefreshText,
}) => (
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

export default FooterBar
