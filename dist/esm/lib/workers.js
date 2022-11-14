import { isUndef } from './validate.js';

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

export { executeConcurrency, executeQueue };
