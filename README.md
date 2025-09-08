# Fuck Annoying Blog Widget

[README](README.md) | [中文文档](README_zh-CN.md)

------

[GitHub](https://github.com/qixing-jk/fuck-annoying-blog-widget) |
[Greasyfork](https://greasyfork.org/scripts/543963)

![Greasy Fork Version](https://img.shields.io/greasyfork/v/543963)
![Greasy Fork Downloads](https://img.shields.io/greasyfork/dt/543963)

A browser userscript (Tampermonkey) project to purify personal blogs by removing or disabling common annoying widgets
and effects. Built with React + Vite, supports per-site and global configuration, and includes an in-page settings
panel.

## ✨ Features

- **Annoyance Blocking**:
    - Block title change tricks
    - Block autoplaying music players
    - Block background effects (e.g., sakura, snow, canvas animations)
    - Block Live2D mascots
    - Cursor
        - Block custom cursors
        - Block click effects (e.g., floating text, hearts, fireworks)
        - Remove Cursor Trail Effects
- **Quality of Life**:
    - Block custom right-click menus and recover browser right-click menus
    - Auto-expand code blocks
- **Configuration**:
    - Easy per-site/global config with a React panel
    - Multi-language support (i18next)

## 🚀 Quick Start

### 1. Installation

| GitHub Source (Recommended, minified)                                                                                                  | Greasy Fork (Not recommended, unminified, worse performance) |
|:---------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------|
| [Install](https://raw.githubusercontent.com/qixing-jk/fuck-annoying-blog-widget/main/dist/fuck-annoying-blog-widget.optimized.user.js) | [Install](https://greasyfork.org/scripts/543963)             |

### 2. Configuration

1. Click the Tampermonkey menu to open the settings panel.
2. Configure features per site or globally.
   > By default, no features are enabled. They only take effect when enabled in the settings panel.

## 🛠️ Local Development

1. **Clone this repo**: `git clone https://github.com/qixing-jk/fuck-annoying-blog-widget.git`
2. **Install dependencies**: `pnpm install`
3. **Run for development**: `pnpm dev`
4. **Build for production**: `pnpm build`

## 💻 Tech Stack

- React 19
- Vite 7
- TypeScript
- i18next
- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)