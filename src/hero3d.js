// Three.js hero: laptop (web) + phone (mobile) from blender/hero.py, with live UI painted on the screens.
// Loaded lazily by Hero3D.vue on desktop only.
import { THREE, createStage, floorBlob, ease, clamp01 } from './three-stage.js'

const C = { bg: '#FAF9F6', panel: '#F0EDE5', line: '#E7E4DC', ink: '#1C1B18', muted: '#6B685F', accent: '#A8501F', ok: '#3F7D4E' }

function screenTexture(w, h) {
  const canvas = Object.assign(document.createElement('canvas'), { width: w, height: h })
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.flipY = false // glTF UVs
  tex.anisotropy = 4
  return { ctx: canvas.getContext('2d'), tex }
}

function rect(ctx, x, y, w, h, r, fill) {
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.fill()
}

// Web admin dashboard (1024 x 640).
function drawLaptop(ctx, t) {
  ctx.fillStyle = C.bg
  ctx.fillRect(0, 0, 1024, 640)
  rect(ctx, 0, 0, 1024, 44, 0, C.panel)
  ;['#D9776A', '#E2B85C', '#8DB27A'].forEach((c, i) => rect(ctx, 18 + i * 20, 16, 12, 12, 6, c))
  rect(ctx, 360, 10, 300, 24, 12, C.bg)
  ctx.fillStyle = C.muted
  ctx.font = '500 13px Inter, sans-serif'
  ctx.fillText('admin.app / dashboard', 400, 27)

  rect(ctx, 0, 44, 190, 596, 0, C.panel)
  for (let i = 0; i < 6; i++) rect(ctx, 20, 80 + i * 44, i === 1 ? 150 : 110 + (i % 3) * 14, 18, 9, i === 1 ? C.accent : C.line)

  ctx.fillStyle = C.ink
  ctx.font = '600 26px Inter, sans-serif'
  ctx.fillText('Overview', 220, 92)
  const stats = [['Revenue', 'Rp ' + (842 + Math.floor((t * 7) % 60)) + ' jt'], ['Orders', String(1200 + Math.floor(t * 3) % 90)], ['Synced', '100%']]
  stats.forEach(([label, value], i) => {
    const x = 220 + i * 260
    rect(ctx, x, 116, 240, 96, 14, '#FFFFFF')
    ctx.fillStyle = C.muted
    ctx.font = '500 15px Inter, sans-serif'
    ctx.fillText(label, x + 20, 148)
    ctx.fillStyle = i === 2 ? C.ok : C.ink
    ctx.font = '600 28px Inter, sans-serif'
    ctx.fillText(value, x + 20, 190)
  })

  // Bar chart that "breathes".
  rect(ctx, 220, 232, 500, 380, 14, '#FFFFFF')
  for (let i = 0; i < 9; i++) {
    const h = 90 + 150 * (0.5 + 0.5 * Math.sin(t * 1.4 + i * 0.8)) * (0.5 + (i % 4) / 6)
    rect(ctx, 252 + i * 50, 584 - h, 30, h, 6, i === 6 ? C.accent : '#E3C9B8')
  }
  // Activity list with a highlight that walks down.
  rect(ctx, 740, 232, 264, 380, 14, '#FFFFFF')
  const active = Math.floor(t * 0.8) % 6
  for (let i = 0; i < 6; i++) {
    const y = 256 + i * 58
    if (i === active) rect(ctx, 752, y - 8, 240, 50, 10, '#F7E9DF')
    rect(ctx, 764, y, 34, 34, 17, i === active ? C.accent : C.line)
    rect(ctx, 810, y + 4, 140 - (i % 3) * 20, 10, 5, C.line)
    rect(ctx, 810, y + 22, 90, 8, 4, C.panel)
  }
  // Moving pointer.
  const px = 600 + Math.sin(t * 0.9) * 220, py = 380 + Math.cos(t * 1.3) * 120
  ctx.fillStyle = C.ink
  ctx.beginPath()
  ctx.moveTo(px, py); ctx.lineTo(px, py + 26); ctx.lineTo(px + 7, py + 19); ctx.lineTo(px + 18, py + 19)
  ctx.closePath()
  ctx.fill()
}

// Mobile app (360 x 760).
function drawPhone(ctx, t) {
  ctx.fillStyle = C.bg
  ctx.fillRect(0, 0, 360, 760)
  ctx.fillStyle = C.ink
  ctx.font = '600 14px Inter, sans-serif'
  ctx.fillText('9:41', 28, 34)
  rect(ctx, 140, 16, 80, 22, 11, C.ink) // camera notch
  ctx.font = '600 26px Inter, sans-serif'
  ctx.fillText('Hi, welcome', 24, 92)
  ctx.fillStyle = C.muted
  ctx.font = '500 15px Inter, sans-serif'
  ctx.fillText('3 updates today', 24, 118)

  // Cards scroll upward in a loop.
  const offset = (t * 40) % 120
  ctx.save()
  ctx.beginPath(); ctx.rect(0, 140, 360, 500); ctx.clip()
  for (let i = -1; i < 6; i++) {
    const y = 150 + i * 120 - offset
    rect(ctx, 20, y, 320, 104, 16, '#FFFFFF')
    rect(ctx, 36, y + 16, 72, 72, 12, ['#E3C9B8', C.accent, '#D8CFC0'][(i + 3) % 3])
    rect(ctx, 122, y + 24, 150, 12, 6, C.line)
    rect(ctx, 122, y + 46, 100, 10, 5, C.panel)
    ctx.fillStyle = C.accent
    ctx.font = '600 16px Inter, sans-serif'
    ctx.fillText('Rp ' + (120 + ((i + 3) * 17) % 90) + ' jt', 122, y + 84)
  }
  ctx.restore()

  // Pulsing primary button.
  const pulse = 0.5 + 0.5 * Math.sin(t * 3)
  rect(ctx, 20 - pulse * 4, 668 - pulse * 3, 320 + pulse * 8, 60 + pulse * 6, 30, `rgba(168,80,31,${0.15 * pulse})`)
  rect(ctx, 20, 668, 320, 60, 30, C.accent)
  ctx.fillStyle = C.bg
  ctx.font = '600 18px Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Place bid', 180, 705)
  ctx.textAlign = 'left'

  // Toast that drops in every few seconds.
  const cycle = t % 5, drop = cycle < 2.5 ? ease(cycle * 2) : 1 - ease((cycle - 2.5) * 2)
  if (drop > 0.01) {
    const y = -60 + drop * 110
    rect(ctx, 20, y, 320, 54, 14, C.ink)
    rect(ctx, 36, y + 15, 24, 24, 12, C.ok)
    ctx.fillStyle = C.bg
    ctx.font = '500 15px Inter, sans-serif'
    ctx.fillText('Synced with web dashboard', 72, y + 33)
  }
}

export async function initHero3D(host, section) {
  const { scene, camera, model, start } = await createStage(host, { modelUrl: '/models/hero.glb', watch: section })
  camera.position.set(0, 2.6, 11)
  camera.lookAt(0, 0.7, 0)
  const key = new THREE.DirectionalLight(0xfff1e0, 1.4)
  key.position.set(3, 5, 6)
  scene.add(key)

  const lid = model.getObjectByName('Lid')
  const phone = model.getObjectByName('Phone')
  const laptopUI = screenTexture(1024, 640), phoneUI = screenTexture(360, 760)
  const screenMat = (tex) => new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })
  model.getObjectByName('LaptopScreen').material = screenMat(laptopUI.tex)
  model.getObjectByName('PhoneScreen').material = screenMat(phoneUI.tex)

  // Centre the model on a pivot so rotations look balanced.
  const box = new THREE.Box3().setFromObject(model)
  const centre = box.getCenter(new THREE.Vector3())
  model.position.set(-centre.x, -box.min.y, -centre.z)
  const rig = new THREE.Group()
  rig.add(model, floorBlob(9, 5))
  scene.add(rig)

  const lidOpen = lid.rotation.x, lidClosed = Math.PI / 2 // +X closes the lid onto the keyboard
  const phoneBase = phone.position.clone(), phoneRotY = phone.rotation.y

  let lastPaint = -1
  start((t, mouse) => {
    const intro = ease(t / 1.8) // lid opens and the rig settles on load
    const p = clamp01(scrollY / section.offsetHeight) // 0 at top, 1 when hero scrolled away

    if (t - lastPaint > 1 / 30) { // screens repaint at 30fps
      drawLaptop(laptopUI.ctx, t); laptopUI.tex.needsUpdate = true
      drawPhone(phoneUI.ctx, t); phoneUI.tex.needsUpdate = true
      lastPaint = t
    }

    lid.rotation.x = THREE.MathUtils.lerp(lidClosed, lidOpen, intro * (1 - p * 0.75))
    rig.rotation.y = -0.28 + (1 - intro) * 0.6 + mouse.x * 0.25 + p * 0.9
    rig.rotation.x = mouse.y * 0.08 + p * 0.25
    rig.position.y = -0.85 - (1 - intro) * 0.4 + p * 1.4
    rig.scale.setScalar(1 - p * 0.3)
    phone.position.set(phoneBase.x + p * 1.6, phoneBase.y + Math.sin(t * 1.2) * 0.06 + p * 0.4, phoneBase.z + p * 1.4)
    phone.rotation.y = phoneRotY - p * 0.5
  })
}
