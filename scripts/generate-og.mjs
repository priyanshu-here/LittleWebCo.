/**
 * Generates the Open Graph image and PNG icons from SVG sources.
 * Run: npm run og
 */
import sharp from 'sharp'
import { readFile } from 'node:fs/promises'

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"

// Keep the OG image in sync with the brand name in src/data/site.ts
const siteSource = await readFile('src/data/site.ts', 'utf8')
const brand = (siteSource.match(/\bname:\s*'([^']+)'/)?.[1] ?? 'Little Web Company').replace(/\s*\.\s*$/, '')
const tagline = siteSource.match(/\btagline:\s*'([^']+)'/)?.[1] ?? ''
const [firstWord, ...restWords] = brand.split(' ')
const line1 = restWords.length ? firstWord : ''
const line2 = restWords.length ? restWords.join(' ') : brand

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f4f1ea"/>
  <g font-family="${FONT}" fill="#141311">
    <g font-size="18" letter-spacing="3" fill="#6b675f">
      <circle cx="80" cy="84" r="5" fill="#e8501e"/>
      <text x="100" y="90">INDEPENDENT DIGITAL STUDIO</text>
    </g>
    <text x="76" y="300" font-size="112" font-weight="500" letter-spacing="-5">${line1}</text>
    <text x="76" y="410" font-size="112" font-weight="500" letter-spacing="-5">${line2}<tspan fill="#e8501e">.</tspan></text>
    <text x="80" y="500" font-size="30" fill="#6b675f" letter-spacing="-0.5">${tagline.replace(/&/g, '&amp;')}</text>
  </g>
  <line x1="80" y1="546" x2="1120" y2="546" stroke="#d6d1c6" stroke-width="1.5"/>
  <g font-family="${FONT}" font-size="16" letter-spacing="2.5" fill="#6b675f">
    <text x="80" y="582">WEB DESIGN · UI/UX · DEVELOPMENT · SEO</text>
    <text x="1120" y="582" text-anchor="end">BASED IN INDIA · WORLDWIDE</text>
  </g>
</svg>`

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og-image.png')

const favicon = await readFile('public/favicon.svg')
for (const [name, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(favicon, { density: 384 }).resize(size, size).png().toFile(`public/${name}`)
}

console.log('Generated og-image.png and icons')
