<template>
  <section
    v-if="siteConfig.testimonialsReady"
    id="testimonials"
    class="max-w-content mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-28 border-t border-line"
  >
    <div class="grid md:grid-cols-12 gap-8 md:gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">Kind words</p>
      </div>

      <div class="md:col-span-9">
        <div class="grid sm:grid-cols-2 gap-10">
          <figure
            v-for="t in testimonials"
            :key="t.name"
            class="reveal"
          >
            <blockquote class="font-serif text-lg leading-relaxed text-pretty">
              &ldquo;{{ t.quote }}&rdquo;
            </blockquote>
            <figcaption class="mt-4 text-sm">
              <span class="block">{{ t.name }}</span>
              <span class="block text-muted">{{ t.role }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { siteConfig } from '../site.config.js'

/*
 * Section ini SENGAJA disembunyikan sampai ada testimoni asli.
 * Setelah diisi, buka src/site.config.js dan ubah
 * `testimonialsReady` menjadi true.
 *
 * TODO(Alvin): Ganti dengan testimoni ASLI.
 * Minta 1-2 kalimat dari mantan atasan, rekan kerja, atau klien —
 * lewat LinkedIn recommendation atau chat langsung.
 * Jangan biarkan placeholder ini tampil di versi publik;
 * jika belum ada testimoni, sembunyikan section ini sementara
 * dengan menghapus <TestimonialsSection /> di src/pages/Home.vue.
 */
const testimonials = [
  {
    quote:
      '[Placeholder — contoh: Alvin mengerjakan platform lelang kami dari nol dan hasilnya dipakai tim operasional setiap hari tanpa masalah berarti.]',
    name: '[Nama pemberi testimoni]',
    role: '[Jabatan, Perusahaan]',
  },
  {
    quote:
      '[Placeholder — contoh: Komunikatif, tepat waktu, dan kodenya rapi. Kami tidak perlu memikirkan detail teknis sama sekali.]',
    name: '[Nama pemberi testimoni]',
    role: '[Jabatan, Perusahaan]',
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#testimonials .reveal').forEach((el) => observer.observe(el))
})
</script>
