// 功能相关类型

export interface FeatureConfigMap {
  autoExpandCodeBlocks: {
    enabled: boolean
    selectors: string[]
  }
  removeClickEffects: boolean
  disableTitleChange: boolean
  removeBackgroundEffects: boolean
  removeMusicPlayer: boolean
  removeCustomCursor: boolean
  removeLive2D: boolean
  removeCustomContextMenu: boolean
}

export type FeatureKey = keyof FeatureConfigMap
export type FeatureFunction<T = any> = (featureConfig: T) => void
