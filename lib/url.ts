import type { QueryStringToObject } from '../typings/url'
import { hasOwn, isObject } from './validate'

export function parseKey(
  obj: Record<PropertyKey, any>,
  key: string,
  value: any
) {
  const isArrayKey = key.includes('[') && key.includes(']')
  if (isArrayKey) {
    const keys = key.split(/[[\]]/).filter(Boolean)
    let currentObj = obj
    for (let i = 0; i < keys.length; i++) {
      let currentKey = keys[i]
      if (currentKey.startsWith('.')) currentKey = currentKey.split('.')[1]

      if (i === keys.length - 1) {
        if (Array.isArray(currentObj)) {
          currentObj.push(value)
        } else {
          currentObj[currentKey] = value
        }
      } else {
        if (!currentObj[currentKey]) {
          currentObj[currentKey] = keys[i + 1].match(/^\d+$/) ? [] : {}
        }
        currentObj = currentObj[currentKey]
      }
    }
  } else {
    let nestedObj = obj
    const keyParts = key.split('.')
    for (let i = 0; i < keyParts.length - 1; i++) {
      const currentKey = keyParts[i]

      if (!nestedObj[currentKey]) {
        nestedObj[currentKey] = {}
      }
      nestedObj = nestedObj[currentKey]
    }
    nestedObj[keyParts[keyParts.length - 1]] = value
  }
}

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
  U extends Record<PropertyKey, any> = QueryStringToObject<T>
>(url: T): U {
  const result = {} as U
  if (url) {
    url.split('&').forEach((item) => {
      const [rawKey, value] = item.split('=')
      const key = decodeURIComponent(rawKey)
      parseKey(result, key, decodeURIComponent(value))
    })
  }
  return result
}

/**
 * Converts an object to a query string.
 *
 * @param data - The object to convert.
 * @returns The query string representation of `data`.
 */
export function objectToQueryString<T extends Record<PropertyKey, any>>(
  data: T
): string {
  const res: Array<string> = []
  for (const key in data) {
    if (hasOwn(data, key)) {
      if (Array.isArray(data[key])) {
        res.push(arrayToQueryString(data[key], key))
      } else {
        res.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      }
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
 * @returns The basename of the path.
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

/**
 * Convert a multi-dimensional array to a query string.
 * @param array The multi-dimensional array to convert.
 * @param field The field name to use in the query string.
 * @returns The generated query string.
 */
export function arrayToQueryString(array: Array<unknown>, field: string) {
  let queryString = ''

  function buildQueryString(arr: Array<unknown>, prefix: string) {
    arr.forEach((element, index) => {
      if (Array.isArray(element)) {
        buildQueryString(
          element,
          `${prefix}${encodeURIComponent(`[${index}]`)}`
        )
      } else if (isObject(element)) {
        for (const key in element) {
          if (hasOwn(element, key)) {
            queryString += `${prefix}${encodeURIComponent(`[${index}]`)}.${encodeURIComponent(key)}=${encodeURIComponent(String(Reflect.get(element, key)))}&`
          }
        }
      } else {
        queryString += `${prefix}${encodeURIComponent(`[${index}]`)}=${encodeURIComponent(String(element))}&`
      }
    })
  }

  buildQueryString(array, field)

  // Remove the trailing '&' if present
  queryString = queryString.slice(0, -1)

  return queryString
}
