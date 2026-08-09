<template>
  <section id="work" class="max-w-content mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-28 border-t border-line">
    <div class="grid md:grid-cols-12 gap-8 md:gap-10">
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

        <p class="mt-12 text-sm text-muted reveal max-w-2xl leading-relaxed">
          Most of what I build lives behind a company login, so the admin and
          finance systems above have no public link. I&apos;m happy to walk
          through them on a call.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import ProjectCard from './ProjectCard.vue'

/*
 * Semua proyek di bawah ini ASLI dan sudah diverifikasi langsung
 * di browser (tunasauction.com adalah Flutter web build, judul
 * dokumennya "Tunas Auction V2"; admin panelnya Vue dengan SSO
 * Microsoft dan sekitar 100 modul).
 *
 * Catatan kerahasiaan: link admin sandbox dan kredensial SENGAJA
 * tidak dicantumkan di sini karena ini website publik. Cukup
 * sebutkan saat wawancara atau kirim manual ke klien.
 */
const projects = [
  {
    title: 'Tunas Auction — auction platform',
    year: '2024 — now',
    kind: 'Web + mobile, one codebase',
    description:
      'The public bidding platform for one of Indonesia\u2019s largest vehicle auction houses. Buyers browse lots, check auction schedules, buy a bidding permit (NIPL), and bid in live sessions across cars, motorcycles, and heavy equipment. I took it from separate web and mobile frontends to a single Flutter codebase serving both.',
    result:
      'One codebase now covers web, Android, and iOS — every feature ships to all three at once instead of being rebuilt twice.',
    stack: ['Flutter', 'Dart', 'Nuxt', 'REST API'],
    image: '/images/projects/tunas-auction-web.png',
    imageAlt: 'Tunas Auction homepage showing auction schedules and vehicle categories',
    demo: 'https://tunasauction.com',
    github: null,
  },
  {
    title: 'Live bidding & buyer accounts',
    year: '2024 — now',
    kind: 'Real-time feature',
    description:
      'The live auction room and the account flow around it — registration, Google sign-in, deposit and NIPL purchase, then real-time bidding with the timing and validation that has to be exactly right when money is involved.',
    result: null,
    stack: ['Flutter', 'WebSocket', 'OAuth'],
    image: '/images/projects/tunas-auction-app.png',
    imageAlt: 'Tunas Auction login screen promoting the mobile bidding app',
    demo: 'https://tunasauction.com/live-auction',
    github: null,
  },
  {
    title: 'Finance & operations admin console',
    year: '2024 — now',
    kind: 'Internal web app',
    description:
      'A large Vue admin panel I build and maintain for the finance and operations teams: auction events, unit master data, NIPL and reservation approvals, customer payments, refunds, overpayments, vendor management, and role-based access with per-group menus. It runs on Microsoft SSO.',
    result:
      'Grew to roughly 100 modules covering the full auction lifecycle, from unit intake through to post-auction settlement.',
    stack: ['Vue', 'Microsoft SSO', 'SQL Server'],
    image: null,
    demo: null,
    github: null,
  },
  {
    title: 'ERP integration (FRIENDS by Microsoft)',
    year: '2024 — now',
    kind: 'Systems integration',
    description:
      'Refactored the admin panel to talk to the company ERP instead of holding finance data on its own. That meant building a set of sync pipelines — customers, bidding permits, winners, settlements, deposit refunds, defaults, and vendor payments — that stay consistent when either side fails mid-transfer.',
    result:
      'Ten sync pipelines replaced manual re-entry between the auction system and the ERP.',
    stack: ['Vue', 'ERP API', 'SQL Server'],
    image: null,
    demo: null,
    github: null,
  },
  {
    title: 'Vehicle grading & reporting',
    year: '2025',
    kind: 'Internal module',
    description:
      'The grading side of the platform: inspection components and checklists, scoring ranges, classification rules, and the reports that come out of them. Also the reporting layer for financing partners, each of whom needs the same data in a different shape.',
    result: null,
    stack: ['Vue', 'Odoo', 'PostgreSQL'],
    image: null,
    demo: null,
    github: null,
  },
  {
    title: 'Racer Robot web properties',
    year: '2019 — 2023',
    kind: 'Web & digital marketing',
    description:
      'Built and designed the company\u2019s sites — the main corporate site, a robotics community site, and the site for IYRA, a regional-to-international robotics competition — plus Facebook ad landing pages. I also ran SEO and analytics, and trained teachers at partner schools as a master trainer.',
    result: null,
    stack: ['PHP', 'SEO', 'Google Analytics'],
    image: null,
    demo: 'https://racer-robot.id',
    github: null,
    extraLinks: [{ label: 'iyra-indonesia.id', href: 'https://iyra-indonesia.id' }],
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
