<template>
  <div
    class="project-card-inner group glass rounded-2xl overflow-hidden border dark:border-white/5 border-slate-200/80 dark:hover:border-indigo-500/25 hover:border-indigo-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col"
  >
    <div class="relative overflow-hidden h-48">
      <div
        class="absolute inset-0 flex items-center justify-center"
        :class="project.bgGradient"
      >
        <div class="text-center">
          <div class="text-6xl mb-3 opacity-80">{{ project.icon }}</div>
          <span class="text-xs font-mono text-white/40 uppercase tracking-widest">{{ project.category }}</span>
        </div>

        <div class="absolute inset-0 bg-grid opacity-20"></div>
      </div>

      <div class="absolute top-3 right-3 flex gap-2">
        <span
          v-if="project.featured"
          class="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 border border-amber-500/30 text-amber-400"
        >
          Featured
        </span>
        <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm border border-white/10 text-slate-300">
          {{ project.year }}
        </span>
      </div>

      <div class="absolute inset-0 bg-gradient-to-t dark:from-[#05050a] from-white/20 via-transparent to-transparent opacity-60"></div>
    </div>

    <div class="p-6 flex flex-col flex-1">
      <h3 class="font-bold dark:text-white text-slate-900 text-lg mb-2 group-hover:gradient-text transition-all duration-300">
        {{ project.title }}
      </h3>
      <p class="dark:text-slate-400 text-slate-500 text-sm leading-relaxed mb-4 flex-1">
        {{ project.description }}
      </p>

      <div class="flex flex-wrap gap-2 mb-5">
        <span
          v-for="tech in project.stack"
          :key="tech"
          class="px-2.5 py-1 rounded-lg text-xs font-medium dark:bg-white/5 bg-slate-100 dark:border-white/8 border-slate-200 dark:text-slate-400 text-slate-500 hover:text-indigo-500 dark:hover:border-indigo-500/30 hover:border-indigo-400/40 transition-all duration-200"
        >
          {{ tech }}
        </span>
      </div>

      <div class="flex gap-3 mt-auto">
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 btn-primary text-white justify-center py-2.5 text-xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Live Demo
        </a>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 btn-secondary justify-center py-2.5 text-xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <button
          v-if="!project.demo && !project.github"
          disabled
          class="flex-1 btn-secondary text-slate-600 justify-center py-2.5 text-xs cursor-not-allowed opacity-50"
        >
          Private Project
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>
