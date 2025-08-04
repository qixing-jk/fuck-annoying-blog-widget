// 通用基础类型，可在全局复用

declare global {
  interface Window {
    toggleSettingsPanel?: () => void
  }
}
