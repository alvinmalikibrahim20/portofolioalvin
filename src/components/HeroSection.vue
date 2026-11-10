<template>
  <section id="top" class="page-shell relative isolate pt-10 sm:pt-14 lg:pt-20 pb-14 lg:pb-20" aria-labelledby="hero-title">
    <div class="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-6 items-center">
      <div>
        <p class="eyebrow mb-5 flex items-center gap-2"><span class="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>Open to freelance &amp; remote roles</p>
        <div class="flex items-center gap-3 mb-4">
          <img src="/images/alvin.webp" alt="Alvin Malik Ibrahim" width="408" height="612" fetchpriority="high" decoding="async" class="h-14 w-14 shrink-0 rounded-full object-cover object-[50%_18%] ring-2 ring-background shadow-md" />
          <p class="text-muted leading-snug">Hello, I’m Alvin Malik Ibrahim.<br /><span class="text-sm">Based in Indonesia · GMT+7 · working with teams anywhere</span></p>
        </div>
        <h1 id="hero-title" class="font-serif text-[2.45rem] sm:text-5xl lg:text-[3.3rem] leading-[1.08] tracking-[-0.025em] text-balance max-w-3xl">
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
      <Hero3D />
    </div>
    <div class="mt-10 lg:mt-14 border-t border-line pt-5 grid gap-4 sm:grid-cols-3 text-sm">
      <p><span class="block text-foreground font-medium">Web development since 2019</span><span class="text-muted">Company websites to business applications</span></p>
      <p><span class="block text-foreground font-medium">Production web &amp; mobile</span><span class="text-muted">Flutter apps and Vue admin tools</span></p>
      <p><span class="block text-foreground font-medium">Build, integrate, maintain</span><span class="text-muted">New features and existing systems</span></p>
    </div>
  </section>
</template>

<script setup>
import { siteConfig } from '../site.config.js'
import ContactCta from './ContactCta.vue'
import Hero3D from './Hero3D.vue'
</script>
