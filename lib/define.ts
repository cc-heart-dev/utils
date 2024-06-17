import type { Fn } from '../typings/helper'

interface CacheResultFunc {
  _result?: any
  (...args: any): any
}

interface DefineDebounceFn {
  (
    fn: CacheResultFunc,
    delay?: number,
    immediate?: boolean
  ): ReturnType<CacheResultFunc>
}

/**
 * DefineDebounceFn is a function that creates a debounced function.
 * @param {Function} fn - The function to be debounced.
 * @param {number} delay - The delay in milliseconds to wait before the debounced function is called. Default is 500ms.
 * @param {boolean} immediate - Whether the debounced function should be called immediately before the delay. Default is false.
 * @returns {CacheResultFunc} - The debounce function.
 */
export const defineDebounceFn: DefineDebounceFn = function (
  fn: Fn,
  delay = 500,
  immediate = false
) {
  let timer: any | null = null
  const debounced: CacheResultFunc = function (this: any, ...args: any) {
    if (timer) clearTimeout(timer)

    if (immediate && !timer) {
      immediate = false
      debounced._result = fn.apply(this, args)
    } else {
      timer = setTimeout(() => {
        debounced._result = fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
  return debounced
}

/**
 * Creates a function that can only be called once.
 *
 * @param {(...args: any) => any} fn - The function to be called once.
 * @returns {(...args: any) => any} - A new function that can only be called once.
 */
export function defineOnceFn<T>(fn: (...args: any) => T) {
  let __once = false
  let __cache: T
  if (!(fn instanceof Function)) {
    throw new Error('first params must be a function')
  }
  return function (this: any, ...args: any) {
    if (!__once) {
      __once = true
      __cache = fn.apply(this, args)
    }
    return __cache
  }
}

/**
 * defineThrottleFn is a function that creates a throttled function.
 * @param {Function} fn - The function to be throttled.
 * @param {number} delay - The delay in milliseconds to wait before the throttled function is called. Default is 500ms.
 * @returns {CacheResultFunc} - The throttled function.
 */
export function defineThrottleFn(fn: Fn, delay = 500) {
  let startTimer: number | null = null
  let timer: any = null
  delay = Math.max(delay, 0)
  const throttle: CacheResultFunc = function (this: any, ...args: any) {
    const curTimer = Date.now()
    const remainingTime =
      startTimer === null ? 0 : delay + startTimer - curTimer
    clearTimeout(timer)

    if (remainingTime <= 0 || delay === 0) {
      throttle._result = fn.apply(this, args)
      startTimer = Date.now()
    } else {
      timer = setTimeout(() => {
        throttle._result = fn.apply(this, args)
      }, remainingTime)
    }
  }
  return throttle
}
