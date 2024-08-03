export const _toString = Object.prototype.toString

/**
 * Checks if the given value is an object.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is an object, otherwise false.
 */
export function isObject(val: unknown): val is object {
  return _toString.call(val) === '[object Object]'
}
/**
 * Checks if the given value is a function.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a function, false otherwise.
 */
export function isFn(val: unknown): val is Function {
  return typeof val === 'function'
}

/**
 * Checks if the given value is a string.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a string, false otherwise.
 */
export function isStr(val: unknown): val is string {
  return typeof val === 'string'
}

/**
 * Checks if the provided value is a boolean.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is a boolean, false otherwise.
 */
export function isBool(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

/**
 * Checks if a value is undefined.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is undefined, otherwise false.
 */
export function isUndef(val: unknown): val is undefined {
  return typeof val === 'undefined'
}

/**
 * Checks if the given value is null.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is null, false otherwise.
 */
export function isNull(val: unknown): val is null {
  return val === null
}

/**
 * Determines whether a value is a primitive.
 *
 * @param val - The value to check.
 * @return Returns `true` if the value is a primitive, `false` otherwise.
 */
export function isPrimitive(val: unknown) {
  return typeof val !== 'object' || val === null
}

/**
 * Checks if a value is falsy.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is falsy, otherwise false.
 */
export function isFalsy(val: unknown): val is false {
  return !val
}

/**
 * Checks if the given value is a number.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a number, false otherwise.
 */
export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}

/**
 * determines if it is a valid value other than NaN
 * @param val
 * @returns
 */
export function isEffectiveNumber(val: unknown): val is number {
  if (!isNumber(val)) return false
  return !isNaN(val)
}

/**
 * Checks if a value is a Promise.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns `true` if the value is a Promise, else `false`.
 */
export function isPromise(val: unknown): val is Promise<unknown> {
  return (
    typeof val === 'object' &&
    !isNull(val) &&
    (_toString.call(val) === '[object Promise]' ||
      isFn(Reflect.get(val, 'then')))
  )
}

/**
 * @deprecated v6.0.0 is deprecated
 *
 * Checks if two arrays are equal.
 *
 * @param {unknown[]} firstArr - The first array to compare.
 * @param {unknown[]} secondArr - The second array to compare.
 * @return {boolean} Returns true if the arrays are equal, otherwise false.
 */
export function isArrayEquals(
  firstArr: unknown[],
  secondArr: unknown[],
  compareFunc?: (a: any, b: any) => boolean
): boolean {
  if (firstArr.length !== secondArr.length) return false
  if (firstArr === secondArr) return true
  const sliceFirst = firstArr.slice().sort()
  const sliceSecond = secondArr.slice().sort()
  for (let i = 0; i < firstArr.length; i++) {
    if (
      sliceFirst[i] !== sliceSecond[i] &&
      (!isFn(compareFunc) || !compareFunc(sliceFirst[i], sliceSecond[i]))
    )
      return false
  }
  return true
}

/**
 * Checks if the given object has its own property.
 *
 * @param {object} obj - The object to check.
 * @param {string} prop - The property to check.
 * @return {boolean} Returns true if the object has its own property, otherwise false.
 */
export function hasOwn(obj: object, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

/**
 * Checks if an array is valid, where validity means it is an array and has at least one element.
 *
 * @param arr The array to check for validity.
 * @return Returns true if the array is valid, and false otherwise.
 */
export function isValidArray(arr: unknown[]) {
  return Array.isArray(arr) && arr.length > 0;
}

