import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import monkey, { util } from 'vite-plugin-monkey'
import AutoImport from 'unplugin-auto-import/vite'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const IsNeedOptimize = mode === 'optimize'

  const rawGithubURL = 'https://raw.githubusercontent.com/'
  const repositoryPath = 'qixing-jk/fuck-annoying-blog-widget'
  const scriptName = (pkg.name ?? 'monkey') + (IsNeedOptimize ? '.optimized' : '')
  const scriptFullName = scriptName + '.user.js'
  const scriptUrl = rawGithubURL + repositoryPath + '/refs/heads/main/dist/' + scriptFullName

  return {
    plugins: [
      react(),
      AutoImport({
        imports: [util.unimportPreset],
      }),
      monkey({
        entry: 'src/main.tsx',
        userscript: {
          name: {
            '': 'Personal Blog Annoying Features and Pendant Purification',
            'zh-CN': '个人博客恼人功能和挂件净化',
          },
          version: pkg.version,
          description: {
            '': 'purify personal blogs by removing or disabling common annoying widgets and effects.',
            'zh-CN': '净化个人博客，自动移除或禁用常见的烦人挂件和特效。',
          },
          icon: rawGithubURL + repositoryPath + '/refs/heads/main/src/assets/logo.jpg',
          namespace: 'https://github.com/' + repositoryPath,
          match: ['*://*/*'],
          updateURL: scriptUrl,
          downloadURL: scriptUrl,
          'run-at': 'document-start',
        },
        build: {
          fileName: scriptFullName,
        },
      }),
    ],
    build: {
      minify: IsNeedOptimize,
      emptyOutDir: false,
    },
  }
})
