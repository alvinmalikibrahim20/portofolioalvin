<template>
  <li
    class="reveal py-8 first:pt-0"
    :class="{ 'border-b border-line': !isLast }"
  >
    <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-2">
      <h3 class="font-serif text-xl md:text-2xl">{{ project.title }}</h3>
      <span class="text-sm text-muted sm:shrink-0">{{ project.year }}</span>
    </div>

    <p class="text-sm text-muted mb-3">{{ project.kind }}</p>

    <img
      v-if="project.image && siteConfig.projectImagesReady"
      :src="project.image"
      :alt="project.imageAlt || project.title"
      class="w-full max-w-2xl rounded-sm border border-line mb-4 object-cover"
      loading="lazy"
    />

    <p class="text-[15px] leading-relaxed max-w-2xl mb-2">
      {{ project.description }}
    </p>

    <p v-if="result" class="text-sm text-accent mb-4">
      {{ result }}
    </p>

    <div class="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
      <div class="flex flex-wrap gap-2">
        <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
      </div>

      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link text-foreground hover:text-accent transition-colors"
        >
          Visit live site
        </a>
        <a
          v-for="link in project.extraLinks || []"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link text-muted hover:text-foreground transition-colors"
        >
          {{ link.label }}
        </a>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link text-muted hover:text-foreground transition-colors"
        >
          Code
        </a>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { siteConfig, realText } from '../site.config.js'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
})

/* Hasil terukur hanya ditampilkan jika sudah diisi asli (bukan "[...]"). */
const result = computed(() => realText(props.project.result))
</script>
