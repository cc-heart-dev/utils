import Logger from '../../lib/log/index'

describe('logger', () => {
  it('logger test', () => {
    const logger = new Logger()

    logger.info('log')
    expect(true).toBe(true)
  })
})
