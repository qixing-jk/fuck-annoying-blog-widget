// 黑名单判断函数
import { COMMON_DOM_TARGETS } from '../constants'

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
  // 立即查找
  const element = document.querySelector(selector)

  if (element) {
    console.log(`[Watcher] 目标 "${selector}" 被立即发现。`)
    handleFoundElement(element)
    return
  }

  // 如果没找到，启动监视器
  console.log(`[Watcher] 未发现 "${selector}"，启动监视器...`)

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
            console.log(`[Watcher] 检测到延迟加载的目标 "${selector}"，正在移除...`)
            handleFoundElement(targetElement)
            obs.disconnect()
            console.log(`[Watcher] 任务完成，针对 "${selector}" 的监视器已自动停止。`)
            return
          }
        }
      }
    }
  })

  observer.observe(targetNode, observerOptions)

  function handleFoundElement(element: Element) {
    options.beforeFound?.(element)
    if (!options.keep) element.remove()
    options.afterFound?.(element)
  }
}
