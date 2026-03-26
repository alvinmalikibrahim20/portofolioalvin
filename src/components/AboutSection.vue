<template>
  <section id="about" class="py-32 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <div class="reveal-left">
          <div class="relative w-fit mx-auto lg:mx-0">
            <div class="profile-ring w-60 h-60 md:w-72 md:h-72 animate-float shadow-2xl shadow-indigo-500/20">
              <div class="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
                <img
                  src="/src/assets/alvin.png"
                  alt="Alvin Malik"
                  class="w-full h-full object-cover"
                  @error="showFallback = true"
                  v-if="!showFallback"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="text-5xl font-black text-white/70">AM</span>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-4 -right-4 glass border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
              <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span class="text-sm dark:text-slate-300 text-slate-600 font-medium">Open to work</span>
            </div>

            <div class="absolute -top-4 -left-4 glass border border-indigo-500/20 rounded-2xl px-4 py-3 shadow-xl">
              <div class="text-xs dark:text-slate-400 text-slate-500 mb-1">Experience</div>
              <div class="font-bold gradient-text text-lg">2+ Years</div>
            </div>

            <div class="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
              <div v-for="badge in badges" :key="badge" class="glass border border-white/8 rounded-xl px-3 py-1.5 text-xs font-mono dark:text-slate-400 text-slate-500 whitespace-nowrap shadow-lg">{{ badge }}</div>
            </div>
          </div>
        </div>

        <div class="reveal-right">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-5">
            // about_me.ts
          </div>

          <h2 class="section-title dark:text-white text-slate-900 mb-5">
            Passionate about
            <span class="gradient-text">building things</span>
            that matter
          </h2>

          <div class="space-y-4 dark:text-slate-400 text-slate-500 leading-relaxed text-sm md:text-base">
            <p>
              I'm <span class="dark:text-white text-slate-800 font-semibold">Alvin Malik</span>, a Fullstack and Mobile Developer based in Indonesia. I build modern web applications using <span class="dark:text-white text-slate-800 font-medium">Vue.js</span> and <span class="dark:text-white text-slate-800 font-medium">Nuxt.js</span>, and cross-platform mobile applications using <span class="dark:text-white text-slate-800 font-medium">Flutter</span>.
            </p>
            <p>
              Experienced in building scalable backend systems using <span class="dark:text-white text-slate-800 font-medium">Laravel</span> and <span class="dark:text-white text-slate-800 font-medium">REST APIs</span>. I care deeply about code quality, performance, and delivering exceptional user experiences across platforms.
            </p>
            <p>
              I also specialize in <span class="dark:text-white text-slate-800 font-medium">QA Testing</span> and <span class="dark:text-white text-slate-800 font-medium">SEO optimization</span> — making sure every product ships fast, stable, and discoverable.
            </p>
          </div>

          <div class="mt-8 grid grid-cols-2 gap-3">
            <div
              v-for="highlight in highlights"
              :key="highlight.label"
              class="glass rounded-xl p-4 border border-white/5 dark:border-white/5 dark:hover:border-indigo-500/20 hover:border-indigo-500/15 transition-all duration-300 group"
            >
              <div class="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">{{ highlight.icon }}</div>
              <div class="font-semibold dark:text-white text-slate-800 text-sm">{{ highlight.label }}</div>
              <div class="dark:text-slate-500 text-slate-400 text-xs mt-1">{{ highlight.desc }}</div>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <a href="#contact" @click.prevent="scrollTo('#contact')" class="btn-primary">
              Get In Touch
            </a>
            <a href="https://github.com/alvinmalik" target="_blank" rel="noopener noreferrer" class="btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showFallback = ref(false)

const badges = ['Vue.js', 'Flutter', 'Laravel']

const highlights = [
  { icon: '⚡', label: 'Fast Delivery', desc: 'Shipping production-ready code efficiently' },
  { icon: '📱', label: 'Web + Mobile', desc: 'Full-platform development with Flutter' },
  { icon: '🔧', label: 'Problem Solver', desc: 'Complex challenges, elegant solutions' },
  { icon: '📈', label: 'SEO Focused', desc: 'Optimized for performance & search' },
]

const scrollTo = (selector) => {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15 }
  )
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el))
})
</script>
