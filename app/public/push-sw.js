// Importado pelo service worker gerado (vite-plugin-pwa): recebe os lembretes e abre o app ao tocar.
self.addEventListener('push', (event) => {
  let dados = {}
  try { dados = event.data ? event.data.json() : {} } catch { dados = { corpo: event.data && event.data.text() } }
  const titulo = dados.titulo || 'CBMAPP'
  event.waitUntil(
    self.registration.showNotification(titulo, {
      body: dados.corpo || 'Hora de estudar!',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: dados.tag || 'lembrete',
      data: { url: dados.url || '/' },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = (event.notification.data && event.notification.data.url) || '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((janelas) => {
      for (const j of janelas) if ('focus' in j) return j.focus()
      return self.clients.openWindow(url)
    }),
  )
})
