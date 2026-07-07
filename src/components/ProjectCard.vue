<template>
  <li
    class="reveal py-8 first:pt-0"
    :class="{ 'border-b border-line': !isLast }"
  >
    <div class="flex items-baseline justify-between gap-4 mb-2">
      <h3 class="font-serif text-xl md:text-2xl">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-accent transition-colors"
        >
          {{ project.title }}
        </a>
        <span v-else>{{ project.title }}</span>
      </h3>
      <span class="text-sm text-muted shrink-0">{{ project.year }}</span>
    </div>

    <p class="text-sm text-muted mb-3">{{ project.kind }}</p>

    <p class="text-[15px] leading-relaxed max-w-2xl mb-4">
      {{ project.description }}
    </p>

    <div class="flex flex-wrap gap-2">
      <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
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
