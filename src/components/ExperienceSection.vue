<template>
  <section id="services" class="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28 border-t border-line">
    <div class="grid md:grid-cols-12 gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">What I can help with</p>
      </div>

      <div class="md:col-span-9">
        <ul>
          <li
            v-for="(service, i) in services"
            :key="service.title"
            class="reveal py-6 first:pt-0 grid sm:grid-cols-12 gap-2 sm:gap-6"
            :class="{ 'border-b border-line': i !== services.length - 1 }"
          >
            <div class="sm:col-span-4">
              <h3 class="font-serif text-lg">{{ service.title }}</h3>
            </div>
            <p class="sm:col-span-8 text-[15px] leading-relaxed text-muted">
              {{ service.description }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

/* Hanya hal-hal yang benar-benar sudah pernah saya kerjakan. */
const services = [
  {
    title: 'Auction & bidding platforms',
    description:
      'Real-time bidding that holds up when money is on the line — concurrent bids, countdown logic, deposits and bidding permits, and an admin panel your operations team can run without me.',
  },
  {
    title: 'One codebase, web and mobile',
    description:
      'Flutter targeting web, Android, and iOS together. I migrated an auction platform from separate Nuxt and mobile frontends to a single codebase, so features ship once instead of three times.',
  },
  {
    title: 'Admin & finance consoles',
    description:
      'The unglamorous internal tooling that businesses actually run on: approvals, master data, payments, refunds, role-based access, and reports that each partner wants in a different shape.',
  },
  {
    title: 'ERP & systems integration',
    description:
      'Sync pipelines between your app and an ERP — I built ten of them against Microsoft FRIENDS, covering customers, winners, settlements, and vendor payments. The hard part is what happens when one side fails halfway.',
  },
  {
    title: 'Web apps & marketing sites',
    description:
      'Vue or Nuxt frontends, plus the technical SEO and analytics side: Core Web Vitals, structured data, page speed. I ran this for four company sites before moving into auction systems.',
  },
  {
    title: 'QA & testing',
    description:
      'Manual and automated testing with Katalon, done before launch rather than after complaints. Useful on projects where a regression costs real money.',
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#services .reveal').forEach((el) => observer.observe(el))
})
</script>
