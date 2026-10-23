import { supabase } from './supabase'

// Lembretes por Web Push. O GitHub Actions (scripts/enviar-lembretes.mjs) roda de hora em hora
// e manda a notificação no horário escolhido, só se você ainda não bateu a meta do dia.
// Chave pública VAPID (a privada fica só nos secrets do GitHub).
const VAPID_PUBLICA = 'BCpWR-7NiWrUwO59z9UBCT4wT_RgX0ovValHXuMeJx9h-AjHp9cE_d2elEbFlOLZGhKXauVt-OkCMqVPw8N7rpA'

export function pushSuportado() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
}

function chaveParaBytes(base64: string) {
  const pad = '='.repeat((4 - (base64.length % 4)) % 4)
  const b = atob((base64 + pad).replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(b, (c) => c.charCodeAt(0))
}

async function registroSW(): Promise<ServiceWorkerRegistration> {
  const tempo = new Promise<never>((_, rej) => setTimeout(() => rej(new Error('O app precisa estar publicado (ou instalado) para usar notificações.')), 5000))
  return Promise.race([navigator.serviceWorker.ready, tempo])
}

export interface EstadoPush {
  permissao: NotificationPermission
  ativo: boolean
  hora: number
}

export async function lerEstadoPush(): Promise<EstadoPush> {
  const permissao = Notification.permission
  if (!supabase || permissao !== 'granted') return { permissao, ativo: false, hora: 19 }
  try {
    const reg = await registroSW()
    const sub = await reg.pushManager.getSubscription()
    if (!sub) return { permissao, ativo: false, hora: 19 }
    const { data } = await supabase.from('push_inscricoes').select('hora, ativo').eq('endpoint', sub.endpoint).maybeSingle()
    return { permissao, ativo: !!data?.ativo, hora: data?.hora ?? 19 }
  } catch {
    return { permissao, ativo: false, hora: 19 }
  }
}

export async function ativarPush(hora: number) {
  if (!supabase) throw new Error('Notificações precisam do login (Supabase).')
  const permissao = await Notification.requestPermission()
  if (permissao !== 'granted') throw new Error('Permissão de notificação negada. Libere nas configurações do navegador.')
  const reg = await registroSW()
  const sub = (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: chaveParaBytes(VAPID_PUBLICA) }))
  const json = sub.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } }
  const { error } = await supabase.from('push_inscricoes').upsert(
    { endpoint: json.endpoint, p256dh: json.keys.p256dh, auth: json.keys.auth, hora, ativo: true },
    { onConflict: 'endpoint' },
  )
  if (error) throw error
}

export async function mudarHoraPush(hora: number) {
  if (!supabase) return
  const sub = await (await registroSW()).pushManager.getSubscription()
  if (!sub) return
  const { error } = await supabase.from('push_inscricoes').update({ hora }).eq('endpoint', sub.endpoint)
  if (error) throw error
}

export async function desativarPush() {
  const sub = await (await registroSW()).pushManager.getSubscription()
  if (!sub) return
  if (supabase) await supabase.from('push_inscricoes').delete().eq('endpoint', sub.endpoint)
  await sub.unsubscribe()
}

export async function testarNotificacao() {
  const reg = await registroSW()
  await reg.showNotification('CBMAPP · teste', { body: 'As notificações estão funcionando. 🔥', icon: '/icon-192.png', tag: 'teste' })
}
