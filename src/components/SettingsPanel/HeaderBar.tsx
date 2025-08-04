import React from 'react'
import styles from './index.module.css'

interface HeaderBarProps {
  onClose?: () => void
  closeTitle: string
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onClose, closeTitle }) => (
  <div className={styles.headerBar}>
    {onClose && (
      <button className={styles.closeBtn} onClick={onClose} title={closeTitle}>
        ×
      </button>
    )}
  </div>
)

export default HeaderBar
