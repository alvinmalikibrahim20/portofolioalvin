// Client-only motion layer. Content is fully visible without it (SSR, no-JS, reduced motion).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'


// Elements that rise in as they enter the viewport, in small staggered batches.
const REVEAL = [
  '.reveal', '.section-grid > .eyebrow', '.section-grid > div > .eyebrow',
  '#about p:not(.font-serif)', '#credentials .grid > div', '#testimonials figure',
  '#contact ol > li', '#skills dl > div', '#services .grid > div', 'article section',
].join(',')
// Serif headlines split into words that slide up out of a mask.
const HEADLINES = 'h1.font-serif, .section-shell p.font-serif, #work .font-serif:not(.reveal *)'

export function initMotion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.registerPlugin(ScrollTrigger, SplitText)

  const lenis = new Lenis({ lerp: 0.1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  smoothAnchors(lenis)

  headlines()
  reveals()
  timeline()
  projectImages()
  if (matchMedia('(pointer: fine)').matches) {
    cursor()
    magnetic()
    tilt()
  }
}

function smoothAnchors(lenis) {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="#"]')
    if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey) return
    const url = new URL(link.href)
    if (url.pathname !== location.pathname || url.hash === '#main-content') return
    const target = document.querySelector(decodeURIComponent(url.hash))
    if (!target) return
    e.preventDefault()
    history.pushState(null, '', url.hash)
    lenis.scrollTo(target) // Lenis applies html scroll-padding-top (navbar) itself
  })
}

function headlines() {
  document.querySelectorAll(HEADLINES).forEach((el) => {
    const split = SplitText.create(el, { type: 'words', mask: 'words' })
    gsap.from(split.words, {
      yPercent: 110, rotateX: -35, transformOrigin: '50% 100%', duration: 0.9, ease: 'power4.out', stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onComplete: () => split.revert(), // hand the DOM back to Vue unchanged
    })
  })
}

function reveals() {
  const items = gsap.utils.toArray(REVEAL)
  gsap.set(items, { opacity: 0, y: 48, rotateX: -10, transformPerspective: 900, transformOrigin: '50% 0%' })
  ScrollTrigger.batch(items, {
    start: 'top 92%', once: true,
    onEnter: (batch) => gsap.to(batch, {
      opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out', stagger: 0.1, clearProps: 'transform',
    }),
  })
}

function timeline() {
  const line = document.querySelector('.timeline-progress')
  if (!line) return
  const track = line.parentElement
  const scroll = { trigger: track, start: 'top 70%', end: 'bottom 60%', scrub: true, invalidateOnRefresh: true }
  gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: scroll })
  // A ball rolls down the line with the fill: distance / circumference gives the turns.
  const ball = track.querySelector('.timeline-ball')
  if (!ball) return
  gsap.fromTo(ball, { y: 0, rotation: 0 }, {
    y: () => track.offsetHeight, rotation: () => (track.offsetHeight / (Math.PI * ball.offsetWidth)) * 360,
    ease: 'none', scrollTrigger: { ...scroll, scrub: 0.6 },
  })
}


function projectImages() {
  document.querySelectorAll('.tilt img').forEach((img) => {
    gsap.fromTo(img, { yPercent: -4, scale: 1.1 }, {
      yPercent: 4, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })
}

function cursor() {
  const make = (cls, html = '') => {
    const el = Object.assign(document.createElement('div'), { className: cls, innerHTML: html })
    el.setAttribute('aria-hidden', 'true')
    return el
  }
  const glow = make('cursor-glow'), ring = make('cursor-ring', '<span>View</span>'), dot = make('cursor-dot')
  document.body.append(glow, ring, dot)
  const to = (el, d) => ({ x: gsap.quickTo(el, 'x', { duration: d, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: d, ease: 'power3' }) })
  const movers = [to(dot, 0.05), to(ring, 0.35), to(glow, 1.2)]
  gsap.set([glow, ring, dot], { opacity: 0 })

  addEventListener('pointermove', (e) => {
    movers.forEach((m) => { m.x(e.clientX); m.y(e.clientY) })
    gsap.to([glow, ring, dot], { opacity: 1, duration: 0.3, overwrite: 'auto' })
    const link = e.target.closest('a, button, summary')
    ring.classList.toggle('is-view', !!link?.matches('a[href^="/work/"]'))
    ring.classList.toggle('is-link', !!link)
  })
  document.documentElement.addEventListener('pointerleave', () => gsap.to([glow, ring, dot], { opacity: 0, duration: 0.3 }))
}

function magnetic() {
  document.querySelectorAll('.button-primary, .button-secondary').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' }), y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * 0.3)
      y((e.clientY - r.top - r.height / 2) * 0.3)
    })
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' }))
  })
}

function tilt() {
  document.querySelectorAll('.tilt').forEach((el) => {
    gsap.set(el, { transformPerspective: 900 })
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
      el.style.setProperty('--gx', px * 100 + '%')
      el.style.setProperty('--gy', py * 100 + '%')
      gsap.to(el, { rotationY: (px - 0.5) * 10, rotationX: (0.5 - py) * 10, duration: 0.5, ease: 'power2.out' })
    })
    el.addEventListener('pointerleave', () => gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power3.out' }))
  })
}
