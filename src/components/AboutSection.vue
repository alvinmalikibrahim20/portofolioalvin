<template>
  <section id="about" class="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28 border-t border-line">
    <div class="grid md:grid-cols-12 gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">About</p>
      </div>

      <div class="md:col-span-6 reveal">
        <div class="space-y-5 text-[15px] leading-relaxed">
          <p>
            I&apos;ve been building software for a couple of years now, mostly for
            companies in the automotive space. My day-to-day is split between
            frontend work in Vue and Nuxt, mobile development with Flutter,
            and Laravel on the backend.
          </p>
          <p>
            What I enjoy most is the unglamorous part: making things fast,
            stable, and easy to maintain. I do a fair amount of QA testing and
            technical SEO too, because shipping something that breaks or that
            nobody can find defeats the point.
          </p>
          <p>
            When I&apos;m not writing code, I&apos;m usually reading about how other
            people write theirs.
          </p>
        </div>
      </div>

      <div class="md:col-span-3 reveal">
        <img
          v-if="!showFallback"
          src="/images/alvin.png"
          alt="Portrait of Alvin Malik"
          class="w-40 md:w-full max-w-[13rem] rounded-sm grayscale object-cover aspect-square"
          @error="showFallback = true"
        />
        <p class="mt-3 text-xs text-muted">Jakarta, Indonesia</p>
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
