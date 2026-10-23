// Gera os ícones PNG do app (192 e 512) sem dependências: uma chama em fundo escuro.
// Uso: node scripts/gerar-icones.mjs
import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const BG = [0x16, 0x19, 0x20]
const RED = [0xe5, 0x48, 0x4d]
const YEL = [0xf2, 0xc9, 0x4c]

// chama: gota invertida (círculo embaixo + ponta em cima)
function inFlame(x, y, cx, cy, r) {
  if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) return true
  const top = cy - r * 2.1
  if (y < top || y > cy) return false
  const t = (y - top) / (cy - top) // 0 na ponta, 1 no centro do círculo
  const half = r * Math.sqrt(t)
  return Math.abs(x - cx) <= half
}

function png(size) {
  const rows = []
  for (let y = 0; y < size; y++) {
    const row = [0]
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size
      let c = BG
      if (inFlame(u, v, 0.5, 0.62, 0.22)) c = RED
      if (inFlame(u, v, 0.5, 0.7, 0.1)) c = YEL
      row.push(...c)
    }
    rows.push(Buffer.from(row))
  }
  const raw = Buffer.concat(rows)
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    return c >>> 0
  })
  const crc = (buf) => {
    let c = 0xffffffff
    for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8)
    return (c ^ 0xffffffff) >>> 0
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
    const td = Buffer.concat([Buffer.from(type), data])
    const c = Buffer.alloc(4); c.writeUInt32BE(crc(td))
    return Buffer.concat([len, td, c])
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8; ihdr[9] = 2 // 8 bits, RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

for (const s of [192, 512]) writeFileSync(new URL(`../app/public/icon-${s}.png`, import.meta.url), png(s))
console.log('Ícones gerados em app/public/')
