import { random } from '../../lib/random'

describe('random module', () => {
  test('should return a random number within the provided range', () => {
    const min = 1
    const max = 10
    const result = random(min, max)
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })

  test('should return the min value when min and max are the same', () => {
    const min = 5
    const max = 5
    const result = random(min, max)
    expect(result).toEqual(min)
  })

  test('should return an integer', () => {
    const min = 0
    const max = 100
    const result = random(min, max)
    expect(Number.isInteger(result)).toBe(true)
  })
})
