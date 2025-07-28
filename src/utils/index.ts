// 黑名单判断函数
import { COMMON_DOM_TARGETS } from '../constants'

export function isElementInBlacklist(
  target: EventTarget,
  customBlacklist: EventTarget[] = COMMON_DOM_TARGETS
): boolean {
  return customBlacklist.includes(target)
}

/**
 * 一个健壮的、可复用的函数，用于监视并移除动态添加的元素。
 * @param selector 要查找的元素的 CSS 选择器。
 * @param onFound (可选) 找到并移除元素后要执行的回调函数。
 * @param targetNode (可选) 监视的根节点，默认为 document.body。
 * @param options (可选) MutationObserver 的配置对象。
 */
export function watchAndDestroy(
  selector: string,
  onFound?: (node: Element) => void,
  targetNode: Node = document.body,
  options: MutationObserverInit = {
    childList: true,
    subtree: true,
  }
) {
  // 1. 尝试立即执行，处理非延迟加载的情况
  const element = document.querySelector(selector)
  if (element) {
    console.log(`[Watcher] 目标 "${selector}" 被立即发现并移除。`)
    element.remove()
    onFound?.(element)
    return // 任务完成
  }

  // 2. 如果没找到，启动监视器
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
            targetElement.remove()

            // 执行回调
            onFound?.(targetElement)

            // 关键：完成任务后，立即断开观察者！
            obs.disconnect()
            console.log(`[Watcher] 任务完成，针对 "${selector}" 的监视器已自动停止。`)
            return // 退出所有循环
          }
        }
      }
    }
  })

  observer.observe(targetNode, options)
}
