<template>
  <section id="experience" class="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28 border-t border-line">
    <div class="grid md:grid-cols-12 gap-10">
      <div class="md:col-span-3">
        <p class="eyebrow reveal">Experience</p>
      </div>

      <div class="md:col-span-9">
        <ul>
          <li
            v-for="(job, i) in jobs"
            :key="job.company + job.period"
            class="reveal py-6 first:pt-0 grid sm:grid-cols-12 gap-2 sm:gap-6"
            :class="{ 'border-b border-line': i !== jobs.length - 1 }"
          >
            <div class="sm:col-span-4">
              <h3 class="font-serif text-lg">{{ job.role }}</h3>
              <p class="text-sm text-muted mt-1">{{ job.company }}</p>
              <p class="text-sm text-muted">{{ job.period }}</p>
            </div>
            <div class="sm:col-span-8">
              <ul class="space-y-2 text-[15px] leading-relaxed text-muted list-disc pl-4 marker:text-line">
                <li v-for="point in job.highlights" :key="point">{{ point }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

/*
 * TODO(Alvin): Ganti data di bawah dengan riwayat kerja Anda yang sebenarnya.
 * - company: nama perusahaan asli
 * - role: jabatan Anda
 * - period: contoh "Mar 2023 — Present"
 * - highlights: 2-3 poin pencapaian, sebisa mungkin dengan angka
 *   (contoh: "Memangkas waktu inspeksi lapangan 40% dengan aplikasi offline-first")
 */
const jobs = [
  {
    role: 'Fullstack Developer',
    company: '[Nama perusahaan — ganti dengan yang asli]',
    period: '2024 — Present',
    highlights: [
      '[Pencapaian 1 — contoh: Membangun platform lelang kendaraan real-time yang dipakai N dealer setiap hari]',
      '[Pencapaian 2 — contoh: Mengurangi waktu muat halaman utama dari Xs menjadi Ys]',
    ],
  },
  {
    role: 'Mobile Developer',
    company: '[Nama perusahaan — ganti dengan yang asli]',
    period: '2023 — 2024',
    highlights: [
      '[Pencapaian 1 — contoh: Merilis aplikasi Flutter ke Play Store & App Store dengan rating X]',
      '[Pencapaian 2 — contoh: Mengimplementasikan mode offline yang dipakai tim lapangan di N kota]',
    ],
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#experience .reveal').forEach((el) => observer.observe(el))
})
</script>
