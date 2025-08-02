import pkg from '../../package.json'

export type LogLevel = 'info' | 'warn' | 'error'

interface LoggerOptions {
  module: string
}

class Logger {
  private module: string
  private env: string

  constructor(options: LoggerOptions) {
    this.module = options.module
    this.env = process.env.NODE_ENV || 'development'
  }

  info(msg: string = '', ...args: any[]) {
    if (this.env !== 'production') {
      console.info(this.formatMsg(msg), ...args)
    }
  }

  warn(msg: string = '', ...args: any[]) {
    console.warn(this.formatMsg(msg), ...args)
  }

  error(msg: string = '', ...args: any[]) {
    console.error(this.formatMsg(msg), ...args)
  }

  private formatMsg(msg: string): string {
    return `[${pkg.name}] [${this.module}] ${msg}`
  }
}

export function createLogger(module: string) {
  return new Logger({ module })
}

// 推荐用法：
// const logger = createLogger('removeMusicPlayer')
// logger.info(i18n.t('features:removeMusicPlayer.label', { foo: 123 }), someObj)
// logger.warn('Some warning', { detail: 'xxx' })
// logger.error(i18n.t('common:error'), errorObj)

// 新增多语言时请同步维护 en/zh-CN 等 json 文件，避免遗漏！
