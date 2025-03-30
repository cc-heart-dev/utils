const LOG_LEVELS = {
  ERROR: 0,
  WARNING: 1,
  NORMAL: 2,
  DEBUG: 3,
  TRACE: 4,
}

const ANSI_COLORS = {
  [LOG_LEVELS.ERROR]: '\x1b[31m', // 红色
  [LOG_LEVELS.WARNING]: '\x1b[33m', // 黄色
  [LOG_LEVELS.NORMAL]: '\x1b[32m', // 绿色
  [LOG_LEVELS.DEBUG]: '\x1b[34m', // 蓝色
  [LOG_LEVELS.TRACE]: '\x1b[35m' // 紫色
}

const LOG_LEVEL_NAMES = {
  [LOG_LEVELS.ERROR]: 'error',
  [LOG_LEVELS.WARNING]: 'warning',
  [LOG_LEVELS.NORMAL]: 'info',
  [LOG_LEVELS.DEBUG]: 'debug',
  [LOG_LEVELS.TRACE]: 'trace'
}

function isUnicodeSupported() {
  // @ts-ignore
  return typeof window === 'undefined'
}

const unicode = isUnicodeSupported()
const s = (c: string, fallback: string) => (unicode ? c : fallback)

const TYPE_ICONS = {
  error: s('✖', '×'),
  fatal: s('✖', '×'),
  ready: s('✔', '√'),
  warn: s('⚠', '‼'),
  info: s('ℹ', 'i'),
  success: s('✔', '√'),
  debug: s('⚙', 'D'),
  trace: s('→', '→'),
  fail: s('✖', '×'),
  start: s('◐', 'o'),
  log: ''
}
class Logger {
  private level: number
  constructor(level = LOG_LEVELS.NORMAL) {
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
    console.log(
      `${color}${icon}\x1b[0m [${levelName}] (${timestamp}) ${message}`
    )
  }

  error(message: string) {
    this.log(LOG_LEVELS.ERROR, message)
  }

  warning(message: string) {
    this.log(LOG_LEVELS.WARNING, message)
  }

  normal(message: string) {
    this.log(LOG_LEVELS.NORMAL, message)
  }

  info(message: string) {
    this.log(LOG_LEVELS.DEBUG, message)
  }

  trace(message: string) {
    this.log(LOG_LEVELS.TRACE, message)
  }
}

export default Logger
