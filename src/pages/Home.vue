<template>
  <div>
    <Navbar />
    <main>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
    <footer class="max-w-content mx-auto px-6 md:px-10 py-10 border-t border-line">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-muted">
        <p>&copy; {{ new Date().getFullYear() }} Alvin Malik</p>
        <div class="flex items-center gap-5">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-foreground transition-colors"
          >
            {{ link.label }}
          </a>
        </div>
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

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/alvinmalik30' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alvin-malik-ibrahim' },
  { label: 'Email', href: 'mailto:alvinmalikibrahim20@gmail.com' },
]
</script>
