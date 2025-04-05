import { isFn, isObject, isStr } from './validate'

/**
 * Formats an error object into a string representation.
 * @param error - The error to format. It can be an `Error` instance, a string, or another object.
 * @param [defaultErrorString=''] - The default error message if the error cannot be formatted.
 * @param [opts={}] - Additional options.
 * @param [opts.errorLimit=8] - The maximum number of stack trace lines to include.
 * @returns  The formatted error message.
 */
export function formatErrorToString(
  error: unknown,
  defaultErrorString: string = '',
  opts = {
    errorLimit: 8
  }
) {
  if (error instanceof Error) {
    Error.captureStackTrace(error, formatErrorToString)
    const stackLines = error.stack?.split('\n').slice(0, opts.errorLimit) || []
    return stackLines.join('\n')
  }

  if (isStr(error)) return error
  if (isObject(error) && 'toString' in error && isFn(error.toString))
    return error.toString()

  return defaultErrorString
}
