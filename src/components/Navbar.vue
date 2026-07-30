<template>
  <header class="max-w-content mx-auto px-6 md:px-10 pt-8 md:pt-10">
    <div class="flex items-start justify-between gap-6">
      <a href="#top" @click.prevent="scrollTo('#top')" class="flex items-center gap-3">
        <svg
          viewBox="0 0 32 32"
          class="w-9 h-9 shrink-0"
          role="img"
          aria-label="Logo Alvin Malik Ibrahim"
        >
          <rect width="32" height="32" rx="7" class="fill-foreground" />
          <path
            d="M9.5 24 16 8.5 22.5 24"
            fill="none"
            class="stroke-background"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="16" cy="19.6" r="2.5" class="fill-accent" />
        </svg>
        <span class="leading-snug">
          <span class="block font-medium text-sm">Alvin Malik Ibrahim</span>
          <span class="block text-sm text-muted">Web &amp; Mobile Developer</span>
        </span>
      </a>

      <nav class="hidden sm:flex items-center gap-6 text-sm pt-0.5" aria-label="Main navigation">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          @click.prevent="scrollTo(`#${item.id}`)"
          class="text-muted hover:text-foreground transition-colors"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        class="sm:hidden text-sm text-muted hover:text-foreground transition-colors pt-0.5"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
      >
        {{ menuOpen ? 'Close' : 'Menu' }}
      </button>
    </div>

    <nav
      v-if="menuOpen"
      class="sm:hidden mt-6 flex flex-col gap-4 text-sm border-t border-line pt-6"
      aria-label="Mobile navigation"
    >
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`"
        @click.prevent="scrollTo(`#${item.id}`); menuOpen = false"
        class="text-muted hover:text-foreground transition-colors"
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const menuOpen = ref(false)

const allNavItems = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'credentials', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/*
 * Menu hanya menampilkan section yang benar-benar ada di halaman.
 * Jadi kalau "Experience" masih disembunyikan (lihat src/site.config.js),
 * link-nya tidak akan muncul dan tidak ada menu yang mengarah ke ruang kosong.
 */
const navItems = ref(allNavItems)

onMounted(() => {
  navItems.value = allNavItems.filter((item) => document.getElementById(item.id))
})

const scrollTo = (selector) => {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>
