<template>
  <section id="contact" class="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28 border-t border-line">
    <div class="grid md:grid-cols-12 gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">Contact</p>
      </div>

      <div class="md:col-span-9">
        <h2 class="reveal font-serif text-2xl md:text-3xl leading-snug max-w-2xl text-balance mb-8">
          If you&apos;d like to talk about a project — or just want to say hi —
          my inbox is open.
        </h2>

        <a
          href="mailto:alvinmalikibrahim20@gmail.com"
          class="reveal inline-block bg-foreground text-background rounded-full px-6 py-2.5 text-sm hover:bg-accent transition-colors mb-14"
        >
          alvinmalikibrahim20@gmail.com
        </a>

        <dl class="reveal space-y-3 max-w-md">
          <div
            v-for="link in links"
            :key="link.label"
            class="flex items-baseline justify-between gap-6 border-b border-line pb-3"
          >
            <dt class="text-sm text-muted">{{ link.label }}</dt>
            <dd>
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-link"
              >
                {{ link.value }}
              </a>
            </dd>
          </div>
        </dl>

        <p class="reveal mt-10 text-sm text-muted">
          Currently open to freelance projects and full-time roles. I usually
          reply within a day.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const links = [
  { label: 'GitHub', href: 'https://github.com/alvinmalik30', value: '@alvinmalik30' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alvin-malik-ibrahim', value: 'alvin-malik-ibrahim' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#contact .reveal').forEach((el) => observer.observe(el))
})
</script>
