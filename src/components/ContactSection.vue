<template>
  <section id="contact" class="section-shell" aria-labelledby="contact-title">
    <div class="section-grid">
      <h2 id="contact-title" class="eyebrow lg:col-span-3">Let’s work together</h2>
      <div class="lg:col-span-9">
        <p class="font-serif text-3xl sm:text-4xl leading-tight max-w-2xl">Have a project in mind,<br />or a system that needs fixing?</p>
        <p class="mt-4 text-muted max-w-xl">Tell me what you need, the current stack, and your timeline. Hiring for a developer role? Send the role details and how your team works.</p>
        <div class="flex flex-wrap gap-3 mt-6">
          <ContactCta label="Message me on WhatsApp" />
          <a :href="'mailto:' + profile.email" class="button-secondary">Email Alvin <span aria-hidden="true">↗</span></a>
        </div>
        <a :href="'mailto:' + profile.email" class="inline-flex min-h-11 items-center text-sm text-muted text-link break-all mt-2">{{ profile.email }}</a>
        <div class="mt-9 pt-7 border-t border-line">
          <h3 class="font-medium mb-5">A straightforward start</h3>
          <ol class="grid sm:grid-cols-3 gap-6">
            <li v-for="(step, index) in steps" :key="step.title"><span class="text-xs text-accent">0{{ index + 1 }}</span><h4 class="text-sm font-medium mt-2 mb-1">{{ step.title }}</h4><p class="text-sm text-muted leading-relaxed">{{ step.text }}</p></li>
          </ol>
        </div>
        <div class="mt-9 space-y-1">
          <details v-for="item in faq" :key="item.question" class="border-b border-line py-1">
            <summary class="cursor-pointer min-h-12 py-3 text-sm font-medium flex justify-between gap-3">{{ item.question }}<span aria-hidden="true">+</span></summary>
            <p class="text-sm text-muted leading-relaxed pb-4 max-w-2xl">{{ item.answer }}</p>
          </details>
        </div>
        <div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="text-link min-h-11 inline-flex items-center">LinkedIn ↗</a>
          <a :href="profile.github" target="_blank" rel="noopener noreferrer" class="text-link min-h-11 inline-flex items-center">GitHub ↗</a>
          <a v-if="siteConfig.cvReady" :href="siteConfig.cvPath" download class="text-link min-h-11 inline-flex items-center">Download CV (English)</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { profile, siteConfig } from '../site.config.js'
import ContactCta from './ContactCta.vue'
const steps = [
  { title: 'Share the context', text: 'Your goal, existing application, and the problem you need to solve.' },
  { title: 'Agree on the work', text: 'Discuss scope, priorities, schedule, and how we’ll communicate.' },
  { title: 'Build & review', text: 'Work through agreed milestones, review the result, and plan the handover.' },
]
const faq = [
  { question: 'Where are you based?', answer: 'I’m based in Indonesia (GMT+7 / Jakarta time). Share your team’s timezone so we can discuss a practical overlap.' },
  { question: 'Can you work on an existing application?', answer: 'Yes. Bug fixing, API integration, maintenance, and incremental improvements are part of the work I offer. A description of the current setup helps me assess the scope.' },
  { question: 'How do we decide on cost and availability?', answer: 'Send the scope and desired timeline. We can discuss an estimate, a start date, and whether project work or ongoing support fits best.' },
  { question: 'Can I see the private company projects?', answer: 'The case studies explain my role and the work without exposing internal data. We can discuss relevant experience; access to private systems and materials remains subject to company permission.' },
]
</script>
