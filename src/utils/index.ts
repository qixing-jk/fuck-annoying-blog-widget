// 黑名单判断函数
import { COMMON_DOM_TARGETS } from '../constants'
import { createLogger } from './logger'
import i18n from 'i18next'
import { deepmergeCustom } from 'deepmerge-ts'

export function isElementInBlacklist(
  target: EventTarget,
  customBlacklist: EventTarget[] = COMMON_DOM_TARGETS
): boolean {
  return customBlacklist.includes(target)
}

export interface WatchAndDestroyOptions {
  beforeFound?: (el: Element) => void
  afterFound?: (el: Element) => void
  keep?: boolean // true 表示不删除，默认 false
}

/**
 * 监视并移除动态添加的元素，支持前后回调和可选保留元素。
 */
export function watchAndDestroy(
  selector: string,
  options: WatchAndDestroyOptions = {},
  targetNode: Node = document.body,
  observerOptions: MutationObserverInit = { childList: true, subtree: true }
) {
  const logger = createLogger('watchAndDestroy')
  logger.info(i18n.t('utils:watchAndDestroy.startFind', { selector }))
  // 立即查找
  const element = document.querySelector(selector)

  if (element) {
    logger.info(i18n.t('utils:watchAndDestroy.nowFound', { selector }))
    handleFoundElement(element)
    return
  }

  // 如果没找到，启动监视器
  logger.info(i18n.t('utils:watchAndDestroy.startObserver', { selector }))
  const observer = new MutationObserver((mutationsList, obs) => {
    for (const mutation of mutationsList) {
      // 只关心节点添加事件
      if (mutation.type !== 'childList' || mutation.addedNodes.length === 0) continue

      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const elementNode = node as Element
          // 检查被添加的节点本身或其后代是否匹配选择器
          const targetElement = elementNode.matches(selector)
            ? elementNode
            : elementNode.querySelector(selector)

          if (targetElement) {
            logger.info(i18n.t('utils:watchAndDestroy.delayFound', { selector }))
            handleFoundElement(targetElement)
            obs.disconnect()
            logger.info(i18n.t('utils:watchAndDestroy.stopObserver', { selector }))
            return
          }
        }
      }
    }
  })

  observer.observe(targetNode, observerOptions)

  function handleFoundElement(element: Element) {
    options.beforeFound?.(element)
    if (!options.keep) {
      logger.info(i18n.t('utils:watchAndDestroy.destroy', { selector }))
      element.remove()
    }
    options.afterFound?.(element)
  }
}

/**
 * 在 DOM 加载完成后安全地执行一个函数。
 * @param callback 回调函数
 * @param delay 可选延迟毫秒数，默认 0（立即执行）
 */
export function onDOMReady(callback: () => void, delay = 0) {
  const run = () => {
    if (delay > 0) {
      setTimeout(callback, delay)
    } else {
      callback()
    }
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    run()
  } else {
    document.addEventListener('DOMContentLoaded', run, { once: true })
  }
}

export const deepmergeNoArray = deepmergeCustom({ mergeArrays: false })
