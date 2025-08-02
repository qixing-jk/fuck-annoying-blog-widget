/**
 * 通用自动展开代码块功能
 * 适配常见博客/论坛/文档页面的折叠代码块，自动展开，低性能消耗
 */
import { onDOMReady } from '../utils'
import { createLogger } from '../utils/logger'
import i18n from 'i18next'

const logger = createLogger('autoExpandCodeBlocks')

const BUTTON_SELECTORS = ['.show-btn']

function internalAutoExpandCodeBlocks() {
  // 自动点击“展开”按钮（如有）
  for (const sel of BUTTON_SELECTORS) {
    const elementNodeList = document.querySelectorAll(sel)
    if (elementNodeList) {
      logger.info(i18n.t('features:autoExpandCodeBlocks.expandCodeBlocks'), elementNodeList)
      elementNodeList.forEach((btn) => {
        if (btn instanceof HTMLElement) {
          btn.click()
        }
      })
      break
    }
  }
}

function autoExpandCodeBlocks() {
  onDOMReady(() => {
    internalAutoExpandCodeBlocks()
  }, 3000)
}

export default autoExpandCodeBlocks
