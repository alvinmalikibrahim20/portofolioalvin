<template>
  <header class="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur-sm">
    <div class="page-shell flex items-center justify-between gap-3 min-h-20 py-3">
      <a href="/" class="flex items-center gap-2.5 min-w-0" aria-label="Alvin Malik Ibrahim — home">
        <img src="/favicon.svg" alt="" width="36" height="36" class="shrink-0" />
        <span class="leading-snug"><span class="block text-sm font-medium">Alvin Malik Ibrahim</span><span class="block text-xs text-muted">Full-stack Developer</span></span>
      </a>
      <nav class="hidden lg:flex items-center gap-5 text-sm" aria-label="Main navigation">
        <a v-for="item in navItems" :key="item.id" :href="'/#' + item.id" class="nav-link">{{ item.label }}</a>
        <a href="/#contact" class="button-primary">Hire me <span aria-hidden="true">↗</span></a>
      </nav>
      <details ref="menu" class="mobile-menu lg:hidden" @keydown.esc="closeMenu">
        <summary class="button-secondary cursor-pointer list-none" aria-label="Toggle navigation menu">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" stroke-width="1.5" /></svg>
          <span>Menu</span>
        </summary>
        <nav aria-label="Mobile navigation" class="absolute left-0 right-0 top-full border-b border-line bg-background shadow-sm max-h-[75svh] overflow-y-auto" @click="closeOnLink">
          <div class="page-shell py-3 flex flex-col">
            <a v-for="item in navItems" :key="item.id" :href="'/#' + item.id" class="nav-link py-3 border-b border-line">{{ item.label }}</a>
            <a href="/#about" class="nav-link py-3">About Alvin</a>
            <a href="/#contact" class="button-primary mt-2 mb-2">Let’s talk</a>
          </div>
        </nav>
      </details>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const menu = ref(null)
const navItems = [
  { id: 'work', label: 'Work' }, { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' }, { id: 'skills', label: 'Skills' },
]
function closeMenu() {
  if (!menu.value) return
  menu.value.open = false
  menu.value.querySelector('summary')?.focus()
}
function closeOnLink(event) {
  if (event.target.closest('a')) menu.value.open = false
}
</script>
