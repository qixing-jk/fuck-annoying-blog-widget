// 功能相关类型

export interface FeatureConfigMap {
  autoExpandCodeBlocks: boolean
  removeClickEffects: boolean
  disableTitleChange: boolean
  removeBackgroundEffects: boolean
  removeMusicPlayer: boolean
  removeCustomCursor: boolean
  removeLive2D: boolean
  removeCustomContextMenu: boolean
}

export type FeatureKey = keyof FeatureConfigMap
export type FeatureFunction = () => void
