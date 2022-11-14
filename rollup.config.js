import typescript from 'rollup-plugin-typescript2'
import tsConfig from './tsconfig.json' assert { type: 'json' }
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: './index.ts',
  output: [
    {
      preserveModules: true,
      dir: 'dist/cjs',
      format: 'cjs',
      // 重新命名
      entryFileNames: '[name].cjs',
    },
    {
      preserveModules: true,
      dir: 'dist/esm',
      format: 'esm',
    },
    {
      format: 'es',
      file: 'dist/browser/index.js',
    },
  ],
  plugins: [resolve(), commonjs(), typescript(tsConfig)],
}
