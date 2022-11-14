import { fn } from '../helper'
import { isUndef } from './validate'

export async function executeConcurrency(
  tasks: Array<fn>,
  maxConcurrency: number,
) {
  if (isUndef(maxConcurrency)) {
    console.warn('maxConcurrency is undefined')
    return null
  }
  const ret: Array<any> = []
  const excluding: any[] = []
  for (let i = 0; i < tasks.length; i++) {
    const res = tasks[i]()
    ret.push(res)

    if (maxConcurrency < tasks.length) {
      const p = res.then(() => excluding.splice(excluding.indexOf(p), 1))
      excluding.push(p)

      if (excluding.length >= maxConcurrency) {
        await Promise.race(excluding)
      }
    }
  }
  return Promise.all(ret)
}

/**
 * Invokes a queue.
 *
 * @param {Array<(...args: any) => any>} taskArray - An array of tasks to be executed.
 * @return {Promise<void>} - A promise that resolves when all tasks are completed.
 */
export function executeQueue(
  taskArray: Array<(...args: any) => any>,
): Promise<void> {
  const taskQueue = taskArray.slice()
  let index = 0
  return new Promise((resolve) => {
    const loopFunc = () => {
      if (index >= taskQueue.length) {
        resolve()
        return
      }
      const fn = taskQueue[index++]
      fn &&
        Promise.resolve(fn?.()).finally(() => {
          loopFunc()
        })
    }
    loopFunc()
  })
}
