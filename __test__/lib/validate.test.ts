import {
  isArrayEquals,
  hasOwn,
  isObject,
  isFn,
  isStr,
  isBool,
  isUndef,
  isNull,
  isPrimitive,
  isFalsy,
  isNumber,
  isEffectiveNumber,
  isPromise,
  isValidArray,
  isValidDate
} from '../../lib'

describe('isArrayEquals', () => {
  it('should return true if two arrays are equal', () => {
    expect(isArrayEquals([1, 3, 2], [1, 2, 3])).toBe(true)
    expect(isArrayEquals([], [])).toBe(true)
    const arr = [1, 2, 3]
    expect(isArrayEquals(arr, arr)).toBe(true)
  })

  it('should return false if two arrays are not equal', () => {
    expect(isArrayEquals([1, 2], [1, 1])).toBe(false)
    expect(isArrayEquals([1, 2], [1, 2, 3])).toBe(false)
  })

  it('should return true if two arrays are equal by id', () => {
    expect(
      isArrayEquals(
        [{ id: 1 }, { id: 2 }],
        [{ id: 1 }, { id: 2 }],
        (a, b) => a.id === b.id
      )
    ).toBe(true)
  })
})

describe('hasOwnProperty', () => {
  it('should return true if the property exists', () => {
    expect(hasOwn(['a', 'b'], '0')).toBe(true)
    expect(hasOwn(['a', 'b'], 'a')).toBe(false)
  })
})

describe('isObject', () => {
  it('should return true if the value is an object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(new Object())).toBe(true)
  })

  it('should return false if the value is not an object', () => {
    expect(isObject(1)).toBe(false)
    expect(isObject(null)).toBe(false)
  })
})

describe('isFn', () => {
  it('should return true if the value is a function', () => {
    expect(
      isFn(function () {
        /** */
      })
    ).toBe(true)
    expect(
      isFn(() => {
        /** */
      })
    ).toBe(true)
  })

  it('should return false if the value is not a function', () => {
    expect(isFn(1)).toBe(false)
    expect(isFn(null)).toBe(false)
  })
})

describe('isStr', () => {
  it('should return true if the value is a string', () => {
    expect(isStr('a')).toBe(true)
    expect(isStr('')).toBe(true)
  })

  it('should return false if the value is not a string', () => {
    expect(isStr(1)).toBe(false)
    expect(isStr(null)).toBe(false)
  })
})

describe('isBool', () => {
  it('should return true if the value is a boolean', () => {
    expect(isBool(true)).toBe(true)
    expect(isBool(false)).toBe(true)
  })

  it('should return false if the value is not a boolean', () => {
    expect(isBool(1)).toBe(false)
    expect(isBool(null)).toBe(false)
  })
})

describe('isUndef', () => {
  it('should return true if the value is undefined', () => {
    expect(isUndef(undefined)).toBe(true)
  })

  it('should return false if the value is not undefined', () => {
    expect(isUndef(1)).toBe(false)
    expect(isUndef(null)).toBe(false)
  })
})

describe('isNull', () => {
  it('should return true if the value is null', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should return false if the value is not null', () => {
    expect(isNull(1)).toBe(false)
    expect(isNull(undefined)).toBe(false)
  })
})

describe('isPrimitive', () => {
  it('should return true if the value is a primitive', () => {
    expect(isPrimitive('a')).toBe(true)
    expect(isPrimitive(1)).toBe(true)
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(undefined)).toBe(true)
  })

  it('should return false if the value is not a primitive', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(new Map())).toBe(false)
    expect(isPrimitive(new Set())).toBe(false)
    expect(
      isPrimitive(
        new Promise(() => {
          /** */
        })
      )
    ).toBe(false)
  })
})

describe('isFalsy', () => {
  it('should return true if the value is falsy', () => {
    expect(isFalsy(false)).toBe(true)
    expect(isFalsy(0)).toBe(true)
    expect(isFalsy(null)).toBe(true)
    expect(isFalsy(undefined)).toBe(true)
    expect(isFalsy('')).toBe(true)
  })

  it('should return false if the value is not falsy', () => {
    expect(isFalsy(1)).toBe(false)
    expect(isFalsy([])).toBe(false)
    expect(isFalsy({})).toBe(false)
  })
})

describe('isNumber', () => {
  it('should return true if the value is a number', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber(0)).toBe(true)
  })

  it('should return false if the value is not a number', () => {
    expect(isNumber('')).toBe(false)
    expect(isNumber({})).toBe(false)
  })
})

describe('isEffectiveNumber', () => {
  it('should return true if the value is a number', () => {
    expect(isEffectiveNumber(1)).toBe(true)
    expect(isEffectiveNumber(0)).toBe(true)
  })

  it('should return false if the value is not a number', () => {
    expect(isEffectiveNumber('')).toBe(false)
    expect(isEffectiveNumber({})).toBe(false)
    expect(isEffectiveNumber(NaN)).toBe(false)
  })
})

describe('isPromise', () => {
  it('should return true if the value is a promise', () => {
    expect(
      isPromise(
        new Promise(() => {
          /** */
        })
      )
    ).toBe(true)
    expect(isPromise(Promise.resolve(1))).toBe(true)
    expect(
      isPromise(
        Promise.reject(1).catch(() => {
          /** */
        })
      )
    ).toBe(true)
    expect(
      isPromise({
        then: () => {
          /** */
        }
      })
    ).toBe(true)
  })

  it('should return false if the value is not a promise', () => {
    expect(isPromise(1)).toBe(false)
    expect(isPromise(null)).toBe(false)
  })
})

describe('isValidArray', () => {
  test('should return true for a non-empty array', () => {
    expect(isValidArray([1, 2, 3])).toBe(true)
  })

  test('should return false for an empty array', () => {
    expect(isValidArray([])).toBe(false)
  })

  test('should return false for a non-array value', () => {
    // @ts-ignore
    expect(isValidArray(123)).toBe(false)
  })

  test('should return false for an array with length 0', () => {
    expect(isValidArray([])).toBe(false)
  })

  test('should return true for an array with length greater than 0', () => {
    expect(isValidArray([1])).toBe(true)
  })

  test('should return true for a complex array', () => {
    expect(isValidArray([{ a: 1 }, { b: 2 }])).toBe(true)
  })

  test('should return false for undefined', () => {
    // @ts-ignore
    expect(isValidArray(undefined)).toBe(false)
  })

  test('should return false for null', () => {
    // @ts-ignore
    expect(isValidArray(null)).toBe(false)
  })

  test('should return false for an object', () => {
    // @ts-ignore
    expect(isValidArray({})).toBe(false)
  })
})

describe('isValidDate function', () => {
  it('should return true for a valid date', () => {
    const validDate = new Date();
    expect(isValidDate(validDate)).toBe(true);
  });

  it('should return false for an invalid date', () => {
    const invalidDate = new Date('invalid');
    expect(isValidDate(invalidDate)).toBe(false);
  });
});
