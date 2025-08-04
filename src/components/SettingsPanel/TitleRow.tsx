import React from 'react'
import styles from './index.module.css'

interface TitleRowProps {
  title: string
  version: string
}

const TitleRow: React.FC<TitleRowProps> = ({ title, version }) => (
  <div className={styles.titleRow}>
    <h2 className={styles.title}>{title}</h2>
    <span className={styles.version}>V{version}</span>
  </div>
)

export default TitleRow
