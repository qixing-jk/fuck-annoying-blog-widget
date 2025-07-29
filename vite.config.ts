import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import monkey, { util } from 'vite-plugin-monkey'
import AutoImport from 'unplugin-auto-import/vite'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        version: pkg.version,
        description: {
          '': 'purify personal blogs by removing or disabling common annoying widgets and effects.',
          'zh-CN': '净化个人博客，自动移除或禁用常见的烦人挂件和特效。',
        },
        icon: 'https://raw.githubusercontent.com/qixing-jk/fuck-annoying-blog-widget/refs/heads/main/src/assets/logo.jpg',
        namespace: 'https://github.com/qixing-jk/fuck-annoying-blog-widget',
        match: ['*://*/*'],
        'run-at': 'document-start',
      },
    }),
  ],
})
