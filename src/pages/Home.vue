<template>
  <div>
    <Navbar :is-dark="isDark" @toggle-dark="$emit('toggle-dark')" />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
    <footer class="border-t dark:border-white/5 border-slate-200 py-10 dark:bg-transparent bg-white/50">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs">
            AM
          </div>
          <span class="dark:text-slate-400 text-slate-500 text-sm">
            <span class="dark:text-white text-slate-900 font-medium">Alvin Malik</span> — Fullstack &amp; Mobile Developer
          </span>
        </div>

        <div class="flex items-center gap-6">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="dark:text-slate-500 text-slate-400 dark:hover:text-white hover:text-slate-900 transition-colors duration-200 text-sm"
          >
            {{ link.label }}
          </a>
        </div>

        <p class="dark:text-slate-600 text-slate-400 text-xs font-mono">
          © {{ new Date().getFullYear() }} · Built with Vue 3 + Vite
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ContactSection from '../components/ContactSection.vue'

defineProps({ isDark: Boolean })
defineEmits(['toggle-dark'])

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/alvinmalik30' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alvinmalik' },
  { label: 'Email', href: 'mailto:alvinmalikibrahim20@gmail.com' },
]
</script>
