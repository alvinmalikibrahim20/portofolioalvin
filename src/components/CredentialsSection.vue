<template>
  <section
    id="credentials"
    class="max-w-content mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-28 border-t border-line"
  >
    <div class="grid md:grid-cols-12 gap-8 md:gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">Education &amp; certificates</p>
      </div>

      <div class="md:col-span-9 grid sm:grid-cols-2 gap-10 sm:gap-8 md:gap-10">
        <div>
          <h3 class="reveal font-serif text-lg mb-5">Education</h3>
          <ul class="space-y-5">
            <li v-for="item in education" :key="item.school" class="reveal">
              <p class="text-[15px]">{{ item.program }}</p>
              <p class="text-sm text-muted mt-0.5">{{ item.school }}</p>
              <p class="text-sm text-muted">{{ item.period }}</p>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="reveal font-serif text-lg mb-5">Certificates</h3>
          <ul class="space-y-5">
            <li v-for="item in certificates" :key="item.name" class="reveal">
              <p class="text-[15px]">{{ item.name }}</p>
              <p class="text-sm text-muted mt-0.5">{{ item.issuer }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

/* Data asli dari CV. */
const education = [
  {
    program: 'Informatics Engineering, Bachelor',
    school: 'Universitas Pamulang',
    period: '2020 — 2024',
  },
  {
    program: 'Computer & Network Engineering',
    school: 'SMK Negeri 6 Tangerang Selatan',
    period: '2016 — 2019',
  },
]

const certificates = [
  { name: 'Backend Developer (Go)', issuer: 'Enigma Camp' },
  { name: 'Network Administrator', issuer: 'Lembaga Sertifikasi UNPAM' },
  { name: 'Master Trainer Robotics', issuer: 'IYRA Indonesia' },
  { name: 'TOEFL — score 427', issuer: 'Lembaga Bahasa UNPAM' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#credentials .reveal').forEach((el) => observer.observe(el))
})
</script>
