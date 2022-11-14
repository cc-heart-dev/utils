import { getCurrentTimeISOString } from '../../lib/date'

describe('getCurrentTimeISOString', () => {
  test('should return a string in ISO format', () => {
    const result = getCurrentTimeISOString()
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
  })

  test('should return a string in UTC timezone', () => {
    const result = getCurrentTimeISOString()
    expect(result.endsWith('Z')).toBe(true)
  })
})
