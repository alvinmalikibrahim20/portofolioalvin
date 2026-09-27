<template>
  <section v-if="siteConfig.workExperienceReady" id="experience" class="section-shell" aria-labelledby="experience-title">
    <div class="section-grid">
      <div class="lg:col-span-3"><h2 id="experience-title" class="eyebrow">Selected experience</h2><p class="mt-3 text-sm text-muted">Roles focused on software.<br />Contributions beyond the job title.</p></div>
      <div class="lg:col-span-9">
        <ol>
          <li v-for="(job, i) in jobs" :key="job.company" class="reveal py-8 first:pt-0" :class="{ 'border-b border-line': i !== jobs.length - 1 }">
            <div class="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
              <div><h3 class="font-serif text-2xl">{{ job.role }}</h3><p v-if="job.official" class="text-xs text-muted mt-1">Official title: {{ job.official }}</p><p class="text-sm font-medium mt-2">{{ job.company }}</p></div>
              <p class="text-sm text-muted sm:shrink-0 sm:pt-1">{{ job.period }}</p>
            </div>
            <ul class="space-y-2 leading-relaxed text-muted list-disc pl-5"><li v-for="point in job.highlights" :key="point">{{ point }}</li></ul>
            <ul class="flex flex-wrap gap-2 mt-4" aria-label="Technologies used"><li v-for="tech in job.stack" :key="tech" class="tag">{{ tech }}</li></ul>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
<script setup>
import { siteConfig } from '../site.config.js'
const jobs = [
  {
    role: 'Full-stack Developer',
    official: 'Programmer Staff',
    company: 'PT Tunas Rent · Tunas Auction',
    period: 'Apr 2024 — present',
    stack: ['Vue.js', 'Nuxt', 'Flutter', 'REST API', 'SQL Server', 'Odoo'],
    highlights: [
      'Maintain the auction website and work on the transition from Nuxt to a shared Flutter frontend for web and mobile.',
      'Build and maintain the Vue admin console used by finance and operations for auction, payment, refund, and reporting workflows.',
      'Refactor integrations between the admin console and company ERP, connecting customer, permit, settlement, refund, and vendor records.',
      'Develop vehicle grading and partner reports, and contribute to the migration of parts of the admin to Odoo.',
    ],
  },
  {
    role: 'Web Developer & Digital Marketing',
    company: 'PT Racer Robot Indonesia',
    period: 'Aug 2019 — Mar 2023',
    stack: ['PHP', 'Web development', 'SEO', 'Google Analytics'],
    highlights: [
      'Designed and developed company, robotics community, IYRA competition, and e-learning websites.',
      'Built Facebook campaign landing pages and handled website SEO and analytics.',
      'Helped organize robotics competitions and delivered training for teachers at partner schools.',
    ],
  },
  {
    role: 'Security Intern',
    company: 'Badan Pengkajian dan Penerapan Teknologi (BPPT)',
    period: 'Jan — Mar 2018',
    stack: ['Hacking & security'],
    highlights: ['Completed an internship in the government technology agency’s hacking and security division.'],
  },
]
</script>
