import { FeatureFunction } from '../types' // 引入我们将要定义的函数类型

/**
 * 功能注册表
 * Key: 功能名称 (例如 "removeLive2D")
 * Value: 该功能对应的执行函数
 */
export const featureRegistry: Record<string, FeatureFunction> = {}

// 使用 Vite 的 import.meta.glob 动态导入
//    - './*.ts': 匹配当前目录下所有 .ts 文件
//    - { eager: true }: 立即加载这些模块，而不是返回一个动态 import 函数
const featureModules = import.meta.glob<true, string, { default: FeatureFunction }>('./*.ts', {
  eager: true,
})

// 遍历导入的模块并填充注册表
for (const path in featureModules) {
  // 从路径中提取文件名作为功能名
  // e.g., from "./removeLive2D.ts" to "removeLive2D"
  const match = path.match(/\/(\w+)\.ts$/)

  if (match) {
    const featureName = match[1]

    // 排除掉 index 文件自身，避免无限循环或逻辑错误
    if (featureName !== 'index') {
      // 将 "功能名" 和模块的 "default导出" 关联起来
      featureRegistry[featureName] = featureModules[path].default
    }
  }
}

// 打印一下，方便调试，看看注册了哪些功能
console.log('[Purify] Feature registry loaded:', Object.keys(featureRegistry))
