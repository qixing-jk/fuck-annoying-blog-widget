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

## Features

- Block custom right-click menus
- Block background effects (e.g., sakura, snow, canvas animations)
- Block auto-playing music players
- Block Live2D mascots
- Block custom cursors
- Block click effects (e.g., floating text, hearts, fireworks)
- Block title change tricks
- Auto-expand code blocks
- Easy per-site/global config with a React panel
- Multi-language support (i18next)

## Quick Start

- Install the generated userscript in your browser

| GitHub Source (Recommended, minified)                                                                                                  | Greasy Fork (Not recommended, forced unminified, worse performance) |
|----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| [Install](https://raw.githubusercontent.com/qixing-jk/fuck-annoying-blog-widget/main/dist/fuck-annoying-blog-widget.optimized.user.js) | [Install](https://greasyfork.org/scripts/543963)                    |
- Click the Tampermonkey menu to open the settings panel
- Configure features per site or globally (By default, no features are enabled, and they only take effect when enabled
  in the settings panel.)

## Local Development

1. Clone this repo
2. run `pnpm install`
3. run`pnpm dev` for development, `pnpm build` for production

## Tech Stack

- React 19
- Vite 7
- TypeScript
- i18next
- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)
