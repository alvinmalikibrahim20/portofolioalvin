<template>
  <section id="top" class="page-shell pt-12 sm:pt-16 lg:pt-24 pb-14 lg:pb-20" aria-labelledby="hero-title">
    <div class="grid gap-10 lg:grid-cols-[1fr_220px] lg:gap-16 items-center">
      <div>
        <p class="eyebrow mb-5 flex items-center gap-2"><span class="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>Open to freelance &amp; remote roles</p>
        <p class="text-muted mb-3">Hello, I’m Alvin Malik Ibrahim.</p>
        <h1 id="hero-title" class="font-serif text-[2.45rem] sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-[-0.025em] text-balance max-w-3xl">
          Full-stack Developer.<br />Web, mobile, and the <em class="text-accent font-normal">systems behind them.</em>
        </h1>
        <p class="mt-5 font-medium">Laravel / PHP · Vue / Nuxt · Flutter</p>
        <p class="mt-4 text-muted leading-relaxed max-w-xl">I build and maintain business applications, connect APIs, and fix the issues that slow teams down. My work includes live bidding, finance tools, and ERP integration at Tunas Auction.</p>
        <div class="mt-7 flex flex-wrap gap-3 items-center">
          <ContactCta />
          <a href="/#work" class="button-secondary">View my work <span aria-hidden="true">↓</span></a>
        </div>
        <a v-if="siteConfig.cvReady" :href="siteConfig.cvPath" download class="inline-flex items-center min-h-11 mt-3 text-sm text-link">Download CV <span class="ml-1 text-muted">(English, PDF)</span></a>
      </div>
      <figure class="flex items-center gap-5 lg:block lg:rotate-2">
        <img src="/images/alvin.webp" alt="Alvin Malik Ibrahim" width="408" height="612" fetchpriority="high" decoding="async" class="w-24 sm:w-28 lg:w-full rounded-sm object-cover aspect-[2/3]" />
        <figcaption class="lg:mt-4 text-sm text-muted leading-relaxed lg:-rotate-2">Based in Indonesia.<br />Working with teams anywhere.<br /><span class="text-foreground">GMT+7 / Jakarta time</span></figcaption>
      </figure>
    </div>
    <div class="mt-10 lg:mt-16 border-t border-line pt-5 grid gap-4 sm:grid-cols-3 text-sm">
      <p><span class="block text-foreground font-medium">Web development since 2019</span><span class="text-muted">Company websites to business applications</span></p>
      <p><span class="block text-foreground font-medium">Production web &amp; mobile</span><span class="text-muted">Flutter apps and Vue admin tools</span></p>
      <p><span class="block text-foreground font-medium">Build, integrate, maintain</span><span class="text-muted">New features and existing systems</span></p>
    </div>
  </section>
</template>

<script setup>
import { siteConfig } from '../site.config.js'
import ContactCta from './ContactCta.vue'
</script>
