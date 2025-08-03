# Fuck Annoying Blog Widget

[README](README.md) | [中文文档](README_zh-CN.md)

------

[GitHub](https://github.com/qixing-jk/fuck-annoying-blog-widget) |
[Greasyfork](https://greasyfork.org/scripts/543963)

![Greasy Fork Version](https://img.shields.io/greasyfork/v/543963)
![Greasy Fork Downloads](https://img.shields.io/greasyfork/dt/543963)

一个用于净化个人博客的浏览器油猴脚本项目，自动移除或禁用常见的烦人挂件和特效。基于 React + Vite
开发，支持站点和全局配置，内置可视化设置面板。

## 功能特性

- 移除自定义右键菜单
- 移除背景特效（如樱花、雪花、Canvas 动画）
- 移除自动播放的音乐播放器
- 移除 Live2D 看板娘
- 移除自定义鼠标指针
- 移除点击特效（如彩色文字、爱心、烟花）
- 阻止标题变更诱导
- 自动展开代码块
- 可视化面板支持站点/全局配置
- 多语言支持（i18next）

## 快速使用

- 在浏览器中安装生成的油猴脚本

| GitHub 源 (推荐，进行了代码压缩)                                                                                                             | Greasy Fork版 (不推荐，代码强制不压缩，性能更差)             |
|-----------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| [安装](https://raw.githubusercontent.com/qixing-jk/fuck-annoying-blog-widget/main/dist/fuck-annoying-blog-widget.optimized.user.js) | [安装](https://greasyfork.org/scripts/543963) |
- 点击油猴菜单打开设置面板
- 按站点或全局配置功能 (默认不启用任何功能，只有在设置面板中启用了特性才会生效)

## 本地开发

1. 克隆本仓库
2. 执行 `pnpm install`
3. 开发环境运行 `pnpm dev`，生产环境运行 `pnpm build`

## 技术栈

- React 19
- Vite 7
- TypeScript
- i18next
- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)

