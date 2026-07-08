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

/*
 * TODO(Alvin): Isi data proyek dengan yang asli.
 * - github: link ke REPO SPESIFIK, bukan halaman profil
 *   (contoh: https://github.com/alvinmalik30/nama-repo)
 * - demo: link demo live jika ada; hapus/biarkan null jika tidak ada
 * - image: ganti gambar mockup di public/images/projects/ dengan
 *   SCREENSHOT ASLI aplikasi Anda (nama file boleh sama)
 * - result: satu kalimat hasil terukur — angka jauh lebih meyakinkan
 *   (contoh: "Dipakai 200+ dealer setiap hari" / "Lighthouse 95+")
 */
const projects = [
  {
    title: 'Vehicle Auction System',
    year: '2024',
    kind: 'Web platform',
    description:
      'An auction platform where dealers bid on vehicles in real time. I built the bidding flow, payments, and the admin panel the operations team uses daily.',
    result: '[Hasil terukur — contoh: melayani N lelang per minggu]',
    stack: ['Vue', 'Laravel', 'MySQL'],
    image: '/images/projects/auction-web.png',
    imageAlt: 'Vehicle auction platform dashboard',
    github: 'https://github.com/alvinmalik30',
    demo: null,
  },
  {
    title: 'Auction Mobile App',
    year: '2024',
    kind: 'Mobile app',
    description:
      'The Flutter companion to the auction platform — live bid updates, push notifications, and an interface that feels native on both iOS and Android.',
    result: '[Hasil terukur — contoh: diunduh N kali di Play Store]',
    stack: ['Flutter', 'Dart', 'Firebase'],
    image: '/images/projects/auction-mobile.png',
    imageAlt: 'Auction mobile app showing live bids',
    github: 'https://github.com/alvinmalik30',
    demo: null,
  },
  {
    title: 'Inspection Report App',
    year: '2025',
    kind: 'Mobile app',
    description:
      'A field tool for vehicle inspection teams. It works offline, captures photos and signatures, and turns everything into a PDF report automatically.',
    result: '[Hasil terukur — contoh: memangkas waktu inspeksi 40%]',
    stack: ['Flutter', 'SQLite', 'REST API'],
    image: '/images/projects/inspection-app.png',
    imageAlt: 'Vehicle inspection checklist app',
    github: 'https://github.com/alvinmalik30',
    demo: null,
  },
  {
    title: 'Admin Dashboard',
    year: '2024',
    kind: 'Web app',
    description:
      'A Nuxt admin panel with role-based access, data tables, and reporting charts, sitting on top of a Laravel API.',
    result: null,
    stack: ['Nuxt', 'Laravel', 'Tailwind CSS'],
    image: null,
    github: 'https://github.com/alvinmalik30',
    demo: null,
  },
  {
    title: 'Marketing Site Rebuild',
    year: '2023',
    kind: 'Web / SEO',
    description:
      'Rebuilt a marketing site with a focus on Core Web Vitals and structured data. It now scores 95+ on Lighthouse and ranks noticeably better.',
    result: 'Lighthouse score 95+ across all categories',
    stack: ['Nuxt', 'SEO', 'Analytics'],
    image: null,
    github: 'https://github.com/alvinmalik30',
    demo: null,
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
