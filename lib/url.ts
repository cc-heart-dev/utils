import type { QueryStringToObject } from '../typings/url'
import { hasOwn } from './validate'

/**
 * Converts a query string to an object.
 *
 * @example `queryStringToObject('foo=1&bar=2&baz=3')`
 * @example `queryStringToObject('foo=&bar=2&baz=3')`
 * @example `queryStringToObject('foo[0]=1&foo[1]=2&baz=3')`
 * @template T - The type of the URL string.
 * @template U - The type of the object to return.
 * @param {T} url - The URL string to convert.
 * @returns {U} The object representation of the query string in `url`.
 */
export function queryStringToObject<
  T extends string,
  U extends Record<PropertyKey, any> = QueryStringToObject<T>,
>(url: T): U {
  const query = url.split('?')[1]
  const result = {} as U
  if (query) {
    query.split('&').forEach((item) => {
      const [key, value] = item.split('=')
      Reflect.set(result, decodeURIComponent(key), decodeURIComponent(value))
    })
  }
  return result
}

/**
 * Converts an object to a query string.
 *
 * @param {Record<PropertyKey, any>} data - The object to convert.
 * @returns {string} The query string representation of `data`.
 */
export function objectToQueryString<T extends Record<PropertyKey, any>>(
  data: T,
): string {
  const res = []
  for (const key in data) {
    if (hasOwn(data, key)) {
      res.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    }
  }

  return res.join('&')
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
