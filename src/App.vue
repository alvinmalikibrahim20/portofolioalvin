<template>
  <div class="min-h-screen bg-background text-foreground pb-24 lg:pb-0">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <Navbar />
    <main id="main-content" tabindex="-1">
      <Home v-if="isHome" />
      <CaseStudy v-else-if="project" :project="project" />
      <section v-else class="page-shell py-20"><h1 class="font-serif text-4xl">Page not found</h1><p class="text-muted mt-4">This page isn’t part of the portfolio.</p><a href="/" class="button-primary mt-6">Back to home</a></section>
    </main>
    <footer class="page-shell py-8 border-t border-line">
      <div class="flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted">
        <p>© {{ year }} Alvin Malik Ibrahim<br /><span class="text-xs">Full-stack Developer · Indonesia, GMT+7</span></p>
        <div class="flex flex-wrap gap-x-5 gap-y-1">
          <a v-for="link in socialLinks" :key="link.label" :href="link.href" target="_blank" rel="noopener noreferrer" class="min-h-11 inline-flex items-center text-link">{{ link.label }}</a>
        </div>
      </div>
    </footer>
    <div class="mobile-contact fixed bottom-0 inset-x-0 z-30 border-t border-line bg-background/95 backdrop-blur-sm px-5 pt-3 lg:hidden">
      <a :href="profile.whatsapp" class="button-primary w-full" target="_blank" rel="noopener noreferrer">Let’s talk on WhatsApp <span aria-hidden="true">↗</span></a>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import Home from './pages/Home.vue'
import CaseStudy from './pages/CaseStudy.vue'
import Navbar from './components/Navbar.vue'
import { profile, siteConfig } from './site.config.js'
import { findProject } from './data/projects.js'
const props = defineProps({ path: { type: String, default: '/' } })
const isHome = computed(() => props.path === '/')
const project = computed(() => findProject(props.path))
const year = siteConfig.copyrightYear
const socialLinks = [
  { label: 'LinkedIn', href: profile.linkedin }, { label: 'GitHub', href: profile.github },
  { label: 'Portfolio source', href: profile.source },
]
let observer
onMounted(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Content stays visible even if this enhancement cannot initialize.
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('reveal-enter')
      observer.unobserve(entry.target)
    }
  }, { threshold: 0.05 })
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
onUnmounted(() => observer?.disconnect())
</script>
