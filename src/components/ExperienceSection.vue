<template>
  <section id="services" class="section-shell" aria-labelledby="services-title">
    <div class="section-grid">
      <h2 id="services-title" class="eyebrow lg:col-span-3">Development services</h2>
      <div class="lg:col-span-9">
        <p class="font-serif text-2xl sm:text-3xl mb-7">A new application, a missing integration,<br class="hidden sm:block" /> or something that needs fixing.</p>
        <ul class="grid sm:grid-cols-2 gap-x-8">
          <li v-for="service in services" :key="service.title" class="reveal py-6 border-t border-line">
            <h3 class="font-medium mb-2">{{ service.title }}</h3>
            <p class="text-muted text-sm leading-relaxed">{{ service.description }}</p>
          </li>
        </ul>
        <div class="mt-8 pt-7 border-t border-line">
          <h3 class="font-serif text-2xl">Ways to work together</h3>
          <div class="grid sm:grid-cols-3 gap-6 mt-5">
            <div v-for="model in models" :key="model.title"><h4 class="font-medium text-sm mb-2">{{ model.title }}</h4><p class="text-sm text-muted leading-relaxed">{{ model.description }}</p></div>
          </div>
          <p class="text-sm text-muted mt-5">Scope, schedule, and budget are agreed before work starts.</p>
          <div class="mt-7 flex flex-wrap items-center gap-5"><ContactCta label="Talk through your needs" /><a href="/#contact" class="text-link text-sm min-h-11 inline-flex items-center">Hiring for a role? Get in touch</a></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import ContactCta from './ContactCta.vue'
const services = [
  { title: 'Full-stack web development', description: 'Laravel/PHP applications with Vue or Nuxt interfaces, database-backed workflows, and tools your team can use every day.' },
  { title: 'API development & integration', description: 'REST APIs and connections between applications, business tools, and ERP systems. Bring the data flow you need to connect.' },
  { title: 'Flutter applications', description: 'Web and mobile interfaces from a shared codebase, including account flows and real-time features.' },
  { title: 'WordPress development', description: 'Business websites, content updates, and improvements to existing WordPress sites.' },
  { title: 'Bug fixing & maintenance', description: 'Investigate broken workflows, fix defects, and maintain existing applications as business needs change.' },
  { title: 'Existing application improvement', description: 'Add features, improve responsive layouts, or untangle integrations without replacing the whole application.' },
]
const models = [
  { title: 'A defined project', description: 'A new application, integration, or feature with an agreed scope and milestones.' },
  { title: 'Ongoing support', description: 'Maintenance, bug fixing, and incremental improvements to an existing system.' },
  { title: 'A role on your team', description: 'Full-stack and Software Engineer opportunities, including remote teams.' },
]
</script>
