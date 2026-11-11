// Finance operations scene (model from blender/finance.py): the card pins while payments flow from
// auction operations into the finance console, records sync on to the ERP, and both ledgers square up.
// Loaded lazily by FinanceScene.vue on desktop only.
import { THREE, createStage, floorBlob, ease, clamp01 } from './three-stage.js'

const FLOW_A = [0.08, 0.6], FLOW_B = [0.32, 0.8] // scroll windows: payments A→B, ERP sync B→C
const ALIGN = 0.55, RECONCILED = 0.86, UNMATCHED = 24
const window01 = (p, [from, to]) => ease((p - from) / 0.08) * (1 - ease((p - to) / 0.08))

// pin: the ScrollTrigger from scene-pin.js (created by the card before this module loads).
export async function initFinance3D(root, pin) {
  const host = root.querySelector('.finance-canvas')
  const countEl = root.querySelector('.count'), stampEl = root.querySelector('.stamp')
  const stepEls = [...root.querySelectorAll('[data-at]')]
  const labelEls = [...root.querySelectorAll('.pillar-label')]

  const { scene, camera, model, start } = await createStage(host, { modelUrl: '/models/finance.glb', envIntensity: 0.9, watch: root })
  const key = new THREE.DirectionalLight(0xfff1e0, 1.5)
  key.position.set(4, 7, 6)
  scene.add(key, floorBlob(15, 6, 'rgba(28,27,24,0.16)'))

  const pillars = ['A', 'B', 'C'].map((k) => model.getObjectByName('Pillar' + k))
  const top = (i) => new THREE.Box3().setFromObject(pillars[i]).max.y
  const ledgers = [...'AC'].flatMap((k, side) => [0, 1, 2, 3, 4].map((i) => {
    const o = model.getObjectByName(`Ledger${k}${i}`)
    return { o, i, from: o.position.clone(), rot: o.rotation.y, x: pillars[side * 2].position.x, z: pillars[side * 2].position.z }
  }))

  // Rails between the pillars; coins and cards ride them.
  const arc = (a, b, lift) => new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(pillars[a].position.x, top(a) + 0.75, 0),
    new THREE.Vector3((pillars[a].position.x + pillars[b].position.x) / 2, Math.max(top(a), top(b)) + lift, 0),
    new THREE.Vector3(pillars[b].position.x, top(b) + 0.95, 0))
  const rails = [arc(0, 1, 2.1), arc(1, 2, 2.1)]
  const railMat = new THREE.MeshStandardMaterial({ color: 0xa8501f, transparent: true, opacity: 0.35, roughness: 0.5 })
  rails.forEach((curve) => scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.02, 8), railMat)))

  const spawn = (name, n) => {
    const tpl = model.getObjectByName(name)
    tpl.visible = false
    return Array.from({ length: n }, () => { const c = tpl.clone(); c.visible = true; scene.add(c); return c })
  }
  const flows = [{ items: spawn('Coin', 6), rail: rails[0], window: FLOW_A, speed: 0.32 }, { items: spawn('Card', 5), rail: rails[1], window: FLOW_B, speed: 0.26 }]

  const screen = model.getObjectByName('ConsoleScreen')
  screen.material = screen.material.clone()
  screen.material.emissive = new THREE.Color(0xe0703a)

  let p = 0
  root.classList.add('is-live')
  stampEl.classList.remove('is-on')

  const v = new THREE.Vector3()
  start((t, mouse) => {
    p += (pin.progress - p) * 0.08

    // Coins (payments) then cards (ERP records) stream along the rails while their window is open.
    const open = flows.map(({ items, rail, window, speed }) => {
      const amount = window01(p, window)
      items.forEach((item, k) => {
        const s = (t * speed + k / items.length) % 1
        rail.getPoint(s, item.position)
        item.scale.setScalar(Math.max(amount * Math.sin(s * Math.PI) * 1.3, 0.001))
        item.rotation.y = t * 2 + k
      })
      return amount
    })
    screen.material.emissiveIntensity = 0.15 + 0.6 * Math.max(...open) * (0.5 + 0.5 * Math.sin(t * 5))

    // Ledgers on both ends square up, slab by slab.
    ledgers.forEach(({ o, i, from, rot, x, z }) => {
      const a = ease((p - ALIGN - i * 0.03) / 0.16)
      o.position.x = THREE.MathUtils.lerp(from.x, x, a)
      o.position.z = THREE.MathUtils.lerp(from.z, z, a)
      o.rotation.y = THREE.MathUtils.lerp(rot, 0, a)
    })

    // HUD: counter, checklist, stamp, and labels pinned under each pillar.
    countEl.textContent = Math.round(UNMATCHED * (1 - clamp01((p - 0.15) / 0.68)))
    stepEls.forEach((el) => el.classList.toggle('done', p >= +el.dataset.at))
    stampEl.classList.toggle('is-on', p >= RECONCILED)
    const active = [open[0], Math.max(open[0], open[1]), Math.max(open[1], ease((p - ALIGN) / 0.2))]
    labelEls.forEach((el, i) => {
      v.set(pillars[i].position.x, -0.15, 0.9).project(camera)
      el.style.left = (v.x * 0.5 + 0.5) * 100 + '%'
      el.style.top = (-v.y * 0.5 + 0.5) * 100 + '%'
      el.classList.toggle('active', active[i] > 0.5)
    })

    camera.position.set(mouse.x * 0.6 + (p - 0.5) * 1.2, 2.6 - mouse.y * 0.3, 13.4 - p * 1.2)
    camera.lookAt(0, 0.85, 0)
  })
}
