const _toString = Object.prototype.toString;
/**
 * Checks if the given value is an object.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is an object, otherwise false.
 */
function isObject(val) {
    return _toString.call(val) === '[object Object]';
}
/**
 * Checks if the given value is a function.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a function, false otherwise.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFn(val) {
    return typeof val === 'function';
}
/**
 * Checks if the given value is a string.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a string, false otherwise.
 */
function isStr(val) {
    return typeof val === 'string';
}
/**
 * Checks if the provided value is a boolean.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is a boolean, false otherwise.
 */
function isBool(val) {
    return typeof val === 'boolean';
}
/**
 * Checks if a value is undefined.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is undefined, otherwise false.
 */
function isUndef(val) {
    return typeof val === 'undefined';
}
/**
 * Checks if the given value is null.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is null, false otherwise.
 */
function isNull(val) {
    return val === null;
}
/**
 * Determines whether a value is a primitive.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns `true` if the value is a primitive, `false` otherwise.
 */
function isPrimitive(val) {
    return typeof val !== 'object' || val === null;
}
/**
 * Checks if a value is falsy.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is falsy, otherwise false.
 */
function isFalsy(val) {
    return !val;
}
/**
 * Checks if the given value is a number.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a number, false otherwise.
 */
function isNumber(val) {
    return typeof val === 'number';
}
/**
 * determines if it is a valid value other than NaN
 * @param val
 * @returns
 */
function isEffectiveNumber(val) {
    if (!isNumber(val))
        return false;
    return !isNaN(val);
}
/**
 * Checks if a value is a Promise.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns `true` if the value is a Promise, else `false`.
 */
function isPromise(val) {
    return (typeof val === 'object' &&
        !isNull(val) &&
        (_toString.call(val) === '[object Promise]' ||
            isFn(Reflect.get(val, 'then'))));
}
/**
 * Checks if two arrays are equal.
 *
 * @param {unknown[]} firstArr - The first array to compare.
 * @param {unknown[]} secondArr - The second array to compare.
 * @return {boolean} Returns true if the arrays are equal, otherwise false.
 */
function isArrayEquals(firstArr, secondArr, compareFunc) {
    if (firstArr.length !== secondArr.length)
        return false;
    if (firstArr === secondArr)
        return true;
    const sliceFirst = firstArr.slice().sort();
    const sliceSecond = secondArr.slice().sort();
    for (let i = 0; i < firstArr.length; i++) {
        if (sliceFirst[i] !== sliceSecond[i] &&
            (!isFn(compareFunc) || !compareFunc(sliceFirst[i], sliceSecond[i])))
            return false;
    }
    return true;
}
/**
 * Checks if the given object has its own property.
 *
 * @param {object} obj - The object to check.
 * @param {string} prop - The property to check.
 * @return {boolean} Returns true if the object has its own property, otherwise false.
 */
function hasOwn(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export { _toString, hasOwn, isArrayEquals, isBool, isEffectiveNumber, isFalsy, isFn, isNull, isNumber, isObject, isPrimitive, isPromise, isStr, isUndef };
