// 黑名单判断函数
import { COMMON_DOM_TARGETS } from '../constants'

export function isElementInBlacklist(
  target: EventTarget,
  customBlacklist: EventTarget[] = COMMON_DOM_TARGETS
): boolean {
  return customBlacklist.includes(target)
}
