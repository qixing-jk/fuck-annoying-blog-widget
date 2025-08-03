import { createRoot } from 'react-dom/client'

export function injectReactWithShadow(Component: React.ReactElement, key: string) {
  let host = document.getElementById(key) as HTMLElement | null
  if (!host) {
    host = document.createElement('div')
    host.id = key
    document.body.appendChild(host)
  }
  let shadow = host.shadowRoot
  if (!shadow) {
    shadow = host.attachShadow({ mode: 'open' })
  }
  let mountPoint = shadow.querySelector('#mount') as HTMLElement | null
  if (!mountPoint) {
    mountPoint = document.createElement('div')
    mountPoint.id = 'mount'
    shadow.appendChild(mountPoint)
  }
  const root = createRoot(mountPoint)
  root.render(Component)
  return { root, host, shadow, mountPoint }
}
