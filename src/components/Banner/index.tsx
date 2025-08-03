import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import styleText from './index.module.css?inline'
import { injectReactWithShadow } from '../../utils/injectReactWithShadow'

interface BannerProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number // ms
}

const Banner: React.FC<BannerProps> = ({ message, type = 'success', duration = 2000 }) => {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])
  if (!visible) return null
  return (
    <>
      <style>{styleText}</style>
      <div className={`${styles.banner} ${styles[type]}`}>{message}</div>
    </>
  )
}

function showBanner(
  message: string,
  type: 'success' | 'error' | 'info' = 'success',
  duration = 2000
) {
  const { root, host, mountPoint } = injectReactWithShadow(
    <Banner message={message} type={type} duration={duration} />,
    'banner-root'
  )
  setTimeout(() => {
    root.unmount()
    if (mountPoint && mountPoint.parentNode) mountPoint.parentNode.removeChild(mountPoint)
    if (host.shadowRoot && host.shadowRoot.childNodes.length === 0) {
      host.remove()
    }
  }, duration + 400)
}

export { showBanner }
