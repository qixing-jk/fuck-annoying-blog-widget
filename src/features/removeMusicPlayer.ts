import { onDOMReady, watchAndDestroy } from '../utils'
import { createLogger } from '../utils/logger'

const logger = createLogger('removeMusicPlayer')

function pauseMetingMusicPlayer(element?: Element) {
  const metingPlayerPauseButton = (element ||
    document.querySelector('.aplayer-pause')) as HTMLButtonElement
  logger.info('features:removeMusicPlayer.pauseBtn', { btn: !!metingPlayerPauseButton })
  if (metingPlayerPauseButton) {
    logger.info('features:removeMusicPlayer.paused')
    metingPlayerPauseButton?.click()
  }
}

function removeMetingMusicPlayer() {
  const ELEMENT_TAG = 'meting-js .aplayer-pause'
  onDOMReady(() => {
    watchAndDestroy(`${ELEMENT_TAG}`, {
      beforeFound: (element) => {
        pauseMetingMusicPlayer(element)
      },
      keep: true,
    })
  })
}

export default function removeMusicPlayer() {
  removeMetingMusicPlayer()
}
