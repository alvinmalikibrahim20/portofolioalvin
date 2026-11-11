// Shared WebGL setup for the 3D scenes (hero, project scenes). Client-only, loaded lazily.
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export { THREE }
export const clamp01 = (x) => Math.min(Math.max(x, 0), 1)
export const ease = (x) => 1 - Math.pow(1 - clamp01(x), 3)

const mouse = { x: 0, y: 0 }
addEventListener('pointermove', (e) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = (e.clientY / innerHeight) * 2 - 1 })

/**
 * Creates a renderer inside `host`, loads `modelUrl`, and calls `frame(t, mouse)` every frame
 * while `watch` (default: host) is on screen. `mouse` is eased, in -1..1.
 */
export async function createStage(host, { modelUrl, fov = 30, envIntensity = 0.8, watch = host }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)) // 2x retina doubles the pixel work for little visible gain while scrolling
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = envIntensity
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 80)

  const resize = () => {
    const { width, height } = host.getBoundingClientRect()
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  resize()
  new ResizeObserver(resize).observe(host)

  let visible = true
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }).observe(watch)

  const { scene: model } = await new GLTFLoader().loadAsync(modelUrl)
  scene.add(model)

  const eased = { x: 0, y: 0 }
  const clock = new THREE.Clock()
  const start = (frame) => {
    renderer.setAnimationLoop(() => {
      if (!visible) return
      eased.x += (mouse.x - eased.x) * 0.05
      eased.y += (mouse.y - eased.y) * 0.05
      frame(clock.getElapsedTime(), eased)
      renderer.render(scene, camera)
    })
    host.classList.add('is-ready')
  }
  return { renderer, scene, camera, model, start }
}

/** Soft radial blob used as a contact shadow or a light pool on the floor. */
export function floorBlob(width, depth, rgba = 'rgba(28,27,24,0.28)') {
  const canvas = Object.assign(document.createElement('canvas'), { width: 256, height: 256 })
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, rgba)
  g.addColorStop(1, rgba.replace(/[\d.]+\)$/, '0)'))
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthWrite: false }))
  mesh.rotation.x = -Math.PI / 2
  return mesh
}
