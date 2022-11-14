import { type fn } from '../typings/helper';
type CacheResultFunc = {
    _result?: any;
    (...args: any): any;
};
interface DefineDebounceFn {
    (fn: CacheResultFunc, delay?: number, immediate?: boolean): ReturnType<CacheResultFunc>;
}
/**
 * DefineDebounceFn is a function that creates a debounced function.
 * @param {Function} fn - The function to be debounced.
 * @param {number} delay - The delay in milliseconds to wait before the debounced function is called. Default is 500ms.
 * @param {boolean} immediate - Whether the debounced function should be called immediately before the delay. Default is false.
 * @returns {CacheResultFunc} - The debounce function.
 */
export declare const defineDebounceFn: DefineDebounceFn;
/**
 * Creates a function that can only be called once.
 *
 * @param {(...args: any) => any} fn - The function to be called once.
 * @returns {(...args: any) => any} - A new function that can only be called once.
 */
export declare function defineOnceFn<T>(fn: (...args: any) => T | null): (this: any, ...args: any) => T | null;
/**
 * defineThrottleFn is a function that creates a throttled function.
 * @param {Function} fn - The function to be throttled.
 * @param {number} delay - The delay in milliseconds to wait before the throttled function is called. Default is 500ms.
 * @returns {CacheResultFunc} - The throttled function.
 */
export declare function defineThrottleFn(fn: fn, delay?: number): CacheResultFunc;
export {};
