// Racer Robot R&D scene (model from blender/robotics.py): the card pins while a line-follower robot
// drives its track, streams sensor data to the cloud (IoT), and a small neural network lights up (ML).
// Loaded lazily by RoboticsScene.vue on desktop only.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { THREE, createStage, ease, clamp01 } from './three-stage.js'

const SEND = [0.22, 0.7], LEARN = 0.5, READY = 0.86, READINGS = 1248
const LAYERS = [3, 4, 2] // neural net shape
const window01 = (p, [from, to]) => ease((p - from) / 0.08) * (1 - ease((p - to) / 0.08))
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a))

export async function initRobotics3D(root) {
  gsap.registerPlugin(ScrollTrigger)
  const host = root.querySelector('.robotics-canvas')
  const countEl = root.querySelector('.count'), stampEl = root.querySelector('.stamp')
  const stepEls = [...root.querySelectorAll('[data-at]')]

  const { scene, camera, model, start } = await createStage(host, { modelUrl: '/models/robotics.glb', envIntensity: 0.6, watch: root })
  const key = new THREE.DirectionalLight(0xfff1e0, 1.6)
  key.position.set(3, 7, 5)
  const rim = new THREE.DirectionalLight(0xa8501f, 1.0)
  rim.position.set(-5, 3, -4)
  scene.add(key, rim)

  const robot = model.getObjectByName('Robot'), head = model.getObjectByName('Head')
  const beacon = model.getObjectByName('Beacon'), cloud = model.getObjectByName('Cloud')
  beacon.material = beacon.material.clone()
  cloud.position.x -= 1.2 // keep the cloud clear of the HUD checklist (top right)
  cloud.position.y -= 0.35
  const cloudPos = cloud.getWorldPosition(new THREE.Vector3())

  // IoT: rings pulse out of the antenna, data dots stream up to the cloud.
  const ringMat = () => new THREE.MeshBasicMaterial({ color: 0xe0703a, transparent: true, side: THREE.DoubleSide, depthWrite: false })
  const rings = Array.from({ length: 3 }, () => { const r = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.19, 48), ringMat()); scene.add(r); return r })
  const dotGeo = new THREE.SphereGeometry(0.045, 12, 8)
  const dots = Array.from({ length: 6 }, () => { const d = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0xf0ede5 })); scene.add(d); return d })

  // ML: a 3-4-2 network to the left of the cloud; edges and nodes light up layer by layer.
  const net = new THREE.Group()
  net.position.set(-2.6, 2.2, -0.6)
  scene.add(net)
  const nodes = LAYERS.map((n, l) => Array.from({ length: n }, (_, i) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 12), new THREE.MeshStandardMaterial({ color: 0xf0ede5, emissive: 0xe0703a, emissiveIntensity: 0, roughness: 0.4 }))
    m.position.set(l * 0.95, (i - (n - 1) / 2) * 0.42, 0)
    net.add(m)
    return m
  }))
  const edges = []
  for (let l = 0; l < LAYERS.length - 1; l++) {
    for (const a of nodes[l]) for (const b of nodes[l + 1]) {
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([a.position, b.position]), new THREE.LineBasicMaterial({ color: 0xe0703a, transparent: true, opacity: 0.12 }))
      line.userData.layer = l
      net.add(line)
      edges.push(line)
    }
  }
  const cloudToNet = new THREE.Vector3().copy(nodes[0][1].position).add(net.position)
  const netDots = Array.from({ length: 4 }, () => { const d = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0xe0703a })); scene.add(d); return d })

  let target = 0, p = 0
  ScrollTrigger.create({ trigger: root, start: 'center center', end: '+=1400', pin: true, onUpdate: (self) => { target = self.progress } })
  ScrollTrigger.sort() // scenes load in any order; pins must refresh top-to-bottom or later pins miss earlier spacers
  ScrollTrigger.refresh()
  root.classList.add('is-live')
  stampEl.classList.remove('is-on')

  const beaconPos = new THREE.Vector3(), tmp = new THREE.Vector3()
  start((t, mouse) => {
    p += (target - p) * 0.08

    // Drive the ellipse: scroll moves it most, time keeps it gently rolling.
    const a = p * Math.PI * 2 + t * 0.15
    robot.position.set(2.6 * Math.cos(a), robot.position.y, -1.45 * Math.sin(a))
    const heading = Math.atan2(1.45 * Math.cos(a), -2.6 * Math.sin(a)) // atan2(-dz, dx) of the tangent
    robot.rotation.y = heading
    // Head looks at the viewer, steered by the cursor.
    head.rotation.y += wrap(-Math.PI / 2 + mouse.x * 0.9 - heading - head.rotation.y) * 0.12
    beacon.material.emissiveIntensity = 1.5 + 2.5 * (0.5 + 0.5 * Math.sin(t * 6))

    // IoT phase.
    beacon.getWorldPosition(beaconPos)
    const send = window01(p, SEND)
    rings.forEach((ring, i) => {
      const s = (t * 0.7 + i / rings.length) % 1
      ring.position.copy(beaconPos)
      ring.quaternion.copy(camera.quaternion)
      ring.scale.setScalar(1 + s * 7)
      ring.material.opacity = send * (1 - s) * 0.8
    })
    dots.forEach((d, i) => {
      const s = (t * 0.45 + i / dots.length) % 1
      d.position.lerpVectors(beaconPos, cloudPos, s)
      d.position.y += Math.sin(s * Math.PI) * 0.6
      d.scale.setScalar(Math.max(send, 0.001))
    })
    cloud.scale.setScalar(1 + 0.05 * send * Math.sin(t * 8))

    // ML phase: cloud feeds the net, layers light in order.
    const learn = clamp01((p - LEARN) / (READY - LEARN))
    netDots.forEach((d, i) => {
      const s = (t * 0.5 + i / netDots.length) % 1
      d.position.lerpVectors(cloudPos, cloudToNet, s)
      d.position.y += Math.sin(s * Math.PI) * 0.4
      d.scale.setScalar(Math.max(window01(p, [LEARN - 0.04, 0.95]), 0.001))
    })
    nodes.forEach((layer, l) => layer.forEach((n, i) => {
      const lit = ease((learn - l * 0.3) / 0.25)
      n.material.emissiveIntensity = lit * (0.8 + 0.4 * Math.sin(t * 5 + i + l))
    }))
    edges.forEach((e) => { e.material.opacity = 0.12 + 0.75 * ease((learn - e.userData.layer * 0.3 - 0.15) / 0.25) })

    // HUD.
    countEl.textContent = new Intl.NumberFormat('en-US').format(Math.round(READINGS * ease(p / 0.9)))
    stepEls.forEach((el) => el.classList.toggle('done', p >= +el.dataset.at))
    stampEl.classList.toggle('is-on', p >= READY)

    camera.position.set(mouse.x * 0.5 + (p - 0.5) * 0.8, 4.3 - mouse.y * 0.3 - p * 0.4, 9.2 - p * 0.8)
    camera.lookAt(tmp.set(-0.2, 1.2, -0.3))
  })
}
