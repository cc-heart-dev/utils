import { isFn, isObject, isStr } from './validate'

export function formatErrorToString(
  error: unknown,
  defaultErrorString: string = ''
) {
  if (isStr(error)) return error

  if (error instanceof Error) return error.message

  if (isObject(error) && 'toString' in error && isFn(error.toString))
    return error.toString()

  return defaultErrorString
}
