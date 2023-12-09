import { isPromise as isPromise$1 } from 'util/types';

/**
 * Generates a random UUID.
 *
 * @return {string} The generated UUID.
 */
function randomUUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' &&
        typeof performance.now === 'function') {
        d += performance.now(); // 增加性能数据
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}

/**
 * Returns the current time in ISO string format.
 * @returns {string} The current time in ISO string format.
 */
function getCurrentTimeISOString() {
    const date = new Date();
    const timeZoneOffset = date.getTimezoneOffset() / 60;
    date.setHours(date.getHours() - timeZoneOffset);
    return date.toISOString();
}

/**
 * DefineDebounceFn is a function that creates a debounced function.
 * @param {Function} fn - The function to be debounced.
 * @param {number} delay - The delay in milliseconds to wait before the debounced function is called. Default is 500ms.
 * @param {boolean} immediate - Whether the debounced function should be called immediately before the delay. Default is false.
 * @returns {CacheResultFunc} - The debounce function.
 */
const defineDebounceFn = function (fn, delay = 500, immediate = false) {
    let timer = null;
    const debounced = function (...args) {
        if (timer)
            clearTimeout(timer);
        if (immediate && !timer) {
            immediate = false;
            debounced._result = fn.apply(this, args);
        }
        else {
            timer = setTimeout(() => {
                debounced._result = fn.apply(this, args);
                timer = null;
            }, delay);
        }
    };
    return debounced;
};
/**
 * Creates a function that can only be called once.
 *
 * @param {(...args: any) => any} fn - The function to be called once.
 * @returns {(...args: any) => any} - A new function that can only be called once.
 */
function defineOnceFn(fn) {
    let __once = false;
    let __cache = null;
    if (!(fn instanceof Function)) {
        throw new Error('first params must be a function');
    }
    return function (...args) {
        if (!__once) {
            __once = true;
            __cache = fn.apply(this, args);
        }
        return __cache;
    };
}
/**
 * defineThrottleFn is a function that creates a throttled function.
 * @param {Function} fn - The function to be throttled.
 * @param {number} delay - The delay in milliseconds to wait before the throttled function is called. Default is 500ms.
 * @returns {CacheResultFunc} - The throttled function.
 */
function defineThrottleFn(fn, delay = 500) {
    let startTimer = null;
    let timer = null;
    delay = Math.max(delay, 0);
    const throttle = function (...args) {
        const curTimer = Date.now();
        const remainingTime = startTimer === null ? 0 : delay + startTimer - curTimer;
        clearTimeout(timer);
        if (remainingTime <= 0 || delay === 0) {
            throttle._result = fn.apply(this, args);
            startTimer = Date.now();
        }
        else {
            timer = setTimeout(() => {
                throttle._result = fn.apply(this, args);
            }, remainingTime);
        }
    };
    return throttle;
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * This function does nothing.
 *
 * @return {void} No return value.
 */
const noop = () => {
    /** */
};
/**
 * Sleeps for a given delay.
 *
 * @param {number} delay - The delay, in milliseconds.
 * @return {Promise<void>} A promise that resolves after the delay.
 */
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

/**
 * Capitalizes the first letter of a string.
 *
 * @param target - The string to be capitalized.
 * @return - The capitalized string.
 */
const capitalize = (target) => (target.charAt(0).toUpperCase() + target.slice(1));
/**
 * Returns a new string with the first character converted to lowercase.
 *
 * @param target - The string to be unCapitalized.
 * @returns - The unCapitalized string.
 */
const unCapitalize = (target) => (target.charAt(0).toLowerCase() + target.slice(1));
/**
 * @description Add the number of cuts based on the original split and return all subsets after the cut
 * @param str need to split of primitive string
 * @param splitStr split params
 * @param num split limit
 * @returns a new split array, length is num + 1
 */
function mulSplit(str, splitStr, num = -1) {
    const splitList = str.split(splitStr, num);
    if (num === -1)
        return splitList;
    const originStr = splitList.join(splitStr);
    if (originStr === str)
        return splitList;
    const endStr = str.slice(originStr.length + 1);
    splitList.push(endStr);
    return splitList;
}
/**
 * Converts an underline-separated string to camel case.
 * e.g. underlineToHump('hello_word') => 'helloWord'
 *
 * @param {string} target - The underline-separated string to convert.
 * @return {string} The camel case version of the input string.
 */
function underlineToHump(target) {
    let isStartUnderline = true;
    let prefixStr = null;
    let str = '';
    for (let i = 0; i < target.length; i++) {
        if (target[i] === '_' &&
            /[a-z]/.test(target[i + 1]) &&
            !isStartUnderline &&
            prefixStr !== '_') {
            i++;
            str += target[i].toUpperCase();
            continue;
        }
        prefixStr = target[i];
        if (isStartUnderline && target[i] !== '_') {
            isStartUnderline = false;
        }
        str += target[i];
    }
    return str;
}

/**
 * convert query string to object
 *
 * @param url http url
 * @returns
 */
function convertQueryString(url) {
    const query = url.split('?')[1];
    const result = {};
    if (query) {
        query.split('&').forEach((item) => {
            const [key, value] = item.split('=');
            Reflect.set(result, key, decodeURIComponent(value));
        });
    }
    return result;
}
/**
 * convert params routes to regular expressions
 *
 * @param path a params paths
 * @returns null or An array contains the RegExp that matches the params and the path for each params parameter
 */
function convertParamsRouterToRegExp(path) {
    const matcher = path.match(/:(.*?)(?:\/|$)/g);
    if (matcher === null)
        return null;
    const reg = new RegExp(path.replace(/:(.*?)(\/|$)/g, '.*?$2'));
    return [reg, matcher.map((val) => val.replace(/:(.*?)(\/|$)/g, '$1'))];
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
function basename(path, suffix) {
    const separator = '/';
    const index = path.lastIndexOf(separator);
    let str = path.slice(index + 1);
    if (str) {
        const querySeparator = str.lastIndexOf('?');
        if (querySeparator !== -1) {
            str = str.slice(0, querySeparator);
        }
    }
    if (suffix) {
        return str.replace(new RegExp(suffix + '$'), '');
    }
    return str;
}

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

async function executeConcurrency(tasks, maxConcurrency) {
    if (isUndef(maxConcurrency)) {
        console.warn('maxConcurrency is undefined');
        return null;
    }
    const ret = [];
    const excluding = [];
    for (let i = 0; i < tasks.length; i++) {
        const res = tasks[i]();
        ret.push(res);
        if (maxConcurrency < tasks.length) {
            const p = res.then(() => excluding.splice(excluding.indexOf(p), 1));
            excluding.push(p);
            if (excluding.length >= maxConcurrency) {
                await Promise.race(excluding);
            }
        }
    }
    return Promise.all(ret);
}
/**
 * Invokes a queue.
 *
 * @param {Array<(...args: any) => any>} taskArray - An array of tasks to be executed.
 * @return {Promise<void>} - A promise that resolves when all tasks are completed.
 */
function executeQueue(taskArray) {
    const taskQueue = taskArray.slice();
    let index = 0;
    return new Promise((resolve) => {
        const loopFunc = () => {
            if (index >= taskQueue.length) {
                resolve();
                return;
            }
            const fn = taskQueue[index++];
            fn &&
                Promise.resolve(fn?.()).finally(() => {
                    loopFunc();
                });
        };
        loopFunc();
    });
}
const definePrams = (params, index) => {
    if (index === 0 && Array.isArray(params)) {
        return params;
    }
    return [params];
};
/**
 * Takes a series of functions and returns a new function that runs these functions in sequence.
 * If a function returns a Promise, the next function is called with the resolved value.
 *
 * @param {...Array<fn>} fns - The functions to pipe.
 * @returns {function} A new function that takes any number of arguments and pipes them through `fns`.
 */
function pipe(...fns) {
    return (...args) => {
        if (fns.length === 0)
            return args[0];
        return fns.reduce((arg, fn, index) => {
            if (isPromise$1(arg)) {
                return arg.then((res) => {
                    return fn(...definePrams(res, index));
                });
            }
            return fn(...definePrams(arg, index));
        }, args);
    };
}
/**
 * Takes a series of functions and returns a new function that runs these functions in reverse sequence.
 * If a function returns a Promise, the next function is called with the resolved value.
 *
 * @param {...Array<fn>} fns - The functions to compose.
 * @returns {function} A new function that takes any number of arguments and composes them through `fns`.
 */
function compose(...fns) {
    return pipe(...fns.reverse());
}

export { _toString, basename, capitalize, compose, convertParamsRouterToRegExp, convertQueryString, defineDebounceFn, defineOnceFn, defineThrottleFn, executeConcurrency, executeQueue, getCurrentTimeISOString, hasOwn, isArrayEquals, isBool, isEffectiveNumber, isFalsy, isFn, isNull, isNumber, isObject, isPrimitive, isPromise, isStr, isUndef, mulSplit, noop, pipe, random, randomUUID, sleep, unCapitalize, underlineToHump };
