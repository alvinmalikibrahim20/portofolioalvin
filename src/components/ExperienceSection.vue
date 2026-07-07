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

const services = [
  {
    title: 'Web applications',
    description:
      'From single pages to full platforms — built with Vue or Nuxt on the front, Laravel behind it. I care about the parts users never see: load times, error states, edge cases.',
  },
  {
    title: 'Mobile apps',
    description:
      'Cross-platform apps in Flutter that don\u2019t feel cross-platform. One codebase, both stores, and offline support when the use case calls for it.',
  },
  {
    title: 'APIs & integrations',
    description:
      'REST APIs with proper auth, sensible error handling, and documentation someone can actually follow. Also third-party integrations that behave.',
  },
  {
    title: 'QA & SEO',
    description:
      'Testing before launch, not after complaints. And technical SEO work — Core Web Vitals, structured data, page speed — so what you ship gets found.',
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
