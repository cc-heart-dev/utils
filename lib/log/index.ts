const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  NORMAL: 2,
  DEBUG: 3,
  TRACE: 4
}

const ANSI_COLORS = {
  [LOG_LEVELS.ERROR]: '\x1b[31m', // red
  [LOG_LEVELS.WARN]: '\x1b[33m', // yellow
  [LOG_LEVELS.NORMAL]: '\x1b[32m', // green
  [LOG_LEVELS.DEBUG]: '\x1b[34m', // blue
  [LOG_LEVELS.TRACE]: '\x1b[35m' // purple
}

const LOG_LEVEL_NAMES = {
  [LOG_LEVELS.ERROR]: 'error',
  [LOG_LEVELS.WARN]: 'warn',
  [LOG_LEVELS.NORMAL]: 'info',
  [LOG_LEVELS.DEBUG]: 'debug',
  [LOG_LEVELS.TRACE]: 'trace'
}

function isUnicodeSupported() {
  // @ts-expect-error: expect error
  return typeof window === 'undefined'
}

const unicode = isUnicodeSupported()
const s = (c: string, fallback: string) => (unicode ? c : fallback)

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
export class Logger {
  private level: number
  constructor(level = LOG_LEVELS.TRACE) {
    this.level = level
  }

  setLevel(level: number) {
    this.level = level
  }

  log(level: number, message: string) {
    if (level > this.level) {
      return
    }
    const color = ANSI_COLORS[level] || ANSI_COLORS[LOG_LEVELS.NORMAL]
    const levelName: string = LOG_LEVEL_NAMES[level]
    const icon = Reflect.get(TYPE_ICONS, levelName) || ''
    const timestamp = new Date().toLocaleString()
    const logMethod = level === LOG_LEVELS.ERROR ? 'error' : 'log'
    console[logMethod](
      `${color}${icon}\x1b[0m [${levelName}] (${timestamp}) ${message}`
    )
  }

  error(message: string) {
    this.log(LOG_LEVELS.ERROR, message)
  }

  warn(message: string) {
    this.log(LOG_LEVELS.WARN, message)
  }

  info(message: string) {
    this.log(LOG_LEVELS.NORMAL, message)
  }

  debug(message: string) {
    this.log(LOG_LEVELS.DEBUG, message)
  }

  trace(message: string) {
    this.log(LOG_LEVELS.TRACE, message)
  }
}
