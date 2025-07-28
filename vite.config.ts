import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';
import monkey, {util} from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';

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
                icon: 'https://vitejs.dev/logo.svg',
                namespace: 'npm/vite-plugin-monkey',
                match: ['*://*/*'],
                "run-at": "document-start",
            },
        }),
    ],
});
