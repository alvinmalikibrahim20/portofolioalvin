<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled
        ? isDark
          ? 'py-3 bg-[#05050a]/85 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'py-3 bg-white/85 backdrop-blur-xl border-b border-black/5 shadow-xl'
        : 'py-5 bg-transparent',
    ]"
  >
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
      <a href="#hero" class="flex items-center gap-2 group" @click.prevent="scrollTo('#hero')">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-indigo-500/25 transition-transform duration-200 group-hover:scale-110">
          AM
        </div>
        <span class="font-bold text-lg tracking-tight" :class="isDark ? 'text-white' : 'text-slate-900'">
          alvin<span class="gradient-text">.</span>
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-1">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          @click.prevent="scrollTo(`#${item.id}`)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            activeSection === item.id
              ? isDark ? 'text-white bg-white/10' : 'text-indigo-600 bg-indigo-50'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100',
          ]"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          @click="$emit('toggle-dark')"
          :class="[
            'w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-300',
            isDark
              ? 'bg-white/5 border-white/10 text-amber-300 hover:bg-white/10'
              : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200',
          ]"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Transition name="spin-fade" mode="out-in">
            <svg v-if="isDark" key="sun" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else key="moon" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </Transition>
        </button>

        <a
          href="#contact"
          @click.prevent="scrollTo('#contact')"
          class="btn-primary hidden sm:inline-flex"
        >
          <span>Hire Me</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        <button
          :class="[
            'md:hidden w-9 h-9 flex items-center justify-center rounded-lg border transition-all',
            isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600',
          ]"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        :class="[
          'md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b px-6 py-4',
          isDark ? 'bg-[#05050a]/95 border-white/5' : 'bg-white/95 border-black/5',
        ]"
      >
        <nav class="flex flex-col gap-1">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="scrollTo(`#${item.id}`); mobileMenuOpen = false"
            :class="[
              'px-4 py-3 rounded-lg text-sm font-medium transition-all',
              isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
            ]"
          >
            {{ item.label }}
          </a>
          <a
            href="#contact"
            @click.prevent="scrollTo('#contact'); mobileMenuOpen = false"
            class="mt-2 btn-primary text-center justify-center"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({ isDark: Boolean })
defineEmits(['toggle-dark'])

const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const activeSection = ref('hero')

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

const scrollTo = (selector) => {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
  const sections = navItems.map((item) => item.id)
  for (const id of [...sections].reverse()) {
    const el = document.getElementById(id)
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = id
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.spin-fade-enter-active,
.spin-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.spin-fade-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.7);
}
.spin-fade-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.7);
}
</style>
