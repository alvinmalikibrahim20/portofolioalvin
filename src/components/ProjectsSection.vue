<template>
  <section id="projects" class="py-32 relative overflow-hidden">
    <div class="absolute top-1/3 right-0 w-96 h-96 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-12 reveal">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-5">
          // projects[]
        </div>
        <h2 class="section-title dark:text-white text-slate-900">
          Featured <span class="gradient-text">Projects</span>
        </h2>
        <p class="dark:text-slate-400 text-slate-500 max-w-xl mx-auto">
          Real-world applications I've built across web and mobile platforms.
        </p>
      </div>

      <div class="flex items-center justify-center mb-10 reveal">
        <div class="glass rounded-2xl p-1.5 border dark:border-white/5 border-slate-200 flex gap-1">
          <button
            v-for="cat in categories"
            :key="cat.key"
            @click="activeCategory = cat.key"
            :class="[
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
              activeCategory === cat.key
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-800',
            ]"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.label }}</span>
            <span class="text-xs px-1.5 py-0.5 rounded-md" :class="activeCategory === cat.key ? 'bg-white/20 text-white' : 'dark:bg-white/5 bg-slate-200 dark:text-slate-500 text-slate-400'">
              {{ cat.count }}
            </span>
          </button>
        </div>
      </div>

      <Transition name="fade-up" mode="out-in">
        <div :key="activeCategory" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            v-for="project in currentProjects"
            :key="project.title"
            :project="project"
          />
        </div>
      </Transition>

      <div class="text-center mt-12 reveal">
        <a
          href="https://github.com/alvinmalik"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-secondary inline-flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          View All on GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard.vue'

gsap.registerPlugin(ScrollTrigger)

const activeCategory = ref('web')

const categories = [
  { key: 'web',    label: 'Web Apps',    icon: '🌐', count: 3 },
  { key: 'mobile', label: 'Mobile Apps', icon: '📱', count: 3 },
]

const webProjects = [
  {
    title: 'Vehicle Auction System',
    description: 'Full-stack vehicle auction platform with real-time bidding, user authentication, payment integration, and a powerful admin management panel.',
    icon: '🚗',
    category: 'Fullstack Web',
    bgGradient: 'bg-gradient-to-br from-blue-950 to-indigo-900',
    stack: ['Vue.js', 'Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
    demo: null,
    github: 'https://github.com/alvinmalik',
    year: '2024',
    featured: true,
  },
  {
    title: 'Admin Dashboard',
    description: 'Feature-rich Nuxt.js admin panel with role-based access control, dynamic data tables, analytics charts, and full CRUD operations.',
    icon: '📊',
    category: 'Nuxt + API',
    bgGradient: 'bg-gradient-to-br from-orange-950 to-red-900',
    stack: ['Nuxt.js', 'Laravel API', 'MySQL', 'Tailwind CSS'],
    demo: null,
    github: 'https://github.com/alvinmalik',
    year: '2024',
    featured: false,
  },
  {
    title: 'SEO Optimization Platform',
    description: 'High-performance marketing website with Core Web Vitals optimization, structured data, and 95+ Lighthouse score for maximum search visibility.',
    icon: '🔍',
    category: 'Nuxt / SEO',
    bgGradient: 'bg-gradient-to-br from-emerald-950 to-teal-900',
    stack: ['Nuxt.js', 'Vue.js', 'Tailwind CSS', 'SEO', 'Google Analytics'],
    demo: null,
    github: 'https://github.com/alvinmalik',
    year: '2023',
    featured: false,
  },
]

const mobileProjects = [
  {
    title: 'Auction Mobile App',
    description: 'Flutter-based mobile client for the vehicle auction system. Smooth animations, real-time updates, and native-feeling UX for iOS and Android.',
    icon: '🏷️',
    category: 'Flutter Mobile',
    bgGradient: 'bg-gradient-to-br from-cyan-950 to-blue-900',
    stack: ['Flutter', 'Dart', 'REST API', 'GetX', 'Firebase'],
    demo: null,
    github: 'https://github.com/alvinmalik',
    year: '2024',
    featured: true,
  },
  {
    title: 'Vehicle Marketplace App',
    description: 'Cross-platform vehicle buying and selling marketplace with advanced filters, location-based search, and in-app chat functionality.',
    icon: '�',
    category: 'Flutter Mobile',
    bgGradient: 'bg-gradient-to-br from-violet-950 to-purple-900',
    stack: ['Flutter', 'Dart', 'Laravel API', 'MySQL', 'Firebase'],
    demo: null,
    github: 'https://github.com/alvinmalik',
    year: '2024',
    featured: false,
  },
  {
    title: 'Inspection Report App',
    description: 'Mobile app for field vehicle inspection teams. Supports offline-first data capture, photo uploads, digital signatures, and automated PDF reports.',
    icon: '📋',
    category: 'Flutter Mobile',
    bgGradient: 'bg-gradient-to-br from-slate-800 to-slate-900',
    stack: ['Flutter', 'Dart', 'SQLite', 'REST API', 'PDF Gen'],
    demo: null,
    github: 'https://github.com/alvinmalik',
    year: '2025',
    featured: false,
  },
]

const currentProjects = computed(() =>
  activeCategory.value === 'web' ? webProjects : mobileProjects
)

let ctx

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el))

  ctx = gsap.context(() => {
    gsap.utils.toArray('.project-card-inner').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.1,
        }
      )
    })
  })
})

onUnmounted(() => ctx && ctx.revert())
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
