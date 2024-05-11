import {
  executeConcurrency,
  executeQueue,
  pipe,
  compose,
} from '../../lib/workers'

const warningFn = console.warn = jest.fn()

describe('executeConcurrency module', () => {
  it('should return a promise that resolves with an array of results', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
    ]
    const maxConcurrency = 3

    const results = await executeConcurrency(tasks, maxConcurrency)
    expect(results).toEqual([1, 2, 3])
  })

  it('should return a promise that resolves with an array of results when maxConcurrency is less than tasks.length', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
      () => Promise.resolve(4),
    ]
    const maxConcurrency = 3
    const res = await executeConcurrency(tasks, maxConcurrency)
    expect(res).toEqual([1, 2, 3, 4])
  })

  it('should return a promise that resolves with an array of results when maxConcurrency is less than tasks.length', async () => {
    jest.useFakeTimers()
    const _PromiseAll = Promise.all
    Promise.all = jest.fn((tasks) => tasks) as any
    const status = Array.from({ length: 4 }).map(() => false)
    const fn = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            status[0] = true
            resolve(1)
          }, 1000),
        ),
    )
    const fn1 = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            status[1] = true
            resolve(2)
          }, 1500),
        ),
    )
    const fn2 = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            status[2] = true
            resolve(3)
          }, 2000),
        ),
    )
    const fn3 = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            status[3] = true
            resolve(4)
          }, 2500),
        ),
    )
    const tasks = [fn, fn1, fn2, fn3]
    const maxConcurrency = 3
    const result = executeConcurrency(tasks, maxConcurrency)
    expect(fn).toBeCalledTimes(1)
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
    expect(fn3).toBeCalledTimes(0)
    expect(status).toEqual([false, false, false, false])
    result.then(async (res) => {
      expect(status).toEqual([true, true, true, false])
      expect(fn3).toBeCalledTimes(1)
      await _PromiseAll(res!)
      expect(status).toEqual([true, true, true, true])
    })
  })

  it('should return undefined when maxConcurrency is undefined', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
    ]

    const maxConcurrency = undefined
    const res = await executeConcurrency(tasks, maxConcurrency as any)
    expect(res).toBeNull()
    expect(warningFn).toHaveBeenCalledTimes(1)
  })
})

describe('invoke task queue', () => {
  test('should execute tasks in order', () => {
    const taskArray = [
      jest.fn(() => Promise.resolve('Task 1')),
      jest.fn(() => Promise.resolve('Task 2')),
      jest.fn(() => Promise.resolve('Task 3')),
    ]

    return executeQueue(taskArray).then(() => {
      expect(taskArray[0]).toHaveBeenCalled()
      expect(taskArray[1]).toHaveBeenCalled()
      expect(taskArray[2]).toHaveBeenCalled()
      expect(taskArray[0].mock.invocationCallOrder[0]).toBeLessThan(
        taskArray[1].mock.invocationCallOrder[0],
      )
      expect(taskArray[1].mock.invocationCallOrder[0]).toBeLessThan(
        taskArray[2].mock.invocationCallOrder[0],
      )
    })
  })

  test('should handle empty task array', () => {
    const taskArray: Array<(...args: any) => any> = []

    return executeQueue(taskArray).then(() => {
      expect(taskArray.length).toBe(0)
    })
  })

  test('should handle tasks that return promises', () => {
    const taskArray = [
      jest.fn(() => Promise.resolve('Task 1')),
      jest.fn(() => Promise.resolve('Task 2')),
      jest.fn(() => Promise.resolve('Task 3')),
    ]

    return executeQueue(taskArray).then(() => {
      expect(taskArray[0]).toHaveBeenCalled()
      expect(taskArray[1]).toHaveBeenCalled()
      expect(taskArray[2]).toHaveBeenCalled()
    })
  })
})

describe('pipe', () => {
  test('should correctly pipe the output of one function into the next', () => {
    const addTwo = (num: number) => num + 2
    const multiplyByThree = (num: number) => num * 3
    const subtractFive = (num: number) => num - 5

    const pipedFunction = pipe(addTwo, multiplyByThree, subtractFive)

    expect(pipedFunction(5)).toEqual(16)
  })

  test('should handle promises correctly', async () => {
    const addTwo = (num: number) => Promise.resolve(num + 2)
    const multiplyByThree = (num: number) => num * 3
    const subtractFive = (num: number) => num - 5

    const pipedFunction = pipe(addTwo, multiplyByThree, subtractFive)

    expect(await pipedFunction(5)).toEqual(16)
  })

  test('should return the input unchanged when no functions are provided', () => {
    const pipedFunction = pipe()

    expect(pipedFunction(5)).toEqual(5)
  })
})

describe('compose', () => {
  test('should correctly compose the output of one function into the next', () => {
    const addTwo = (num: number) => num + 2
    const multiplyByThree = (num: number) => num * 3
    const subtractFive = (num: number) => num - 5

    const composedFunction = compose(subtractFive, multiplyByThree, addTwo)

    expect(composedFunction(5)).toEqual(16)
  })

  test('should handle promises correctly', async () => {
    const addTwo = (num: number) => Promise.resolve(num + 2)
    const multiplyByThree = (num: number) => num * 3
    const subtractFive = (num: number) => num - 5

    const composedFunction = compose(subtractFive, multiplyByThree, addTwo)

    expect(await composedFunction(5)).toEqual(16)
  })

  test('should return the input unchanged when no functions are provided', () => {
    const composedFunction = compose()

    expect(composedFunction(5)).toEqual(5)
  })
})
