<template>
  <section v-if="quotes.length" id="testimonials" class="section-shell" aria-labelledby="testimonials-title">
    <div class="section-grid">
      <h2 id="testimonials-title" class="eyebrow lg:col-span-3">Working together</h2>
      <div class="lg:col-span-9 grid sm:grid-cols-2 gap-8">
        <figure v-for="quote in quotes" :key="quote.name">
          <blockquote class="font-serif text-xl leading-relaxed">“{{ quote.quote }}”</blockquote>
          <figcaption class="text-sm mt-4">{{ quote.name }}<span class="block text-muted">{{ quote.role }}</span></figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
<script setup>
import { approvedTestimonials } from '../site.config.js'
const quotes = approvedTestimonials()
</script>
