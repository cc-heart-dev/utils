import { noop, sleep } from '../../lib/shard'

describe('noop function', () => {
  expect(noop()).toBeUndefined()
})

describe('sleep function', () => {
  it('should be called only once when ', async () => {
    const fn = jest.fn()
    const act = sleep(500)
    act.then(fn)
    expect(fn).not.toBeCalled()
    jest.runAllTimers()
    await act
    expect(fn).toBeCalled()
  })
})
