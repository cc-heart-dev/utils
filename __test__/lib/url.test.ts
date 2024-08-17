import {
  convertParamsRouterToRegExp,
  queryStringToObject,
  objectToQueryString,
  basename,
  parseKey
} from '../../lib/url'

describe('convertQueryString', () => {
  test('should convert a query string to an object', () => {
    expect(queryStringToObject('foo=1&bar=2&baz=3')).toEqual({
      foo: '1',
      bar: '2',
      baz: '3'
    })
    expect(queryStringToObject('foo=&bar=2&baz=3')).toEqual({
      foo: '',
      bar: '2',
      baz: '3'
    })
    expect(queryStringToObject('foo[0]=1&foo[1]=2&baz=3')).toEqual({
      foo: ['1', '2'],
      baz: '3'
    })
    expect(
      queryStringToObject('foo[0]=1&foo[1][0]=2&foo[1][1]=3&baz=4')
    ).toEqual({ foo: ['1', ['2', '3']], baz: '4' })
    expect(queryStringToObject('foo[0].a=1&foo[1].b=2&baz=3')).toEqual({
      foo: [{ a: '1' }, { b: '2' }],
      baz: '3'
    })
  })

  test('should correctly parse keys with multiple levels of arrays and objects', () => {
    const result = queryStringToObject(
      'foo[0][0].a=1&foo[0][1].b=2&foo[1].c[0]=3&foo[1].c[1]=4&foo[2]=5'
    )
    expect(result).toEqual({
      foo: [[{ a: '1' }, { b: '2' }], { c: ['3', '4'] }, '5']
    })
  })

  test('should handle deep nesting of objects', () => {
    const result = queryStringToObject('foo.bar.baz.qux=1')
    expect(result).toEqual({
      foo: {
        bar: {
          baz: {
            qux: '1'
          }
        }
      }
    })
  })

  test('should handle mixed arrays and objects', () => {
    const result = queryStringToObject(
      'foo[0].bar=1&foo[1].baz[0]=2&foo[1].baz[1].qux=3'
    )
    expect(result).toEqual({
      foo: [{ bar: '1' }, { baz: ['2', { qux: '3' }] }]
    })
  })

  test('should return an object with query parameters', () => {
    const url = 'foo=bar&baz=qux'
    const expected = { foo: 'bar', baz: 'qux' }
    expect(queryStringToObject(url)).toEqual(expected)
  })

  test('should handle URL-encoded values', () => {
    const url = 'q=hello%20world'
    const expected = { q: 'hello world' }
    expect(queryStringToObject(url)).toEqual(expected)
  })

  test('should handle empty keys', () => {
    const url = '=empty&foo=bar'
    const expected = { '': 'empty', foo: 'bar' }
    expect(queryStringToObject(url)).toEqual(expected)
  })

  test('should handle empty values', () => {
    const url = 'foo=&bar='
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
      ['id']
    ])
  })

  test('should return /path/.*?/.*? string if path is /path/:id/:uid', () => {
    expect(convertParamsRouterToRegExp('/path/:id/:uid')).toEqual([
      /\/path\/.*?\/.*?/,
      ['id', 'uid']
    ])
  })

  test('should return /path/.*?/.*?/index/ string if path is /path/:id/:uid/index', () => {
    expect(convertParamsRouterToRegExp('/path/:id/:uid/index')).toEqual([
      /\/path\/.*?\/.*?\/index/,
      ['id', 'uid']
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

  test('should trim the query string if test exists', () => {
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

  test('should return a query string for a simple array', () => {
    expect(objectToQueryString({ foo: ['bar', ['baz', 'pizza']] })).toEqual(
      'foo%5B0%5D=bar&foo%5B1%5D%5B0%5D=baz&foo%5B1%5D%5B1%5D=pizza'
    )
  })

  test('should return a query string for a simple array object', () => {
    expect(objectToQueryString({ foo: ['bar', ['baz', { a: 'b' }]] })).toEqual(
      'foo%5B0%5D=bar&foo%5B1%5D%5B0%5D=baz&foo%5B1%5D%5B1%5D.a=b'
    )
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

describe('parseKey', () => {
  test('should correctly parse array keys', () => {
    const obj: Record<string, any> = {}
    parseKey(obj, 'foo[0]', '1')
    parseKey(obj, 'foo[1]', '2')
    expect(obj).toEqual({ foo: ['1', '2'] })
  })

  test('should correctly parse nested array keys', () => {
    const obj: Record<string, any> = {}
    parseKey(obj, 'foo[0][0]', '1')
    parseKey(obj, 'foo[0][1]', '2')
    parseKey(obj, 'foo[1][0]', '3')
    expect(obj).toEqual({ foo: [['1', '2'], ['3']] })
  })

  test('should correctly parse object keys', () => {
    const obj: Record<string, any> = {}
    parseKey(obj, 'foo.bar', '1')
    parseKey(obj, 'foo.baz', '2')
    expect(obj).toEqual({ foo: { bar: '1', baz: '2' } })
  })

  test('should correctly parse mixed array and object keys', () => {
    const obj: Record<string, any> = {}
    parseKey(obj, 'foo[0].bar', '1')
    parseKey(obj, 'foo[1].baz', '2')
    parseKey(obj, 'foo[1].qux', '3')
    expect(obj).toEqual({ foo: [{ bar: '1' }, { baz: '2', qux: '3' }] })
  })

  test('should correctly parse deep nested keys', () => {
    const obj: Record<string, any> = {}
    parseKey(obj, 'foo.bar.baz.qux', '1')
    expect(obj).toEqual({ foo: { bar: { baz: { qux: '1' } } } })
  })

  test('should correctly parse repeated keys', () => {
    const obj: Record<string, any> = {}
    parseKey(obj, 'foo', '1')
    parseKey(obj, 'foo', '2')
    expect(obj).toEqual({ foo: '2' })
  })

  test('should correctly parse empty keys', () => {
    const obj: Record<string, any> = {}
    parseKey(obj, '', '1')
    expect(obj).toEqual({ '': '1' })
  })
})
