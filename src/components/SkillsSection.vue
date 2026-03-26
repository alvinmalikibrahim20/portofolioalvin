<template>
  <section id="skills" class="py-32 relative overflow-hidden">
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 right-0 w-64 h-64 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-5">
          // skills.json
        </div>
        <h2 class="section-title dark:text-white text-slate-900">
          Tech <span class="gradient-text">Stack</span>
        </h2>
        <p class="dark:text-slate-400 text-slate-500 max-w-xl mx-auto">
          Technologies I use to craft high-quality web and mobile software products.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        <div
          v-for="(category, catIdx) in skillCategories"
          :key="category.name"
          class="glass rounded-2xl p-5 border dark:border-white/5 border-slate-200/80 hover:border-indigo-500/25 transition-all duration-500 reveal"
          :style="{ transitionDelay: `${catIdx * 80}ms` }"
        >
          <div class="flex items-center gap-3 mb-5">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-base" :class="category.iconBg">
              {{ category.icon }}
            </div>
            <div>
              <h3 class="font-bold dark:text-white text-slate-800 text-sm">{{ category.name }}</h3>
              <p class="text-xs dark:text-slate-500 text-slate-400">{{ category.desc }}</p>
            </div>
          </div>

          <div ref="skillGridRefs" class="grid grid-cols-2 gap-2">
            <div
              v-for="skill in category.skills"
              :key="skill.name"
              class="skill-card glass dark:bg-white/3 bg-slate-50 rounded-xl p-3 border dark:border-white/5 border-slate-200/60 dark:hover:border-indigo-500/30 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/5 group"
            >
              <div class="flex flex-col items-center gap-1.5 text-center">
                <div
                  class="w-9 h-9 rounded-lg flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-115"
                  :class="skill.iconBg"
                  v-html="skill.svg || skill.emoji"
                ></div>
                <span class="text-xs font-medium dark:text-slate-300 text-slate-600 leading-tight">{{ skill.name }}</span>
                <span class="text-[10px] font-mono dark:text-slate-600 text-slate-400">{{ skill.level }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="reveal">
        <p class="text-center dark:text-slate-500 text-slate-400 text-xs font-medium uppercase tracking-widest mb-6">Also familiar with</p>
        <div class="flex flex-wrap justify-center gap-2.5">
          <span
            v-for="tool in additionalTools"
            :key="tool"
            class="px-3.5 py-1.5 glass rounded-xl text-xs dark:text-slate-400 text-slate-500 border dark:border-white/5 border-slate-200 dark:hover:border-indigo-500/25 hover:border-indigo-400/30 dark:hover:text-white hover:text-indigo-600 transition-all duration-300 cursor-default"
          >
            {{ tool }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillGridRefs = ref([])

const skillCategories = [
  {
    name: 'Web Development',
    desc: 'Frontend & UI',
    icon: '�',
    iconBg: 'bg-blue-500/10 text-blue-400',
    skills: [
      { name: 'Vue.js',       level: 'Expert',     iconBg: 'bg-emerald-500/10', emoji: '<span class="text-emerald-400 font-black text-lg">V</span>' },
      { name: 'Nuxt.js',      level: 'Advanced',   iconBg: 'bg-emerald-500/10', emoji: '<span class="text-emerald-300 font-black text-lg">N</span>' },
      { name: 'Tailwind',     level: 'Expert',     iconBg: 'bg-sky-500/10',     emoji: '<span class="text-sky-400 font-black text-base">TW</span>' },
      { name: 'JavaScript',   level: 'Advanced',   iconBg: 'bg-yellow-500/10',  emoji: '<span class="text-yellow-400 font-black text-lg">JS</span>' },
    ],
  },
  {
    name: 'Mobile Dev',
    desc: 'Cross-platform',
    icon: '📱',
    iconBg: 'bg-cyan-500/10 text-cyan-400',
    skills: [
      { name: 'Flutter',   level: 'Advanced',   iconBg: 'bg-cyan-500/10',   emoji: '<span class="text-cyan-400 font-black text-lg">F</span>' },
      { name: 'Dart',      level: 'Advanced',   iconBg: 'bg-blue-500/10',   emoji: '<span class="text-blue-400 font-black text-lg">D</span>' },
      { name: 'iOS / Android', level: 'Proficient', iconBg: 'bg-slate-500/10', emoji: '<span class="text-slate-400 font-black text-xs">iOS</span>' },
      { name: 'REST API',  level: 'Expert',     iconBg: 'bg-violet-500/10', emoji: '<span class="text-violet-400 font-black text-base">API</span>' },
    ],
  },
  {
    name: 'Backend',
    desc: 'Server & APIs',
    icon: '⚙️',
    iconBg: 'bg-orange-500/10 text-orange-400',
    skills: [
      { name: 'Laravel',  level: 'Expert',    iconBg: 'bg-red-500/10',    emoji: '<span class="text-red-400 font-black text-lg">L</span>' },
      { name: 'PHP',      level: 'Advanced',  iconBg: 'bg-indigo-500/10', emoji: '<span class="text-indigo-400 font-black text-base">PHP</span>' },
      { name: 'MySQL',    level: 'Advanced',  iconBg: 'bg-blue-500/10',   emoji: '<span class="text-blue-400 font-black text-base">SQL</span>' },
      { name: 'REST API', level: 'Expert',    iconBg: 'bg-orange-500/10', emoji: '<span class="text-orange-400 font-black text-base">API</span>' },
    ],
  },
  {
    name: 'Tools',
    desc: 'DevOps & workflow',
    icon: '🛠️',
    iconBg: 'bg-green-500/10 text-green-400',
    skills: [
      { name: 'Git',      level: 'Expert',    iconBg: 'bg-orange-500/10', emoji: '<span class="text-orange-400 font-black text-base">Git</span>' },
      { name: 'Docker',   level: 'Proficient', iconBg: 'bg-blue-500/10',  emoji: '<span class="text-blue-400 font-black text-base">🐳</span>' },
      { name: 'CI/CD',    level: 'Proficient', iconBg: 'bg-green-500/10', emoji: '<span class="text-green-400 font-black text-base">CI</span>' },
      { name: 'QA Test',  level: 'Advanced',  iconBg: 'bg-purple-500/10', emoji: '<span class="text-purple-400 font-black text-base">QA</span>' },
    ],
  },
]

const additionalTools = [
  'Vite', 'Node.js', 'Postman', 'Figma', 'Linux', 'Nginx',
  'Redis', 'SEO', 'Google Analytics', 'Jira', 'VS Code', 'GitHub Actions',
]

let ctx

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el))

  ctx = gsap.context(() => {
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
          delay: (i % 4) * 0.07,
        }
      )
    })
  })
})

onUnmounted(() => ctx && ctx.revert())
</script>
