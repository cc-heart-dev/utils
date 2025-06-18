/**
 * Log level constants.
 * Lower numbers indicate higher severity.
 */
const LOG_LEVELS = {
  START: -2,
  SUCCESS: -1,
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
}

/**
 * ANSI color codes for each log level (for terminal output).
 */
const ANSI_COLORS = {
  [LOG_LEVELS.START]: '\x1b[32m', // green
  [LOG_LEVELS.SUCCESS]: '\x1b[32m', // green
  [LOG_LEVELS.ERROR]: '\x1b[31m', // red
  [LOG_LEVELS.WARN]: '\x1b[33m', // yellow
  [LOG_LEVELS.INFO]: '\x1b[32m', // green
  [LOG_LEVELS.DEBUG]: '\x1b[34m', // blue
  [LOG_LEVELS.TRACE]: '\x1b[35m' // purple
}

/**
 * String labels for log levels.
 */
const LOG_LEVEL_NAMES = {
  [LOG_LEVELS.START]: 'success',
  [LOG_LEVELS.SUCCESS]: 'success',
  [LOG_LEVELS.ERROR]: 'error',
  [LOG_LEVELS.WARN]: 'warn',
  [LOG_LEVELS.INFO]: 'info',
  [LOG_LEVELS.DEBUG]: 'debug',
  [LOG_LEVELS.TRACE]: 'trace'
}

/**
 * Determines whether Unicode symbols are supported (non-browser environments).
 */
function isUnicodeSupported() {
  // @ts-expect-error: expect error
  return typeof window === 'undefined'
}

const unicode = isUnicodeSupported()

/**
 * Selects a Unicode symbol or fallback character.
 */
const s = (c: string, fallback: string) => (unicode ? c : fallback)

/**
 * Unicode/fallback icons used per log level.
 */
const TYPE_ICONS = {
  error: s('✖', '×'),
  warn: s('⚠', '‼'),
  info: s('ℹ', 'i'),
  debug: s('⚙', 'D'),
  trace: s('→', '→'),
  start: s('◐', 'o'),
  success: s('✔', '√'),
  log: ''
}

/**
 * Logger class for formatted and leveled log output.
 */
export class Logger {
  private level: number

  /**
   * Initializes the logger with an optional log level (default: TRACE).
   * @param level The minimum log level to output.
   */
  constructor(level = LOG_LEVELS.TRACE) {
    this.level = level
  }

  /**
   * Updates the logger's log level.
   * @param level New log level threshold.
   */
  setLevel(level: number) {
    this.level = level
  }

  /**
   * Core log function that handles formatted output.
   * @param level The severity level of the message.
   * @param message The message(s) to log.
   */
  log(level: number, ...message: string[]) {
    if (level > this.level) {
      return
    }
    const color = ANSI_COLORS[level] || ANSI_COLORS[LOG_LEVELS.INFO]
    const levelName: string = LOG_LEVEL_NAMES[level]
    const icon = Reflect.get(TYPE_ICONS, levelName) || ''
    const timestamp = new Date().toLocaleString()
    const logMethod = level === LOG_LEVELS.ERROR ? 'error' : 'log'
    console[logMethod](
      `${color}${icon}\x1b[0m [${levelName}] (${timestamp}) :`,
      ...message
    )
  }

  /**
   * Logs an error message (should be fixed immediately).
   * @example logger.error('API request failed', err)
   */
  error(...message: string[]) {
    this.log(LOG_LEVELS.ERROR, ...message)
  }

  /**
   * Logs a warning message (recoverable issues or alerts).
   * @example logger.warn('Missing optional config, using defaults')
   */
  warn(...message: string[]) {
    this.log(LOG_LEVELS.WARN, ...message)
  }

  /**
   * Logs an informational message (general purpose info).
   * @example logger.info('Server started on port 3000')
   */
  info(...message: string[]) {
    this.log(LOG_LEVELS.INFO, ...message)
  }

  /**
   * Logs a debug message (for developers).
   * @example logger.debug('User data:', user)
   */
  debug(...message: string[]) {
    this.log(LOG_LEVELS.DEBUG, ...message)
  }

  /**
   * Logs a trace message (detailed execution info).
   * @example logger.trace('Entering function handleClick()')
   */
  trace(...message: string[]) {
    this.log(LOG_LEVELS.TRACE, ...message)
  }

  /**
   * Logs a start/init message (task beginning).
   * @example logger.start('Uploading files...')
   */
  start(...message: string[]) {
    this.log(LOG_LEVELS.START, ...message)
  }

  /**
   * Logs a success message (completed task).
   * @example logger.success('Upload completed')
   */
  success(...message: string[]) {
    this.log(LOG_LEVELS.SUCCESS, ...message)
  }
}
