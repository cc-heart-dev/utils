'use strict';

var types = require('util/types');
var validate = require('./validate.cjs');

async function executeConcurrency(tasks, maxConcurrency) {
    if (validate.isUndef(maxConcurrency)) {
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
            if (types.isPromise(arg)) {
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

exports.compose = compose;
exports.executeConcurrency = executeConcurrency;
exports.executeQueue = executeQueue;
exports.pipe = pipe;
