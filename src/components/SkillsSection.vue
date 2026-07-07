<template>
  <section id="skills" class="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28 border-t border-line">
    <div class="grid md:grid-cols-12 gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">Toolbox</p>
      </div>

      <div class="md:col-span-9">
        <dl class="space-y-6">
          <div
            v-for="group in groups"
            :key="group.name"
            class="reveal grid sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
          >
            <dt class="sm:col-span-3 text-sm text-muted">{{ group.name }}</dt>
            <dd class="sm:col-span-9 text-[15px] leading-relaxed">{{ group.items }}</dd>
          </div>
        </dl>

        <p class="mt-10 text-sm text-muted reveal max-w-2xl leading-relaxed">
          I pick tools based on the problem, not the other way around — but
          these are the ones I keep coming back to.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const groups = [
  { name: 'Frontend', items: 'Vue, Nuxt, JavaScript, Tailwind CSS' },
  { name: 'Mobile', items: 'Flutter, Dart' },
  { name: 'Backend', items: 'Laravel, PHP, MySQL, REST APIs' },
  { name: 'Quality', items: 'QA testing, PHPUnit, Cypress, manual testing' },
  { name: 'Everything else', items: 'Git, Docker, CI/CD, technical SEO, Figma, Linux' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#skills .reveal').forEach((el) => observer.observe(el))
})
</script>
