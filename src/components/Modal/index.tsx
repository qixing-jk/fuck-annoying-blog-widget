import React from 'react'
import styles from './index.module.css'
import styleText from './index.module.css?inline'
import { injectReactWithShadow } from '../../utils/injectReactWithShadow'

interface ModalProps {
  title?: string
  content?: React.ReactNode
  onOk?: () => void
  onCancel?: () => void
  okText?: string
  cancelText?: string
  open: boolean
}

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  content,
  onOk,
  onCancel,
  okText = '确定',
  cancelText = '取消',
}) => {
  if (!open) return null
  return (
    <>
      <style>{styleText}</style>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.content}>{content}</div>
          <div className={styles.footer}>
            <button className={styles.cancel} onClick={onCancel}>
              {cancelText}
            </button>
            <button className={styles.ok} onClick={onOk}>
              {okText}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function showModal({
  title,
  content,
  okText = '确定',
  cancelText = '取消',
}: Omit<ModalProps, 'onOk' | 'onCancel' | 'open'>): Promise<boolean> {
  return new Promise((resolve) => {
    const { root, host, mountPoint } = injectReactWithShadow(
      <Modal
        open={true}
        title={title}
        content={content}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
        cancelText={cancelText}
      />,
      'modal-root'
    )

    function handleOk() {
      root.unmount()
      if (mountPoint && mountPoint.parentNode) mountPoint.parentNode.removeChild(mountPoint)
      if (host.shadowRoot && host.shadowRoot.childNodes.length === 0) {
        host.remove()
      }
      resolve(true)
    }

    function handleCancel() {
      root.unmount()
      if (mountPoint && mountPoint.parentNode) mountPoint.parentNode.removeChild(mountPoint)
      if (host.shadowRoot && host.shadowRoot.childNodes.length === 0) {
        host.remove()
      }
      resolve(false)
    }
  })
}

export { showModal }
