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
 * @param fn - The function to be debounced.
 * @param delay - The delay in milliseconds to wait before the debounced function is called. Default is 500ms.
 * @param immediate - Whether the debounced function should be called immediately before the delay. Default is false.
 * @returns - The debounce function.
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
 * @param  fn - The function to be called once.
 * @returns  - A new function that can only be called once.
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
 * @param - The function to be throttled.
 * @param - The delay in milliseconds to wait before the throttled function is called. Default is 500ms.
 * @returns - The throttled function.
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

/**
 * defineSinglePromiseFn ensures that the provided function can only be called once at a time.
 * If the function is invoked while it's still executing, it returns the same promise, avoiding multiple calls.
 *
 * @param fn - The function to be wrapped, which returns a promise.
 * @returns A function that ensures the provided function is only executed once and returns a promise.
 */
export function defineSinglePromiseFn(fn: Fn) {
  let ret: null | Promise<any> = null

  return function () {
    if (ret === null) {
      ret = Promise.resolve(fn()).finally(() => {
        ret = null
      })
    }

    return ret
  }
}
