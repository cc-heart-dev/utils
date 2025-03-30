import Logger from '../../lib/log/index'

describe('logger', () => {
  it('logger test', () => {
    const logger = new Logger()
    logger.info('log')
    logger.debug('debug')
    logger.error('error')
    logger.trace('trace')
    logger.warn('wraning')
    expect(true).toBe(true)
  })
})
