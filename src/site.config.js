/*
 * ============================================================
 *  PUSAT KONTROL WEBSITE — Alvin Malik Ibrahim
 * ============================================================
 *
 *  Semua data di file ini sudah ASLI, diambil dari CV Anda dan
 *  dari hasil pemeriksaan langsung ke tunasauction.com.
 *
 *  Sakelar di bawah menyembunyikan otomatis bagian yang datanya
 *  belum siap, supaya tidak ada placeholder yang terlihat.
 */

export const siteConfig = {
  /* CV asli sudah terpasang di public/cv/ */
  cvReady: true,
  cvPath: '/cv/alvin-malik-ibrahim-cv.pdf',

  /* Riwayat kerja sudah diisi dari CV */
  workExperienceReady: true,

  /* Screenshot asli tunasauction.com sudah terpasang */
  projectImagesReady: true,

  /*
   * Testimoni — masih belum ada.
   * Minta 1-2 kutipan dari atasan di PT Tunas Rent atau rekan
   * kerja, isi di TestimonialsSection.vue, lalu ubah ke true.
   */
  testimonialsReady: false,
}

/* Identitas & kontak — dari CV */
export const profile = {
  name: 'Alvin Malik Ibrahim',
  role: 'Web & Mobile Developer',
  focus: 'Vehicle auction & dealer systems',
  location: 'Tangerang Selatan, Indonesia',
  email: 'alvinmalikibrahim20@gmail.com',
  phone: '+62 896 3052 3408',
  phoneHref: 'tel:+6289630523408',
  whatsapp: 'https://wa.me/6289630523408',
  linkedin: 'https://linkedin.com/in/alvin-malik-ibrahim',
  github: 'https://github.com/alvinmalik30',
}

/*
 * Helper: mendeteksi teks placeholder seperti "[Nama perusahaan]".
 * Dipakai komponen untuk menyembunyikan teks yang belum diisi.
 */
export const isPlaceholder = (value) =>
  typeof value !== 'string' || (value.includes('[') && value.includes(']'))

/* Mengembalikan teks hanya jika sudah diisi asli, selain itu null. */
export const realText = (value) => (isPlaceholder(value) ? null : value)
