import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { readFileSync } from 'fs'

let tsConfig = readFileSync('./tsconfig.json')
tsConfig = JSON.parse(tsConfig)

export default {
  input: './index.ts',
  output: [
    {
      preserveModules: true,
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs'
    },
    {
      preserveModules: true,
      dir: 'dist/esm',
      format: 'esm'
    },
    {
      format: 'es',
      file: 'dist/browser/index.js'
    }
  ],
  plugins: [resolve(), commonjs(), typescript(tsConfig)]
}
