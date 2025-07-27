// src/config/features.ts

export const featureKeys: string[] = [];

const modules = import.meta.glob<true, string, any>('../features/*.ts', {eager: true});

for (const path in modules) {
    const keyMatch = path.match(/\/(\w+)\.ts$/);
    if (keyMatch && keyMatch[1] !== 'index') {
        featureKeys.push(keyMatch[1]);
    }
}