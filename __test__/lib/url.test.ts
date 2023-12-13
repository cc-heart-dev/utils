import {
  convertParamsRouterToRegExp,
  queryStringToObject,
  objectToQueryString,
  basename,
} from '../../lib/url'

describe('convertQueryString', () => {
  test('should return an empty object if no query string is provided', () => {
    expect(queryStringToObject('http://example.com')).toEqual({})
  })

  test('should return an object with query parameters', () => {
    const url = 'http://example.com/?foo=bar&baz=qux'
    const expected = { foo: 'bar', baz: 'qux' }
    expect(queryStringToObject(url)).toEqual(expected)
  })

  test('should handle URL-encoded values', () => {
    const url = 'http://example.com/?q=hello%20world'
    const expected = { q: 'hello world' }
    expect(queryStringToObject(url)).toEqual(expected)
  })

  test('should handle empty keys', () => {
    const url = 'http://example.com/?=empty&foo=bar'
    const expected = { '': 'empty', foo: 'bar' }
    expect(queryStringToObject(url)).toEqual(expected)
  })

  test('should handle empty values', () => {
    const url = 'http://example.com/?foo=&bar='
    const expected = { foo: '', bar: '' }
    expect(queryStringToObject(url)).toEqual(expected)
  })
})

describe('convertParamsRouterToRegExp', () => {
  test('should return an null if no path is provided', () => {
    expect(convertParamsRouterToRegExp('')).toBeNull()
  })

  test('should return //path/.*?/index/ string if path is /path/:id/index', () => {
    expect(convertParamsRouterToRegExp('/path/:id/index')).toEqual([
      /\/path\/.*?\/index/,
      ['id'],
    ])
  })

  test('should return /path/.*?/.*? string if path is /path/:id/:uid', () => {
    expect(convertParamsRouterToRegExp('/path/:id/:uid')).toEqual([
      /\/path\/.*?\/.*?/,
      ['id', 'uid'],
    ])
  })

  test('should return /path/.*?/.*?/index/ string if path is /path/:id/:uid/index', () => {
    expect(convertParamsRouterToRegExp('/path/:id/:uid/index')).toEqual([
      /\/path\/.*?\/.*?\/index/,
      ['id', 'uid'],
    ])
  })

  test('should return null string if path is /path/index/layout', () => {
    expect(convertParamsRouterToRegExp('/path/index/layout')).toBeNull()
  })
})

describe('basename', () => {
  test('should return the last portion of a path', () => {
    const path = '/path/to/file.txt'
    expect(basename(path)).toEqual('file.txt')
  })

  test('should trim the query string if it exists', () => {
    const path = '/path/to/file.txt?query=string'
    expect(basename(path)).toEqual('file.txt')
  })

  test('should remove a suffix from the result if provided', () => {
    const path = '/path/to/file.txt'
    const suffix = '.txt'
    expect(basename(path, suffix)).toEqual('file')
  })

  test('should return the entire string if no separator is present', () => {
    const path = 'file.txt'
    expect(basename(path)).toEqual('file.txt')
  })

  test('should return an empty string if the path ends with a separator', () => {
    const path = '/path/to/file/'
    expect(basename(path)).toEqual('')
  })
})

describe('objectToQueryString', () => {
  test('should return an empty string if no data is provided', () => {
    expect(objectToQueryString({})).toEqual('')
  })

  test('should return a query string for a simple object', () => {
    const data = { foo: 'bar', baz: 'qux' }
    const expected = 'foo=bar&baz=qux'
    expect(objectToQueryString(data)).toEqual(expected)
  })

  test('should handle URL-encoding of keys and values', () => {
    const data = { 'hello world': 'foo bar', 'baz/qux': 'quux/corge' }
    const expected = 'hello%20world=foo%20bar&baz%2Fqux=quux%2Fcorge'
    expect(objectToQueryString(data)).toEqual(expected)
  })

  test('should ignore properties in the prototype chain', () => {
    const data = Object.create({ foo: 'bar' })
    data.baz = 'qux'
    const expected = 'baz=qux'
    expect(objectToQueryString(data)).toEqual(expected)
  })
})
