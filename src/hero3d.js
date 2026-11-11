// Three.js hero: realistic laptop (web) + phone (mobile) from blender/hero_real.py, live UI on the screens,
// and the systems behind them (API, database, ERP). Loaded lazily by Hero3D.vue on desktop only.
import { THREE, createStage, ease, clamp01 } from './three-stage.js'

const C = { bg: '#FAF9F6', panel: '#F0EDE5', line: '#E7E4DC', ink: '#1C1B18', muted: '#6B685F', accent: '#A8501F', ok: '#3F7D4E' }

export function screenTexture(w, h) {
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
export function drawLaptop(ctx, t) {
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
export function drawPhone(ctx, t) {
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

// "The systems behind them": nodes behind the laptop, in rig space, revealed as the visitor scrolls.
const SYSTEMS = [['API', [0.6, 2.75, -1.6]], ['Database', [-1.7, 2.95, -2.4]], ['ERP', [2.8, 2.9, -2.2]]]
const EDGES = [[-1, 0], [0, 1], [0, 2]] // -1 = laptop screen
const ACCENT = 0xe0703a

function systemsLayer(rig, from) {
  const group = new THREE.Group()
  rig.add(group)
  const body = new THREE.MeshStandardMaterial({ color: 0x1c1b18, metalness: 0.5, roughness: 0.32 })
  const led = new THREE.MeshBasicMaterial({ color: ACCENT })
  const nodes = SYSTEMS.map(([, [x, y, z]]) => {
    const n = new THREE.Group()
    n.position.set(x, y, z)
    const slab = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.42, 0.16), body)
    slab.castShadow = true
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.01), led)
    strip.position.set(-0.12, 0, 0.085)
    n.add(slab, strip)
    group.add(n)
    return n
  })
  const edgeMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 })
  const dotGeo = new THREE.SphereGeometry(0.035, 12, 8)
  const edges = EDGES.map(([a, b]) => {
    const p0 = a < 0 ? from : nodes[a].position, p1 = nodes[b].position
    const mid = p0.clone().lerp(p1, 0.5).add(new THREE.Vector3(0, 0.6, 0))
    const curve = new THREE.QuadraticBezierCurve3(p0.clone(), mid, p1.clone())
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.012, 6), edgeMat))
    const dots = [0, 1, 2].map(() => { const d = new THREE.Mesh(dotGeo, led); group.add(d); return d })
    return { curve, dots }
  })
  return { nodes, edges, edgeMat }
}

// settled: render the end of the intro immediately (used to capture the still in scripts/hero-still.html).
export async function initHero3D(host, section, { settled = false } = {}) {
  const { renderer, scene, camera, model, start } = await createStage(host, { modelUrl: '/models/hero-real.glb', watch: section })
  // Real-time shadows are the costliest part of the hero; skip them on low-core / low-memory laptops.
  renderer.shadowMap.enabled = (navigator.hardwareConcurrency ?? 8) > 4 && (navigator.deviceMemory ?? 8) > 4
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  camera.position.set(0.6, 2.8, 11)
  camera.lookAt(0.6, 0.6, -0.6) // keeps devices + systems inside the 4:3 stage (the still is cropped to it)
  const key = new THREE.DirectionalLight(0xfff1e0, 2.0)
  key.position.set(4, 8, 5)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.radius = 6
  Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5 })
  scene.add(key)

  const lid = model.getObjectByName('Lid')
  const phone = model.getObjectByName('Phone')
  const laptopScreen = model.getObjectByName('LaptopScreen'), phoneScreen = model.getObjectByName('PhoneScreen')
  const laptopUI = screenTexture(1024, 640), phoneUI = screenTexture(360, 760)
  const screenMat = (tex) => new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })
  laptopScreen.material = screenMat(laptopUI.tex)
  phoneScreen.material = screenMat(phoneUI.tex)
  model.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })

  // Centre the model on a pivot so rotations look balanced.
  const box = new THREE.Box3().setFromObject(model)
  const centre = box.getCenter(new THREE.Vector3())
  model.position.set(-centre.x, -box.min.y, -centre.z)
  const rig = new THREE.Group()
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), new THREE.ShadowMaterial({ opacity: 0.16 }))
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  rig.add(model, floor)
  scene.add(rig)
  rig.updateMatrixWorld(true)

  const lidTop = rig.worldToLocal(laptopScreen.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.9, 0)))
  const systems = systemsLayer(rig, lidTop)
  const labels = [...host.querySelectorAll('.sys-label')]

  // Phone ↔ laptop sync: a line between the two screens with data dots riding it.
  const syncPts = Array.from({ length: 32 }, () => new THREE.Vector3())
  const syncLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(syncPts), new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.55 }))
  const syncDots = [0, 1, 2, 3].map(() => new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), new THREE.MeshBasicMaterial({ color: ACCENT })))
  rig.add(syncLine, ...syncDots)
  const syncCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3())

  const lidOpen = lid.rotation.x, lidClosed = Math.PI / 2 // +X closes the lid onto the keyboard
  const phoneBase = phone.position.clone(), phoneRotY = phone.rotation.y
  const v = new THREE.Vector3()

  let lastPaint = -1
  start((t, mouse) => {
    const intro = settled ? 1 : ease(t / 1.8) // lid opens and the rig settles on load
    const p = clamp01(scrollY / section.offsetHeight) // 0 at top, 1 when hero scrolled away
    const reveal = settled ? 1 : Math.max(ease((t - 2) / 1.4), ease(p / 0.2)) // systems layer: after the intro, or as soon as the visitor scrolls

    if (t - lastPaint > 1 / 30) { // screens repaint at 30fps
      drawLaptop(laptopUI.ctx, t); laptopUI.tex.needsUpdate = true
      drawPhone(phoneUI.ctx, t); phoneUI.tex.needsUpdate = true
      lastPaint = t
    }

    lid.rotation.x = THREE.MathUtils.lerp(lidClosed, lidOpen, intro * (1 - p * 0.6))
    rig.rotation.y = -0.32 + (1 - intro) * 0.6 + mouse.x * 0.22 + p * 0.6
    rig.rotation.x = mouse.y * 0.06 + p * 0.15
    rig.position.y = -1.0 - (1 - intro) * 0.4 + p * 0.6
    rig.scale.setScalar(1 - p * 0.25)
    phone.position.set(phoneBase.x + p * 1.2, phoneBase.y + Math.sin(t * 1.2) * 0.06 + p * 0.3, phoneBase.z + p * 1.1)
    phone.rotation.y = phoneRotY - p * 0.4

    // Sync line follows both screens (the phone floats and moves on scroll).
    rig.updateMatrixWorld(true)
    const a = rig.worldToLocal(phoneScreen.getWorldPosition(new THREE.Vector3()))
    const b = rig.worldToLocal(laptopScreen.getWorldPosition(new THREE.Vector3()))
    syncCurve.v0.copy(a); syncCurve.v2.copy(b); syncCurve.v1.copy(a).lerp(b, 0.5).add(v.set(0, 1.1, 0.4))
    syncPts.forEach((pt, i) => syncCurve.getPoint(i / (syncPts.length - 1), pt))
    syncLine.geometry.setFromPoints(syncPts)
    syncLine.material.opacity = 0.55 * intro
    syncDots.forEach((d, i) => {
      const s = (t * 0.35 + i / syncDots.length) % 1
      syncCurve.getPoint(i % 2 ? 1 - s : s, d.position) // data flows both ways
      d.scale.setScalar(Math.max(intro * Math.sin(s * Math.PI), 0.001))
    })

    // Systems behind: nodes rise in, edges fade in, packets travel, labels follow the nodes.
    systems.nodes.forEach((n, i) => {
      const r = ease((reveal - i * 0.12) / 0.6)
      n.scale.setScalar(Math.max(r, 0.001))
      n.position.y = SYSTEMS[i][1][1] - (1 - r) * 0.6 + Math.sin(t * 1.4 + i) * 0.04
      n.getWorldPosition(v).add(new THREE.Vector3(0, 0.28, 0)).project(camera)
      labels[i].style.left = (v.x * 0.5 + 0.5) * 100 + '%'
      labels[i].style.top = (-v.y * 0.5 + 0.5) * 100 + '%'
      labels[i].style.opacity = r
    })
    systems.edgeMat.opacity = 0.5 * reveal
    systems.edges.forEach(({ curve, dots }, e) => dots.forEach((d, i) => {
      curve.getPoint((t * 0.5 + i / dots.length + e * 0.2) % 1, d.position)
      d.scale.setScalar(Math.max(reveal, 0.001))
    }))
  })
}
