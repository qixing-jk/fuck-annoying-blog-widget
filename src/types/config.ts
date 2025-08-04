// 配置相关类型
import type { FeatureConfigMap } from './feature'

export type SiteConfig = FeatureConfigMap
export type AllConfigs = {
  [hostname: string]: Partial<SiteConfig>
}
