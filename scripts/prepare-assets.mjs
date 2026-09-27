import sharp from 'sharp'
import { resolve } from 'node:path'
import { stat } from 'node:fs/promises'

const images = resolve('public/images')
for (const name of ['alvin', 'projects/tunas-auction-web', 'projects/tunas-auction-app']) {
  const source = resolve(images, name + '.png')
  const target = resolve(images, name + '.webp')
  await sharp(source).webp({ quality: 80, effort: 6 }).toFile(target)
  console.log(name + ': ' + (await stat(source)).size + ' → ' + (await stat(target)).size + ' bytes')
}
// A code-native social preview, using the existing portrait and brand colors.
const card = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<rect width="1200" height="630" fill="#FAF9F6"/>
<path d="M64 92H1136M64 550H1136" stroke="#DFDCD3"/>
<text x="64" y="64" font-family="Arial,sans-serif" font-size="20" fill="#A8501F">ALVIN MALIK IBRAHIM</text>
<text x="64" y="224" font-family="Georgia,serif" font-size="74" fill="#1C1B18">Full-stack</text>
<text x="64" y="308" font-family="Georgia,serif" font-size="74" fill="#1C1B18">Developer.</text>
<text x="64" y="384" font-family="Arial,sans-serif" font-size="26" fill="#6B685F">Web, mobile, and business applications.</text>
<text x="64" y="441" font-family="Arial,sans-serif" font-size="24" fill="#A8501F">Laravel / PHP · Vue / Nuxt · Flutter</text>
<text x="64" y="593" font-family="Arial,sans-serif" font-size="22" fill="#1C1B18">alvinmalik.my.id</text>
<text x="844" y="593" font-family="Arial,sans-serif" font-size="20" fill="#6B685F">Indonesia · GMT+7</text>
</svg>`)
const portrait = await sharp(resolve(images, 'alvin.png')).resize(260, 390).png().toBuffer()
await sharp(card).composite([{ input: portrait, left: 870, top: 128 }]).png().toFile(resolve(images, 'og-portfolio.png'))
console.log('Social preview: 1200 × 630 PNG')
