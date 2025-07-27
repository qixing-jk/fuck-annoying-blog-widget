import {defaultGlobalConfig} from '../config/features';

declare global {
    interface Window {
        toggleSettingsPanel?: () => void;
    }
}

// SiteConfig 类型从 defaultGlobalConfig 推断
export type SiteConfig = typeof defaultGlobalConfig;

export type FeatureFunction = () => void;

export interface AllConfigs {
    [hostname: string]: Partial<SiteConfig>;
}