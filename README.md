# Fuck Annoying Blog Widget

[README](README.md) | [中文文档](README_zh-CN.md)

A browser userscript (Tampermonkey) project to purify personal blogs by removing or disabling common annoying widgets
and effects. Built with React + Vite, supports per-site and global configuration, and includes an in-page settings
panel. English is the default language; see below for the Chinese section.

## Features

- Block custom right-click menus
- Block background effects (e.g., sakura, snow, canvas animations)
- Block auto-playing music players
- Block Live2D mascots
- Block custom cursors
- Block click effects (e.g., floating text, hearts, fireworks)
- Block title change tricks
- Easy per-site/global config with a React panel
- Multi-language support (i18next)

## Quick Start

1. Clone this repo and run `pnpm install`
2. `pnpm dev` for development, `pnpm build` for production

## Usage

- Install the generated userscript in your browser
- Click the Tampermonkey menu to open the settings panel
- Configure features per site or globally

## Tech Stack

- React 19
- Vite 7
- TypeScript
- i18next
- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)
