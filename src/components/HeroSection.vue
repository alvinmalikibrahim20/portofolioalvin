<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-40 pointer-events-none"></div>

    <div ref="blob1" class="parallax-bg absolute top-1/4 left-[15%] w-[420px] h-[420px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
    <div ref="blob2" class="parallax-bg absolute bottom-1/4 right-[10%] w-[340px] h-[340px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
    <div ref="blob3" class="parallax-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-900/8 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        <div class="flex-1 text-center lg:text-left order-2 lg:order-1">
          <div ref="badgeRef" class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/20 text-sm text-indigo-300 mb-8 font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Available for new projects
          </div>

          <h1 ref="titleRef" class="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-5">
            <span class="block dark:text-white text-slate-900">Hi, I'm</span>
            <span class="block gradient-text mt-1">Alvin Malik</span>
          </h1>

          <div ref="roleRef" class="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <div class="h-px w-10 bg-gradient-to-r from-transparent to-indigo-500"></div>
            <span class="font-mono text-indigo-400 font-medium tracking-widest uppercase text-xs">Fullstack &amp; Mobile Developer</span>
            <div class="h-px w-10 bg-gradient-to-l from-transparent to-indigo-500"></div>
          </div>

          <p ref="descRef" class="dark:text-slate-400 text-slate-500 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
            Crafting high-performance web apps with
            <span class="dark:text-white text-slate-800 font-medium">Vue.js & Nuxt</span>,
            mobile apps with
            <span class="dark:text-white text-slate-800 font-medium">Flutter</span>,
            and solid backends with
            <span class="dark:text-white text-slate-800 font-medium">Laravel</span>.
          </p>

          <div ref="ctaRef" class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <a href="#projects" @click.prevent="scrollTo('#projects')" class="btn-primary w-full sm:w-auto justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-7 7m7-7l-7-7" />
              </svg>
              View Projects
            </a>
            <a href="#contact" @click.prevent="scrollTo('#contact')" class="btn-secondary w-full sm:w-auto justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Me
            </a>
          </div>

          <div ref="statsRef" class="mt-10 flex items-center justify-center lg:justify-start gap-8">
            <div v-for="(stat, i) in stats" :key="stat.label" class="text-center lg:text-left">
              <div class="text-2xl font-black gradient-text">{{ stat.value }}</div>
              <div class="text-xs dark:text-slate-500 text-slate-400 font-medium uppercase tracking-wider mt-0.5">{{ stat.label }}</div>
              <div v-if="i < stats.length - 1" class="hidden"></div>
            </div>
          </div>
        </div>

        <div ref="avatarRef" class="order-1 lg:order-2 flex-shrink-0">
          <div class="relative">
            <div class="profile-ring w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 animate-float">
              <div class="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
                <img
                  src="/src/assets/alvin.png"
                  alt="Alvin Malik"
                  class="w-full h-full object-cover"
                  @error="showFallback = true"
                  v-if="!showFallback"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="text-6xl font-black text-white/80">AM</span>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-3 -right-3 glass border border-white/10 dark:border-white/10 rounded-2xl px-3 py-2.5 flex items-center gap-2 shadow-xl">
              <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span class="text-xs dark:text-slate-300 text-slate-600 font-medium whitespace-nowrap">Open to work</span>
            </div>

            <div class="absolute -top-3 -left-3 glass border border-indigo-500/20 rounded-2xl px-3 py-2.5 shadow-xl">
              <div class="text-xs dark:text-slate-400 text-slate-500 mb-0.5">Stack</div>
              <div class="font-bold gradient-text text-sm">Vue + Flutter</div>
            </div>

            <div class="absolute -right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
              <div
                v-for="tag in sideTags"
                :key="tag"
                class="glass border border-white/8 dark:border-white/8 rounded-xl px-3 py-1.5 text-xs font-mono dark:text-slate-400 text-slate-500 whitespace-nowrap shadow-lg"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref="scrollIndicatorRef" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 dark:text-slate-600 text-slate-400">
      <span class="text-xs font-mono tracking-widest uppercase">Scroll</span>
      <div class="w-5 h-8 rounded-full border dark:border-slate-700 border-slate-300 flex items-start justify-center p-1">
        <div class="w-1 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const badgeRef = ref(null)
const titleRef = ref(null)
const roleRef = ref(null)
const descRef = ref(null)
const ctaRef = ref(null)
const statsRef = ref(null)
const avatarRef = ref(null)
const scrollIndicatorRef = ref(null)
const blob1 = ref(null)
const blob2 = ref(null)
const blob3 = ref(null)
const showFallback = ref(false)

const stats = [
  { value: '2+', label: 'Years Exp' },
  { value: '15+', label: 'Projects' },
  { value: 'Web+Mobile', label: 'Platforms' },
]

const sideTags = ['Vue.js', 'Flutter', 'Laravel']

const scrollTo = (selector) => {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(badgeRef.value,   { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 })
      .fromTo(titleRef.value,   { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.75 }, '-=0.25')
      .fromTo(roleRef.value,    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5  }, '-=0.4')
      .fromTo(descRef.value,    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5  }, '-=0.3')
      .fromTo(ctaRef.value,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5  }, '-=0.3')
      .fromTo(statsRef.value,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5  }, '-=0.25')
      .fromTo(avatarRef.value,  { opacity: 0, scale: 0.85, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: 'back.out(1.4)' }, 0.2)
      .fromTo(scrollIndicatorRef.value, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')

    gsap.to(blob1.value, {
      y: -80,
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
    })
    gsap.to(blob2.value, {
      y: -50,
      x: 30,
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 },
    })
    gsap.to(blob3.value, {
      y: -30,
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
    })
  })
})

onUnmounted(() => ctx && ctx.revert())
</script>
