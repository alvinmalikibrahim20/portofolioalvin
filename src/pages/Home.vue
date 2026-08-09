<template>
  <div>
    <Navbar />
    <main>
      <HeroSection />
      <ProjectsSection />
      <WorkExperienceSection />
      <AboutSection />
      <SkillsSection />
      <CredentialsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <footer class="max-w-content mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-10 border-t border-line">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-muted">
        <p>&copy; {{ new Date().getFullYear() }} Alvin Malik Ibrahim</p>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
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
import CredentialsSection from '../components/CredentialsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import WorkExperienceSection from '../components/WorkExperienceSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import ContactSection from '../components/ContactSection.vue'

import { profile } from '../site.config.js'

const socialLinks = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'WhatsApp', href: profile.whatsapp },
  { label: 'Email', href: `mailto:${profile.email}` },
]
</script>
