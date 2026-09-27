<template>
  <section id="work" class="section-shell" aria-labelledby="work-title">
    <div class="section-grid">
      <div class="lg:col-span-3">
        <h2 id="work-title" class="eyebrow">Selected work</h2>
        <p class="mt-3 text-sm text-muted max-w-xs">Real applications.<br />The work behind the screens.</p>
      </div>
      <div class="lg:col-span-9 min-w-0">
        <ul><ProjectCard v-for="(project, index) in projects" :key="project.slug" :project="project" :index="index" :is-last="index === projects.length - 1" /></ul>
        <div class="mt-8 p-6 bg-[#F0EDE5] rounded-sm">
          <h3 class="font-serif text-2xl">Have a similar challenge?</h3>
          <p class="mt-2 mb-5 text-muted">Tell me what you’re building, what needs fixing, and when you need it.</p>
          <ContactCta label="Discuss your project" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.vue'
import ContactCta from './ContactCta.vue'
</script>
