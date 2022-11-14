export declare const _toString: () => string;
/**
 * Checks if the given value is an object.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is an object, otherwise false.
 */
export declare function isObject(val: unknown): val is object;
/**
 * Checks if the given value is a function.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a function, false otherwise.
 */
export declare function isFn(val: unknown): val is Function;
/**
 * Checks if the given value is a string.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a string, false otherwise.
 */
export declare function isStr(val: unknown): val is string;
/**
 * Checks if the provided value is a boolean.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is a boolean, false otherwise.
 */
export declare function isBool(val: unknown): val is boolean;
/**
 * Checks if a value is undefined.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is undefined, otherwise false.
 */
export declare function isUndef(val: unknown): val is undefined;
/**
 * Checks if the given value is null.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is null, false otherwise.
 */
export declare function isNull(val: unknown): val is null;
/**
 * Determines whether a value is a primitive.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns `true` if the value is a primitive, `false` otherwise.
 */
export declare function isPrimitive(val: unknown): boolean;
/**
 * Checks if a value is falsy.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is falsy, otherwise false.
 */
export declare function isFalsy(val: unknown): val is false;
/**
 * Checks if the given value is a number.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a number, false otherwise.
 */
export declare function isNumber(val: unknown): val is number;
/**
 * determines if it is a valid value other than NaN
 * @param val
 * @returns
 */
export declare function isEffectiveNumber(val: unknown): val is number;
/**
 * Checks if a value is a Promise.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns `true` if the value is a Promise, else `false`.
 */
export declare function isPromise(val: unknown): val is Promise<unknown>;
/**
 * Checks if two arrays are equal.
 *
 * @param {unknown[]} firstArr - The first array to compare.
 * @param {unknown[]} secondArr - The second array to compare.
 * @return {boolean} Returns true if the arrays are equal, otherwise false.
 */
export declare function isArrayEquals(firstArr: unknown[], secondArr: unknown[], compareFunc?: (a: any, b: any) => boolean): boolean;
/**
 * Checks if the given object has its own property.
 *
 * @param {object} obj - The object to check.
 * @param {string} prop - The property to check.
 * @return {boolean} Returns true if the object has its own property, otherwise false.
 */
export declare function hasOwn(obj: object, prop: string): boolean;
