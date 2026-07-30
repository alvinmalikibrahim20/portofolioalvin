<template>
  <section id="about" class="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28 border-t border-line">
    <div class="grid md:grid-cols-12 gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">About</p>
      </div>

      <div class="md:col-span-6 reveal">
        <div class="space-y-5 text-[15px] leading-relaxed">
          <p>
            I&apos;ve spent the last few years on one hard problem: a vehicle
            auction business where real money moves every day. Live bids that
            must never double-count, deposits and refunds that have to
            reconcile, and a finance team that needs the numbers to match the
            ERP exactly — not approximately.
          </p>
          <p>
            That work has taken me across the whole stack. Flutter for the
            buyer-facing app, now running web and mobile from one codebase. Vue
            for the admin console the finance and operations teams live in. And
            a set of sync pipelines into the company ERP, which taught me more
            about failure handling than any tutorial did.
          </p>
          <p>
            Before this I built websites and ran SEO at a robotics company, and
            spent four years organising international robotics competitions and
            training teachers. It made me comfortable explaining technical
            things to people who don&apos;t want the technical version.
          </p>
          <p>
            I&apos;m open to freelance work and full-time roles, especially where
            the domain is messy and the details matter.
          </p>
        </div>
      </div>

      <div class="md:col-span-3 reveal">
        <img
          v-if="!showFallback"
          src="/images/alvin.png"
          alt="Portrait of Alvin Malik Ibrahim"
          class="w-40 md:w-full max-w-[13rem] rounded-sm grayscale object-cover object-top aspect-[3/4]"
          @error="showFallback = true"
        />
        <p class="mt-3 text-xs text-muted">Tangerang Selatan, Indonesia</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showFallback = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#about .reveal').forEach((el) => observer.observe(el))
})
</script>
