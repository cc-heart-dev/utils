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

export { defineDebounceFn, defineOnceFn, defineThrottleFn };
