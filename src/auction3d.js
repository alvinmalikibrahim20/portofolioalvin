// Tunas Auction scene (model from blender/auction.py): the section pins while the visitor scrolls
// through a live auction — bids from web, Android and iOS, then the gavel and "Sold".
// Loaded lazily by AuctionScene.vue on desktop only.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { THREE, createStage, floorBlob, ease, clamp01 } from './three-stage.js'

// Scroll progress (0..1) at which each bid lands. Paddle index matches Paddle0..2 in the model.
const BIDS = [
  { at: 0, price: 120_000_000, from: 'Opening bid' },
  { at: 0.14, price: 124_000_000, from: 'Web', paddle: 0 },
  { at: 0.3, price: 128_500_000, from: 'Android', paddle: 1 },
  { at: 0.46, price: 131_000_000, from: 'iOS', paddle: 2 },
  { at: 0.62, price: 135_000_000, from: 'Web', paddle: 0 },
]
const STRIKE = 0.78, SOLD = 0.83
const rupiah = (n) => 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n / 1000) * 1000)

export async function initAuction3D(root) {
  gsap.registerPlugin(ScrollTrigger)
  const host = root.querySelector('.auction-canvas')
  const priceEl = root.querySelector('.price'), historyEl = root.querySelector('.history'), stampEl = root.querySelector('.stamp')

  const { scene, camera, model, start } = await createStage(host, { modelUrl: '/models/auction.glb', fov: 32, envIntensity: 0.55, watch: root })
  const spot = new THREE.SpotLight(0xfff1e0, 60, 20, 0.5, 0.6)
  spot.position.set(0, 9, 2)
  spot.target.position.set(0, 0.5, 0)
  scene.add(spot, spot.target, floorBlob(14, 10, 'rgba(240,237,229,0.10)'))
  const rim = new THREE.DirectionalLight(0xa8501f, 1.2)
  rim.position.set(-6, 3, -4)
  scene.add(rim)

  const table = model.getObjectByName('Turntable')
  const gavel = model.getObjectByName('Gavel')
  const paddles = [0, 1, 2].map((i) => model.getObjectByName('Paddle' + i))
  const tableRot = table.rotation.y
  const gavelRaised = gavel.quaternion.clone(), gavelDown = new THREE.Quaternion() // exported raised; identity rests on the block
  const paddleBase = paddles.map((p) => p.position.clone())

  // Pin the card while the auction plays out; progress is eased in the frame loop.
  let target = 0, p = 0
  ScrollTrigger.create({ trigger: root, start: 'center center', end: '+=1100', pin: true, onUpdate: (self) => { target = self.progress } })
  ScrollTrigger.sort() // scenes load in any order; pins must refresh top-to-bottom or later pins miss earlier spacers
  ScrollTrigger.refresh()

  let shown = -1, shownPrice = BIDS[0].price
  root.classList.add('is-live')
  stampEl.classList.remove('is-on')

  start((t, mouse) => {
    p += (target - p) * 0.08

    // Bids → price counter, history, paddles.
    const current = BIDS.reduce((idx, bid, i) => (p >= bid.at ? i : idx), 0)
    if (current !== shown) {
      shown = current
      historyEl.innerHTML = BIDS.slice(1, current + 1).slice(-3).reverse()
        .map((b) => `<li><span>${b.from}</span>${rupiah(b.price)}</li>`).join('')
      priceEl.classList.remove('bump'); void priceEl.offsetWidth; priceEl.classList.add('bump')
    }
    shownPrice += (BIDS[current].price - shownPrice) * 0.12
    priceEl.textContent = rupiah(shownPrice)

    paddles.forEach((paddle, i) => {
      // Each paddle pops up when its bid lands, then lowers again.
      const up = BIDS.filter((b) => b.paddle === i).reduce((m, b) => Math.max(m, ease((p - b.at) / 0.05) * (1 - ease((p - b.at - 0.1) / 0.06))), 0)
      paddle.scale.setScalar(Math.max(up, 0.001))
      paddle.position.y = paddleBase[i].y - (1 - up) * 1.2 + Math.sin(t * 6 + i) * 0.03 * up
    })

    // Gavel swings down at STRIKE, bounces up a little, the stamp lands.
    const swing = p < STRIKE ? 0 : p < STRIKE + 0.03 ? ease((p - STRIKE) / 0.03) : 1 - 0.45 * ease((p - STRIKE - 0.03) / 0.08)
    gavel.quaternion.slerpQuaternions(gavelRaised, gavelDown, swing)
    stampEl.classList.toggle('is-on', p >= SOLD)
    const impact = Math.max(0, 1 - Math.abs(p - STRIKE - 0.03) / 0.015)

    // Turntable spins with scroll; camera dollies in and follows the mouse a little.
    table.rotation.y = tableRot + p * Math.PI * 1.3 + t * 0.06
    camera.position.set(-0.4 + p * 1.8 + mouse.x * 0.5 + (Math.random() - 0.5) * 0.12 * impact, 3.6 - p * 1.0 - mouse.y * 0.25, 9.6 - p * 2.4)
    camera.lookAt(0.2, 0.8, -0.6)
  })
}

// Self-check for the bid timeline (runs only in dev): bids must be ordered and finish before the strike.
if (import.meta.env?.DEV) {
  console.assert(BIDS.every((b, i) => i === 0 || (b.at > BIDS[i - 1].at && b.price > BIDS[i - 1].price)), 'BIDS must increase')
  console.assert(BIDS.at(-1).at < STRIKE && STRIKE < SOLD, 'last bid before strike before sold')
}
