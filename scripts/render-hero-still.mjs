// Captures the live hero scene as public/images/hero-scene.webp (the still for phones, reduced motion, no-JS).
// Usage: start the dev server (`npm run dev`), then: node scripts/render-hero-still.mjs [devUrl]
// The capture page is rendered larger than the stage, matching Hero3D.vue's canvas overflow (inset -14% -24% -12% -14%),
// then cropped back to the 4:3 stage so the still lines up with the desktop composition.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import sharp from 'sharp'

const dev = process.argv[2] ?? 'http://localhost:5173'
const STAGE = { w: 1200, h: 900 }
const pad = { left: 0.14, right: 0.24, top: 0.14, bottom: 0.12 }
const full = { w: Math.round(STAGE.w * (1 + pad.left + pad.right)), h: Math.round(STAGE.h * (1 + pad.top + pad.bottom)) }

const browser = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync)
if (!browser) throw new Error('Edge or Chrome not found')

const dir = mkdtempSync(join(tmpdir(), 'hero-still-'))
const shot = join(dir, 'shot.png')
try {
  execFileSync(browser, [
    '--headless=new', '--hide-scrollbars', '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
    `--user-data-dir=${join(dir, 'profile')}`, `--window-size=${full.w},${full.h}`,
    '--virtual-time-budget=8000', `--screenshot=${shot}`, `${dev}/scripts/hero-still.html`,
  ], { stdio: 'ignore', timeout: 120_000 })
  const out = resolve('public/images/hero-scene.webp')
  await sharp(shot)
    .extract({ left: Math.round(STAGE.w * pad.left), top: Math.round(STAGE.h * pad.top), width: STAGE.w, height: STAGE.h })
    .webp({ quality: 82 })
    .toFile(out)
  console.log('Wrote', out)
} finally {
  rmSync(dir, { recursive: true, force: true })
}
