import { fn } from '../helper';
export declare function executeConcurrency(tasks: Array<fn>, maxConcurrency: number): Promise<any[] | null>;
/**
 * Invokes a queue.
 *
 * @param {Array<(...args: any) => any>} taskArray - An array of tasks to be executed.
 * @return {Promise<void>} - A promise that resolves when all tasks are completed.
 */
export declare function executeQueue(taskArray: Array<(...args: any) => any>): Promise<void>;
/**
 * Takes a series of functions and returns a new function that runs these functions in sequence.
 * If a function returns a Promise, the next function is called with the resolved value.
 *
 * @param {...Array<fn>} fns - The functions to pipe.
 * @returns {function} A new function that takes any number of arguments and pipes them through `fns`.
 */
export declare function pipe(...fns: Array<fn>): (...args: any[]) => any;
/**
 * Takes a series of functions and returns a new function that runs these functions in reverse sequence.
 * If a function returns a Promise, the next function is called with the resolved value.
 *
 * @param {...Array<fn>} fns - The functions to compose.
 * @returns {function} A new function that takes any number of arguments and composes them through `fns`.
 */
export declare function compose(...fns: Array<fn>): (...args: any[]) => any;
