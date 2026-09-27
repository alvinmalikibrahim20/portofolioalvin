<template>
  <li class="reveal py-9 first:pt-0" :class="{ 'border-b border-line': !isLast }">
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wider text-muted mb-3">
      <span class="text-accent">{{ index === 0 ? 'Featured case study' : '0' + (index + 1) + ' / Case study' }}</span>
      <span>{{ project.period }}</span>
    </div>
    <h3 class="font-serif text-2xl sm:text-3xl leading-tight mb-3"><a :href="'/work/' + project.slug + '/'" class="hover:text-accent">{{ project.title }}</a></h3>
    <p class="text-muted mb-5 max-w-2xl leading-relaxed">{{ project.summary }}</p>
    <figure v-if="project.image && siteConfig.projectImagesReady" class="mb-5">
      <a :href="'/work/' + project.slug + '/'" :aria-label="'Read case study: ' + project.title">
        <img :src="project.image.src" :alt="project.image.alt" :width="project.image.width" :height="project.image.height" class="w-full rounded-sm border border-line" loading="lazy" decoding="async" />
      </a>
      <figcaption class="text-xs text-muted mt-2 leading-relaxed">{{ project.image.caption }}</figcaption>
    </figure>
    <dl class="grid sm:grid-cols-2 gap-5 mb-5">
      <div><dt class="text-xs font-medium uppercase tracking-wider mb-1">My contribution</dt><dd class="text-sm leading-relaxed text-muted">{{ project.role }}</dd></div>
      <div><dt class="text-xs font-medium uppercase tracking-wider mb-1">Outcome</dt><dd class="text-sm leading-relaxed text-muted">{{ project.result }}</dd></div>
    </dl>
    <ul class="flex flex-wrap gap-2 mb-3" aria-label="Technology stack"><li v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</li></ul>
    <a :href="'/work/' + project.slug + '/'" class="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-link">Read case study <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a>
  </li>
</template>
<script setup>
import { siteConfig } from '../site.config.js'
defineProps({ project: { type: Object, required: true }, index: { type: Number, default: 0 }, isLast: Boolean })
</script>
