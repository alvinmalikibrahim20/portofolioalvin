<template>
  <section id="services" class="py-32 relative overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-indigo-500/40 pointer-events-none"></div>
    <div class="absolute top-1/3 left-0 w-80 h-80 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-5">
          // services.ts
        </div>
        <h2 class="section-title dark:text-white text-slate-900 mb-5">
          What I <span class="gradient-text">Offer</span>
        </h2>
        <p class="dark:text-slate-400 text-slate-500 max-w-xl mx-auto">
          End-to-end development services tailored for startups, agencies, and enterprise clients.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-16">
        <div
          v-for="(service, idx) in services"
          :key="service.title"
          class="group glass rounded-2xl p-8 border dark:border-white/5 border-slate-200/80 dark:hover:border-indigo-500/20 hover:border-indigo-400/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 reveal"
          :style="{ transitionDelay: `${idx * 80}ms` }"
        >
          <div class="flex items-start gap-5">
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              :class="service.iconBg"
            >
              {{ service.icon }}
            </div>
            <div>
              <h3 class="font-bold dark:text-white text-slate-900 text-lg mb-2">{{ service.title }}</h3>
              <p class="dark:text-slate-400 text-slate-500 text-sm leading-relaxed mb-4">{{ service.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in service.tags"
                  :key="tag"
                  class="px-2.5 py-1 rounded-lg text-xs font-medium dark:bg-white/5 bg-slate-100 dark:text-slate-400 text-slate-500"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="reveal">
        <div class="glass rounded-2xl border border-indigo-500/15 dark:border-indigo-500/15 border-indigo-300/30 p-8 md:p-12">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl md:text-3xl font-bold dark:text-white text-slate-900 mb-4">
                Ready to build something
                <span class="gradient-text">amazing</span>?
              </h3>
              <p class="dark:text-slate-400 text-slate-500 leading-relaxed">
                Whether you need a complete web application, API development, or performance optimization — I'm here to help bring your vision to life.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 md:justify-end">
              <a
                href="#contact"
                @click.prevent="scrollTo('#contact')"
                class="btn-primary text-white justify-center"
              >
                Start a Project
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const services = [
  {
    title: 'Web Development',
    description: 'Full-stack web applications built with modern frameworks. From responsive SPAs to complex enterprise platforms with clean, maintainable code.',
    icon: '💻',
    iconBg: 'bg-blue-500/15 text-blue-400',
    tags: ['Vue.js', 'Laravel', 'REST API', 'MySQL', 'Tailwind CSS'],
  },
  {
    title: 'API Development',
    description: 'Robust RESTful and GraphQL APIs with proper authentication, rate limiting, documentation, and third-party service integrations.',
    icon: '🔗',
    iconBg: 'bg-purple-500/15 text-purple-400',
    tags: ['REST API', 'OAuth2', 'Postman', 'Laravel', 'JSON'],
  },
  {
    title: 'QA Testing',
    description: 'Comprehensive quality assurance including unit testing, integration testing, E2E testing, and performance profiling to ensure production-ready code.',
    icon: '🧪',
    iconBg: 'bg-green-500/15 text-green-400',
    tags: ['PHPUnit', 'Jest', 'Cypress', 'Manual Testing', 'Bug Tracking'],
  },
  {
    title: 'SEO Optimization',
    description: 'Technical SEO audits and implementations to improve search rankings — Core Web Vitals, structured data, meta optimization, and page speed improvements.',
    icon: '📈',
    iconBg: 'bg-orange-500/15 text-orange-400',
    tags: ['Technical SEO', 'Core Web Vitals', 'Schema Markup', 'Google Analytics'],
  },
]

const scrollTo = (selector) => {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el))
})
</script>
