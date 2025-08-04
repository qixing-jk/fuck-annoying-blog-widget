import styles from './index.module.css'

// FeatureItemRow 子组件，简化主渲染逻辑
interface FeatureItemRowProps {
  label: string
  description: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ControlComponent: React.FC<{
    checked: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }>
  children?: React.ReactNode
}

const FeatureItemRow: React.FC<FeatureItemRowProps> = ({
  label,
  description,
  checked,
  onChange,
  ControlComponent,
  children,
}) => (
  <div className={styles.featureItem}>
    <div className={styles.featureItemRow}>
      <div className={styles.featureItemLabel} title={description}>
        {label}
      </div>
      <div className={styles.featureItemControl}>
        <ControlComponent checked={checked} onChange={onChange} />
      </div>
    </div>
    {children}
  </div>
)

export default FeatureItemRow
