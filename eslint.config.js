import { typescript } from '@cc-heart/eslint-config'

export default [
  ...typescript({
    ignores: ['/typings/**', '/docs/**'],
    overrides: {
      'no-use-before-define': 'off',
      'no-promise-executor-return': 'off'
    }
  })
]
