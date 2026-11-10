<template>
  <!-- Decorative: a note that folds into a paper plane as Contact scrolls in (frames from blender/plane.py),
       and takes off when a contact button is hovered or clicked. -->
  <div ref="root" class="contact-plane" aria-hidden="true">
    <img src="/images/plane/fold-23.webp" width="480" height="360" alt="" class="plane-still" loading="lazy" decoding="async" />
    <canvas ref="canvas" width="480" height="360"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const FRAMES = 24
const root = ref(), canvas = ref()

onMounted(async () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return // keep the folded still
  const frames = Array.from({ length: FRAMES }, (_, i) => Object.assign(new Image(), { src: `/images/plane/fold-${String(i).padStart(2, '0')}.webp` }))
  try {
    await Promise.all(frames.map((im) => im.decode()))
  } catch {
    return // frames failed to load: the still stays
  }
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  gsap.registerPlugin(ScrollTrigger)

  const ctx = canvas.value.getContext('2d')
  let shown = -1
  const draw = (i) => {
    if (i === shown) return
    shown = i
    ctx.clearRect(0, 0, 480, 360)
    ctx.drawImage(frames[i], 0, 0)
  }
  draw(0)
  root.value.classList.add('is-live')

  // Scroll folds the note into a plane and lifts it into place.
  const section = root.value.closest('section')
  const scroll = { trigger: section, start: 'top 85%', end: 'top 25%', scrub: 0.4 }
  ScrollTrigger.create({ ...scroll, onUpdate: (s) => draw(Math.round(s.progress * (FRAMES - 1))) })
  gsap.fromTo(root.value, { y: 60, rotate: -8 }, { y: 0, rotate: 0, ease: 'none', scrollTrigger: scroll })

  // Hovering or clicking a contact button sends it off; it glides back in a moment later.
  let flying = false
  const takeoff = () => {
    if (flying || shown < FRAMES - 3) return
    flying = true
    gsap.timeline({ onComplete: () => { flying = false } })
      .to(canvas.value, { x: 320, y: -260, rotate: -22, scale: 0.55, opacity: 0, duration: 0.9, ease: 'power2.in' })
      .set(canvas.value, { x: -320, y: 90, rotate: 12, scale: 0.7 })
      .to(canvas.value, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.3, ease: 'power3.out' }, '+=0.5')
  }
  section.querySelectorAll('.button-primary, .button-secondary').forEach((b) => {
    b.addEventListener('pointerenter', takeoff)
    b.addEventListener('click', takeoff)
  })
})
</script>

<style scoped>
.contact-plane { position: absolute; right: 0; top: -12px; width: clamp(120px, 19vw, 230px); aspect-ratio: 4 / 3; pointer-events: none; }
.contact-plane img, .contact-plane canvas { width: 100%; height: 100%; display: block; }
.contact-plane canvas { display: none; }
.contact-plane.is-live canvas { display: block; }
.contact-plane.is-live .plane-still { display: none; }
/* Single-column layout: sit in the section's top padding, above the eyebrow, clear of the headline. */
@media (max-width: 1023px) { .contact-plane { top: -50px; width: 96px; } }
</style>
