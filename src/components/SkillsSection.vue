<template>
  <section id="skills" class="section-shell" aria-labelledby="skills-title">
    <div class="section-grid">
      <h2 id="skills-title" class="eyebrow lg:col-span-3">Skills &amp; stack</h2>
      <div class="lg:col-span-9">
        <p class="font-serif text-2xl sm:text-3xl mb-7">The stack I can help you with.</p>
        <dl class="grid sm:grid-cols-2 gap-x-8 gap-y-6">
          <div v-for="group in primary" :key="group.name">
            <dt class="font-medium text-sm mb-3">{{ group.name }}</dt>
            <dd class="flex flex-wrap gap-2"><span v-for="item in group.items" :key="item" class="tag !text-foreground">{{ item }}</span></dd>
          </div>
        </dl>
        <div class="mt-9 pt-6 border-t border-line">
          <h3 class="text-sm font-medium mb-3">Also used in production &amp; supporting work</h3>
          <ul class="flex flex-wrap gap-2"><li v-for="item in supporting" :key="item" class="tag">{{ item }}</li></ul>
          <a href="/#work" class="text-sm text-link inline-flex min-h-11 items-center mt-3">See the technologies in context →</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const primary = [
  { name: 'Backend & APIs', items: ['Laravel', 'PHP', 'REST API', 'API integration'] },
  { name: 'Frontend', items: ['Vue.js', 'Nuxt.js', 'JavaScript', 'Tailwind CSS'] },
  { name: 'Mobile', items: ['Flutter', 'Dart'] },
  { name: 'Databases', items: ['MySQL', 'SQL', 'PostgreSQL', 'SQL Server'] },
  { name: 'CMS & website maintenance', items: ['WordPress', 'Bug fixing', 'Application maintenance'] },
]
const supporting = ['WebSocket', 'OAuth', 'Microsoft SSO', 'ERP integration', 'Odoo', 'Go', 'Git', 'Katalon', 'Technical SEO', 'Google Analytics']
</script>
