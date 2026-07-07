<template>
  <section id="work" class="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28 border-t border-line">
    <div class="grid md:grid-cols-12 gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">Selected work</p>
      </div>

      <div class="md:col-span-9">
        <ul>
          <ProjectCard
            v-for="(project, i) in projects"
            :key="project.title"
            :project="project"
            :index="i"
            :is-last="i === projects.length - 1"
          />
        </ul>

        <p class="mt-12 text-sm text-muted reveal">
          More experiments and smaller things live on
          <a href="https://github.com/alvinmalik30" target="_blank" rel="noopener noreferrer" class="text-link text-foreground">GitHub</a>.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import ProjectCard from './ProjectCard.vue'

const projects = [
  {
    title: 'Vehicle Auction System',
    year: '2024',
    kind: 'Web platform',
    description:
      'An auction platform where dealers bid on vehicles in real time. I built the bidding flow, payments, and the admin panel the operations team uses daily.',
    stack: ['Vue', 'Laravel', 'MySQL'],
    github: 'https://github.com/alvinmalik30',
  },
  {
    title: 'Auction Mobile App',
    year: '2024',
    kind: 'Mobile app',
    description:
      'The Flutter companion to the auction platform — live bid updates, push notifications, and an interface that feels native on both iOS and Android.',
    stack: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/alvinmalik30',
  },
  {
    title: 'Inspection Report App',
    year: '2025',
    kind: 'Mobile app',
    description:
      'A field tool for vehicle inspection teams. It works offline, captures photos and signatures, and turns everything into a PDF report automatically.',
    stack: ['Flutter', 'SQLite', 'REST API'],
    github: 'https://github.com/alvinmalik30',
  },
  {
    title: 'Admin Dashboard',
    year: '2024',
    kind: 'Web app',
    description:
      'A Nuxt admin panel with role-based access, data tables, and reporting charts, sitting on top of a Laravel API.',
    stack: ['Nuxt', 'Laravel', 'Tailwind CSS'],
    github: 'https://github.com/alvinmalik30',
  },
  {
    title: 'Marketing Site Rebuild',
    year: '2023',
    kind: 'Web / SEO',
    description:
      'Rebuilt a marketing site with a focus on Core Web Vitals and structured data. It now scores 95+ on Lighthouse and ranks noticeably better.',
    stack: ['Nuxt', 'SEO', 'Analytics'],
    github: 'https://github.com/alvinmalik30',
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#work .reveal').forEach((el) => observer.observe(el))
})
</script>
