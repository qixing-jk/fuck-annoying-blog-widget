/**
 * 通用自动展开代码块功能
 * 适配常见博客/论坛/文档页面的折叠代码块，自动展开，低性能消耗
 */
import { onDOMReady } from '../utils'
import { createLogger } from '../utils/logger'
import i18n from 'i18next'
import { SiteConfig } from '../types'

const logger = createLogger('autoExpandCodeBlocks')

export const featureName = 'autoExpandCodeBlocks'

type AutoExpandCodeBlocksConfig = SiteConfig[typeof featureName]

function internalAutoExpandCodeBlocks(config: AutoExpandCodeBlocksConfig) {
  const selectors = config.selectors || []

  if (selectors.length === 0) {
    logger.warn(i18n.t('features:autoExpandCodeBlocks.noSelectors'))
    return
  }

  // 自动点击“展开”按钮（如有）
  let hasExpanded = false
  for (const sel of selectors) {
    try {
      const elements = document.querySelectorAll(sel)
      if (elements && elements.length > 0) {
        logger.info(i18n.t('features:autoExpandCodeBlocks.expandCodeBlocks'), {
          selector: sel,
          count: elements.length,
        })
        elements.forEach((btn) => {
          if (btn instanceof HTMLElement) {
            btn.click()
            hasExpanded = true
          }
        })
      }
    } catch (error) {
      logger.error(
        i18n.t('features:autoExpandCodeBlocks.selectorError', {
          selector: sel,
          error: error,
        })
      )
    }
  }

  if (!hasExpanded) {
    logger.warn(i18n.t('features:autoExpandCodeBlocks.noElementsFound'))
  }
}

function autoExpandCodeBlocks(config: AutoExpandCodeBlocksConfig) {
  if (!config.enabled) {
    return
  }
  onDOMReady(() => {
    internalAutoExpandCodeBlocks(config)
  }, 3000)
}

export default autoExpandCodeBlocks
