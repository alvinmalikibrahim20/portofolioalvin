// Phones get the project scenes as stills (no WebGL, no pinning). This replays each scene's story on its
// HUD once the card is on screen: the counter runs, steps/bids arrive in order, the stamp lands.
import gsap from 'gsap'

const STORY = {
  auction: { from: 120_000_000, to: 135_000_000, steps: '.history li', format: (n) => 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n / 500_000) * 500_000) },
  finance: { from: 24, to: 0, steps: '[data-at]', format: (n) => String(Math.round(n)) },
  robotics: { from: 0, to: 1248, steps: '[data-at]', format: (n) => new Intl.NumberFormat('en-US').format(Math.round(n)) },
}

export function playHud(root, kind) {
  const { from, to, steps: stepSel, format } = STORY[kind]
  const counter = root.querySelector('.price, .count'), stamp = root.querySelector('.stamp'), still = root.querySelector('img')
  const steps = [...root.querySelectorAll(stepSel)]
  if (kind === 'auction') steps.reverse() // history lists newest first; play oldest bid first
  const isBid = kind === 'auction'

  // Back to the opening state (the prerendered HTML shows the end state).
  stamp.classList.remove('is-on')
  counter.textContent = format(from)
  steps.forEach((s) => (isBid ? gsap.set(s, { opacity: 0, y: 8 }) : s.classList.remove('done')))
  gsap.set(still, { scale: 1.08, transformOrigin: '50% 60%' })

  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    io.disconnect()
    const n = { v: from }
    const tl = gsap.timeline()
    tl.to(still, { scale: 1, duration: 3.2, ease: 'power2.out' }, 0)
      .to(n, { v: to, duration: 2.4, ease: 'power1.inOut', onUpdate: () => { counter.textContent = format(n.v) } }, 0.2)
    steps.forEach((s, i) => tl.call(() => (isBid ? gsap.to(s, { opacity: 1, y: 0, duration: 0.4 }) : s.classList.add('done')), null, 0.4 + (i * 2.2) / steps.length))
    tl.call(() => stamp.classList.add('is-on'), null, 2.8)
  }, { threshold: 0.5 })
  io.observe(root)
}
