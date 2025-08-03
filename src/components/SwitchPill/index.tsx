import React from 'react'
import styles from './index.module.css'
import styleText from './index.module.css?inline'

export interface SwitchPillProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  name?: string
  style?: React.CSSProperties
  className?: string
}

const Index: React.FC<SwitchPillProps> = ({
  checked,
  onChange,
  disabled,
  name,
  style,
  className,
}) => (
  <>
    <style>{styleText}</style>
    <label className={className ? className + ' ' + styles.switch : styles.switch} style={style}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />
      <span className={styles.slider}></span>
    </label>
  </>
)

export default Index
