import { watchAndDestroy } from '../utils'

function pauseMetingMusicPlayer() {
  const metingPlayerPauseButton = document.querySelector('.aplayer-pause') as HTMLButtonElement
  if (metingPlayerPauseButton) {
    metingPlayerPauseButton.click()
  }
}

function removeMetingMusicPlayer() {
  const ELEMENT_TAG = 'meting-js'
  pauseMetingMusicPlayer()
  watchAndDestroy(`${ELEMENT_TAG}`, () => {
    const metingPlayers = document.getElementsByTagName(ELEMENT_TAG)
    for (const metingPlayer of metingPlayers) {
      metingPlayer.remove()
      console.log('[Meting Player Blocker] meting player removed.')
    }
  })
}

export default function removeMusicPlayer() {
  console.log('remove music player')
  removeMetingMusicPlayer()
}
