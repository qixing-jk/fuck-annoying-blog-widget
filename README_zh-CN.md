# Fuck Annoying Blog Widget

[English Readme](README.md) | [中文Readme](README_zh-CN.md)

------

[GitHub](https://github.com/qixing-jk/fuck-annoying-blog-widget) |
[Greasyfork](https://greasyfork.org/scripts/543963)

![Greasy Fork 版本](https://img.shields.io/greasyfork/v/543963)
![Greasy Fork 下载量](https://img.shields.io/greasyfork/dt/543963)

一个用于净化个人博客的浏览器油猴脚本项目，自动移除或禁用常见的烦人挂件和特效。基于 React + Vite 开发，支持站点和全局配置，内置可视化设置面板。

## ✨ 功能特性

- **屏蔽干扰**:
    - 阻止标题变更诱导
    - 移除自动播放的音乐播放器
    - 移除背景特效（如樱花、雪花、Canvas 动画）
    - 移除 Live2D 看板娘
    - 鼠标相关
        - 移除自定义鼠标指针
        - 移除点击特效（如彩色文字、爱心、烟花）
        - 移除鼠标拖尾特效
- **提升体验**:
    - 自动展开代码块
    - 移除自定义右键菜单，恢复浏览器右键菜单
- **配置与管理**:
    - 可视化面板支持站点/全局配置
    - 多语言支持（i18next）

## 🚀 快速使用

### 1. 安装

| GitHub 源 (推荐，进行了代码压缩)                                                                                                             | Greasy Fork版 (不推荐，代码强制不压缩，性能更差)             |
|:----------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------|
| [安装](https://raw.githubusercontent.com/qixing-jk/fuck-annoying-blog-widget/main/dist/fuck-annoying-blog-widget.optimized.user.js) | [安装](https://greasyfork.org/scripts/543963) |

### 2. 配置

1. 点击油猴菜单打开设置面板。
2. 按站点或全局配置功能。
   > 默认不启用任何功能，只有在设置面板中启用了特性才会生效。

## 🛠️ 本地开发

1. **克隆本仓库**: `git clone https://github.com/qixing-jk/fuck-annoying-blog-widget.git`
2. **安装依赖**: `pnpm install`
3. **开发环境运行**: `pnpm dev`
4. **生产环境构建**: `pnpm build`

## 💻 技术栈

- React 19
- Vite 7
- TypeScript
- i18next
- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)