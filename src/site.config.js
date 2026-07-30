/*
 * ============================================================
 *  PUSAT KONTROL WEBSITE — Alvin Malik
 * ============================================================
 *
 *  CARA PAKAI:
 *  Ubah `false` menjadi `true` HANYA setelah data aslinya
 *  sudah Anda siapkan. Selama masih `false`, bagian tersebut
 *  otomatis TIDAK TAMPIL — jadi tidak ada placeholder yang
 *  terlihat oleh klien atau recruiter.
 *
 *  Aturan tambahan yang berjalan otomatis:
 *  Teks apa pun yang masih diapit tanda [ ] dianggap
 *  placeholder dan akan disembunyikan sendiri.
 */

export const siteConfig = {
  /*
   * CV / Resume
   * ------------------------------------------------------------
   * Sekarang file public/cv/alvin-malik-cv.pdf masih PLACEHOLDER.
   * Langkah: timpa file itu dengan CV asli Anda (nama file sama),
   * lalu ubah nilai di bawah menjadi true.
   */
  cvReady: false,

  /*
   * Riwayat kerja (section "Experience")
   * ------------------------------------------------------------
   * Isi data asli di src/components/WorkExperienceSection.vue
   * (nama perusahaan, jabatan, periode, pencapaian),
   * lalu ubah menjadi true.
   */
  workExperienceReady: false,

  /*
   * Testimoni (section "Kind words")
   * ------------------------------------------------------------
   * Minta 1-2 testimoni asli dari atasan / klien / rekan kerja.
   * Isi di src/components/TestimonialsSection.vue,
   * lalu ubah menjadi true.
   */
  testimonialsReady: false,

  /*
   * Gambar proyek
   * ------------------------------------------------------------
   * PENTING: gambar di public/images/projects/ saat ini masih
   * MOCKUP ILUSTRASI, bukan tangkapan layar aplikasi Anda.
   * Klien berpengalaman bisa mengenalinya dan itu merusak
   * kepercayaan — jadi untuk sekarang gambar disembunyikan.
   *
   * Langkah: timpa file-file di public/images/projects/ dengan
   * SCREENSHOT ASLI aplikasi Anda, lalu ubah menjadi true.
   */
  projectImagesReady: false,
}

/*
 * Helper: mendeteksi teks placeholder seperti "[Nama perusahaan]".
 * Dipakai komponen untuk menyembunyikan teks yang belum diisi.
 */
export const isPlaceholder = (value) =>
  typeof value !== 'string' || (value.includes('[') && value.includes(']'))

/* Mengembalikan teks hanya jika sudah diisi asli, selain itu null. */
export const realText = (value) => (isPlaceholder(value) ? null : value)
