import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: './src/index.ts',

        'button/index': './src/button/index.ts',
        'checkbox/index': './src/checkbox/index.ts',
        'chips/index': './src/chips/index.ts',
        'dialog/index': './src/dialog/index.ts',
        'datetime/index': './src/datetime/index.ts',
        'divider/index': './src/divider/index.ts',
        'elevation/index': './src/elevation/index.ts',
        'fab/index': './src/fab/index.ts',
        'field/index': './src/field/index.ts',
        'focus/index': './src/focus/index.ts',
        'icon/index': './src/icon/index.ts',
        'icon-button/index': './src/icon-button/index.ts',
        'list/index': './src/list/index.ts',
        'menu/index': './src/menu/index.ts',
        'progress/index': './src/progress/index.ts',
        'radio/index': './src/radio/index.ts',
        'ripple/index': './src/ripple/index.ts',
        'select/index': './src/select/index.ts',
        'slider/index': './src/slider/index.ts',
        'switch/index': './src/switch/index.ts',
        'tabs/index': './src/tabs/index.ts',
        'textfield/index': './src/textfield/index.ts',
        'navigation/index': './src/navigation/index.ts',
        'badge/index': './src/badge/index.ts',
        'theme/index': './src/theme/index.ts'
      },
      formats: ['es']
    },
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: (id) =>
        id === 'react' ||
        id.startsWith('react/') ||
        id === 'react-dom' ||
        id.startsWith('react-dom/') ||
        id.startsWith('@material/web'),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    }
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: './tsconfig.json',
      insertTypesEntry: true
    })
  ]
});
