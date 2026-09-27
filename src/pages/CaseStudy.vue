<template>
  <article class="page-shell py-12 lg:py-20">
    <a href="/#work" class="text-link text-sm inline-flex min-h-11 items-center mb-7">← Back to selected work</a>
    <p class="eyebrow mb-4">{{ project.client }} · {{ project.period }}</p>
    <h1 class="font-serif text-4xl sm:text-5xl leading-tight max-w-4xl">{{ project.title }}</h1>
    <p class="mt-5 text-lg text-muted leading-relaxed max-w-3xl">{{ project.summary }}</p>
    <ul class="flex flex-wrap gap-2 mt-6" aria-label="Technology stack"><li v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</li></ul>
    <figure v-if="project.image" class="mt-9">
      <img :src="project.image.src" :alt="project.image.alt" :width="project.image.width" :height="project.image.height" decoding="async" fetchpriority="high" class="w-full max-w-4xl border border-line rounded-sm" />
      <figcaption class="text-sm text-muted mt-3 max-w-3xl">{{ project.image.caption }}</figcaption>
    </figure>
    <div class="mt-10 lg:mt-14 grid lg:grid-cols-[1fr_260px] gap-10 lg:gap-16">
      <div class="min-w-0">
        <section v-for="part in sections" :key="part.key" class="mb-9">
          <h2 class="font-serif text-2xl mb-3">{{ part.label }}</h2>
          <p class="leading-relaxed text-muted">{{ project[part.key] }}</p>
        </section>
        <section class="mb-9">
          <h2 class="font-serif text-2xl mb-3">Contributions in detail</h2>
          <ul class="list-disc pl-5 text-muted space-y-3"><li v-for="item in project.contributions" :key="item">{{ item }}</li></ul>
        </section>
        <section v-if="project.domains" class="mb-9">
          <h2 class="font-serif text-2xl mb-3">A high-level view of the work</h2>
          <p class="text-sm text-muted mb-5">Responsibility areas, simplified from the work described above. Not a deployment or transaction-flow diagram.</p>
          <ol class="grid sm:grid-cols-3 gap-3">
            <li v-for="(domain, i) in project.domains" :key="domain.title" class="border border-line p-4 rounded-sm bg-[#F0EDE5]">
              <span class="text-xs text-accent">0{{ i + 1 }}</span><h3 class="font-medium text-sm my-2">{{ domain.title }}</h3><p class="text-sm text-muted leading-relaxed">{{ domain.items }}</p>
            </li>
          </ol>
        </section>
        <figure v-if="project.additionalImage" class="mb-9">
          <img :src="project.additionalImage.src" :alt="project.additionalImage.alt" :width="project.additionalImage.width" :height="project.additionalImage.height" loading="lazy" decoding="async" class="border border-line rounded-sm" />
          <figcaption class="text-sm text-muted mt-3">{{ project.additionalImage.caption }}</figcaption>
        </figure>
      </div>
      <aside class="border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-6">
        <h2 class="eyebrow mb-4">Available evidence</h2>
        <p class="text-sm text-muted leading-relaxed">{{ project.evidence }}</p>
        <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-link min-h-11 mt-3">{{ project.demoLabel }} ↗</a>
        <a v-for="link in project.extraLinks || []" :key="link.href" :href="link.href" target="_blank" rel="noopener noreferrer" class="flex items-center text-sm text-link min-h-11">{{ link.label }} ↗</a>
      </aside>
    </div>
    <div class="border-t border-line pt-8 mt-4 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
      <div><h2 class="font-serif text-2xl">Need help with something similar?</h2><p class="mt-2 text-muted">Let’s discuss your application and the work it needs.</p></div>
      <ContactCta label="Discuss your project" />
    </div>
  </article>
</template>
<script setup>
import ContactCta from '../components/ContactCta.vue'
defineProps({ project: { type: Object, required: true } })
const sections = [
  { label: 'Problem', key: 'problem' }, { label: 'Solution', key: 'solution' },
  { label: 'My role', key: 'role' }, { label: 'Technical challenge', key: 'challenge' }, { label: 'Result', key: 'result' },
]
</script>
