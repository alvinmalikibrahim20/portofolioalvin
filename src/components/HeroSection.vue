<template>
  <section id="top" class="max-w-content mx-auto px-6 md:px-10 pt-28 md:pt-40 pb-20 md:pb-28">
    <div class="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
      <p class="text-sm text-muted">{{ greeting }}</p>
      <p class="flex items-center gap-2 text-sm">
        <span class="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></span>
        <span>Available for freelance &amp; full-time work</span>
      </p>
    </div>

    <h1 class="font-serif text-3xl md:text-[2.6rem] leading-snug md:leading-snug max-w-3xl text-balance">
      I&apos;m Alvin, a developer based in Indonesia. I spend most of my time
      building web apps with Vue and Nuxt, mobile apps with Flutter, and the
      Laravel backends that hold them together.
    </h1>

    <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm">
      <a href="#work" @click.prevent="scrollTo('#work')" class="border border-line rounded-full px-5 py-2 hover:border-foreground transition-colors">
        Selected work
      </a>
      <a
        href="/cv/alvin-malik-cv.pdf"
        download="Alvin-Malik-CV.pdf"
        class="border border-line rounded-full px-5 py-2 hover:border-foreground transition-colors"
      >
        Download CV
      </a>
      <a href="#contact" @click.prevent="scrollTo('#contact')" class="text-link text-muted hover:text-foreground">
        Get in touch
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 5) return 'Up late?'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

const scrollTo = (selector) => {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>
