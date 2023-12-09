import {
  defineDebounceFn,
  defineOnceFn,
  defineThrottleFn,
} from '../../lib/define'

describe('defineDebounceFn', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('should be called only once when ', () => {
    const fn = jest.fn()
    const debounce = defineDebounceFn(fn)
    debounce()
    debounce()
    debounce()
    jest.runAllTimers()
    expect(fn.mock.calls.length).toBe(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should be called every when execution is delayed', async () => {
    const fn = jest.fn()
    const debounce = defineDebounceFn(fn, 500)
    debounce()
    jest.runAllTimers()
    debounce()
    jest.runAllTimers()
    debounce()
    jest.runAllTimers()
    expect(fn.mock.calls.length).toBe(3)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('should be called immediately when set immediate', async () => {
    const fn = jest.fn()
    const debounce = defineDebounceFn(fn, 500, true)
    debounce()
    debounce()
    debounce()
    expect(fn).toHaveBeenCalled()
    jest.advanceTimersByTime(500)
    expect(fn.mock.calls.length).toBe(2)
  })
})

describe('defineOnceFn module', () => {
  it('should return a function', () => {
    const fn = defineOnceFn(() => null)
    expect(fn instanceof Function).toBeTruthy()
  })

  it('throw error when params is not a function', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fn = () => defineOnceFn('')
    expect(fn).toThrowError('first params must be a function')
  })

  it('It should only be executed once when it is called multiple times', () => {
    const mockFn = jest.fn((num1: number, num2: number) => num1 + num2)
    const fn = defineOnceFn(() => mockFn(1, 2))
    for (let i = 0; i < 3; i++) {
      fn()
    }
    expect(mockFn.mock.calls.length).toBe(1)
  })
})

describe('defineThrottleFn', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('should call the function immediately if the delay is 0', async () => {
    const fn = jest.fn()

    const delay = 0
    const throttledFn = defineThrottleFn(fn, delay)
    throttledFn()
    expect(fn).toHaveBeenCalled()
  })

  it('should call the function immediately if the delay is negative', async () => {
    const delay = -100
    const fn = jest.fn()

    const throttledFn = defineThrottleFn(fn, delay)
    throttledFn()
    expect(fn).toHaveBeenCalled()
  })

  it('if the execution time is less than the delay, it will be executed at the delay time', async () => {
    const delay = 100
    const fn = jest.fn()

    const throttledFn = defineThrottleFn(fn, delay)
    throttledFn()
    throttledFn()

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  test('should call the function again after the default delay', () => {
    const fn = jest.fn()
    const throttledFn = defineThrottleFn(fn)

    throttledFn()
    jest.advanceTimersByTime(500)
    throttledFn()

    expect(fn).toHaveBeenCalledTimes(2)
  })
})
