/**
 * convert query string to object
 *
 * @param url http url
 * @returns
 */
export function convertQueryString<T extends Record<string, string>>(
  url: string,
): T {
  const query = url.split('?')[1]
  const result = {} as T
  if (query) {
    query.split('&').forEach((item) => {
      const [key, value] = item.split('=')
      Reflect.set(result, key, decodeURIComponent(value))
    })
  }
  return result
}

/**
 * convert params routes to regular expressions
 *
 * @param path a params paths
 * @returns null or An array contains the RegExp that matches the params and the path for each params parameter
 */
export function convertParamsRouterToRegExp(path: string) {
  const matcher = path.match(/:(.*?)(?:\/|$)/g)
  if (matcher === null) return null
  const reg = new RegExp(path.replace(/:(.*?)(\/|$)/g, '.*?$2'))
  return [reg, matcher.map((val) => val.replace(/:(.*?)(\/|$)/g, '$1'))]
}

/**
 * Returns the last portion of a path, similar to the Unix basename command.
 * Trims the query string if it exists.
 * Optionally, removes a suffix from the result.
 *
 * @param path - The path to get the basename from.
 * @param [suffix] - An optional suffix to remove from the basename.
 * @returns  The basename of the path.
 */
export function basename(path: string, suffix?: string) {
  const separator = '/'
  const index = path.lastIndexOf(separator)
  let str = path.slice(index + 1)
  if (str) {
    const querySeparator = str.lastIndexOf('?')
    if (querySeparator !== -1) {
      str = str.slice(0, querySeparator)
    }
  }
  if (suffix) {
    return str.replace(new RegExp(suffix + '$'), '')
  }
  return str
}
