export default function removeMusicPlayer() {
  console.log('[Tampermonkey] remove music player')
  // Approximate implementation: removes music player elements from the page
  if (typeof document !== 'undefined') {
    const players = document.querySelectorAll('.music-player, audio')
    players.forEach((player) => player.remove())
  }
}
