<template>
  <section
    v-if="siteConfig.workExperienceReady"
    id="experience"
    class="max-w-content mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-28 border-t border-line"
  >
    <div class="grid md:grid-cols-12 gap-8 md:gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">Experience</p>
      </div>

      <div class="md:col-span-9">
        <ul>
          <li
            v-for="(job, i) in jobs"
            :key="job.company + job.period"
            class="reveal py-6 first:pt-0 grid sm:grid-cols-12 gap-4 sm:gap-6"
            :class="{ 'border-b border-line': i !== jobs.length - 1 }"
          >
            <div class="sm:col-span-4">
              <h3 class="font-serif text-lg">{{ job.role }}</h3>
              <p class="text-sm text-muted mt-1">{{ job.company }}</p>
              <p class="text-sm text-muted">{{ job.period }}</p>
            </div>
            <div class="sm:col-span-8">
              <ul class="space-y-2 text-[15px] leading-relaxed text-muted list-disc pl-4 marker:text-line">
                <li v-for="point in job.highlights" :key="point">{{ point }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { siteConfig } from '../site.config.js'

/* Data asli, diambil dari CV Alvin Malik Ibrahim. */
const jobs = [
  {
    role: 'Programmer Staff',
    company: 'PT Tunas Rent — Tunas Auction',
    period: 'Apr 2024 — Present',
    highlights: [
      'Maintain and extend the public auction platform, first in Nuxt and now as a single Flutter codebase serving web, Android, and iOS.',
      'Built and still run the finance and operations admin console in Vue, now around 100 modules covering the whole auction lifecycle.',
      'Refactored the admin to integrate with the company ERP (FRIENDS by Microsoft), replacing manual data entry with ten sync pipelines for customers, permits, winners, settlements, refunds, and vendor payments.',
      'Migrating parts of the admin onto Odoo, and built the vehicle grading and partner reporting modules.',
    ],
  },
  {
    role: 'Engineer & Logistics',
    company: 'PT Pacific Cipta Nusantara',
    period: 'Mar 2023 — May 2023',
    highlights: [
      'Short engineering and logistics assignment between development roles.',
    ],
  },
  {
    role: 'Web Developer & Digital Marketing',
    company: 'PT Racer Robot Indonesia',
    period: 'Aug 2019 — Mar 2023',
    highlights: [
      'Designed and built four company sites — the corporate site, a robotics community site, the IYRA competition site, and an e-learning platform.',
      'Built Facebook ad landing pages and handled SEO and Google Analytics.',
      'Organised IYRA robotics competitions from regional through to international level.',
      'Served as master trainer and speaker for train-the-trainer programmes at partner schools.',
    ],
  },
  {
    role: 'Intern — Hacking & Security',
    company: 'Badan Pengkajian dan Penerapan Teknologi (BPPT)',
    period: 'Jan 2018 — Mar 2018',
    highlights: [
      'Internship in the government technology agency\u2019s security division.',
    ],
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#experience .reveal').forEach((el) => observer.observe(el))
})
</script>
