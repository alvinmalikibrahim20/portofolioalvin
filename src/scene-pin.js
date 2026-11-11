// Pins a project-scene card before its 3D loads, so the page height never changes mid-scroll
// (late pins used to add ~1000px under the reader and make the page jump).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function pinScene(el, length) {
  gsap.registerPlugin(ScrollTrigger)
  const pin = ScrollTrigger.create({ trigger: el, start: 'center center', end: '+=' + length, pin: true, anticipatePin: 1 })
  ScrollTrigger.sort() // cards mount in any order; pins must refresh top-to-bottom or later pins miss earlier spacers
  ScrollTrigger.refresh()
  return pin
}
