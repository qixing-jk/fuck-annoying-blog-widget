import { onDOMReady, watchAndDestroy } from '../utils'

function pauseMetingMusicPlayer(element?: Element) {
  const metingPlayerPauseButton = (element ||
    document.querySelector('.aplayer-pause')) as HTMLButtonElement
  console.log('[Meting Player Blocker] metingPlayerPauseButton', metingPlayerPauseButton)
  if (metingPlayerPauseButton) {
    console.log('[Meting Player Blocker] meting player paused.')
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
  console.log('remove music player')
  removeMetingMusicPlayer()
}
