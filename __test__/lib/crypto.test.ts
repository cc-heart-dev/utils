import { randomUUID } from '../../lib/crypto'

describe('UUID', () => {
  test('should generate unique UUIDs', () => {
    const uuids = new Set()
    for (let i = 0; i < 1000; i++) {
      const uuid = randomUUID()
      expect(uuids.has(uuid)).toBe(false) // 确保 UUID 是唯一的
      uuids.add(uuid)
    }
  })

  test('should generate UUIDs with correct format', () => {
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const uuid = randomUUID()
    expect(uuid).toMatch(uuidPattern) // 确保 UUID 符合规范
  })
})
