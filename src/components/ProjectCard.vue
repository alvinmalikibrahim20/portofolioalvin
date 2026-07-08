<template>
  <li
    class="reveal py-8 first:pt-0"
    :class="{ 'border-b border-line': !isLast }"
  >
    <div class="flex items-baseline justify-between gap-4 mb-2">
      <h3 class="font-serif text-xl md:text-2xl">{{ project.title }}</h3>
      <span class="text-sm text-muted shrink-0">{{ project.year }}</span>
    </div>

    <p class="text-sm text-muted mb-3">{{ project.kind }}</p>

    <img
      v-if="project.image"
      :src="project.image"
      :alt="project.imageAlt || project.title"
      class="w-full max-w-2xl rounded-sm border border-line mb-4"
      loading="lazy"
    />

    <p class="text-[15px] leading-relaxed max-w-2xl mb-2">
      {{ project.description }}
    </p>

    <p v-if="project.result" class="text-sm text-accent mb-4">
      {{ project.result }}
    </p>

    <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
      <div class="flex flex-wrap gap-2">
        <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
      </div>

      <div class="flex items-center gap-4 text-sm">
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link text-foreground hover:text-accent transition-colors"
        >
          Live demo
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
defineProps({
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
</script>
