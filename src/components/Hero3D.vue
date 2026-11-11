<template>
  <!-- Decorative illustration of the hero copy: a laptop (web) and phone (mobile) in sync, with the systems
       behind them (API, database, ERP) appearing on scroll. Desktop gets the live WebGL scene; phones,
       reduced-motion visitors and crawlers get a still rendered from the same scene. -->
  <div ref="stage" class="hero-stage" aria-hidden="true">
    <img src="/images/hero-scene.webp" alt="" width="1200" height="900" class="hero-still" decoding="async" />
    <div ref="host" class="hero-3d">
      <span v-for="label in labels" :key="label" class="sys-label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const labels = ['API', 'Database', 'ERP']
const stage = ref(), host = ref()
onMounted(() => {
  const desktop = matchMedia('(min-width: 1024px) and (pointer: fine)').matches
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!desktop || still || navigator.connection?.saveData) return
  import('../hero3d.js')
    .then((m) => m.initHero3D(host.value, host.value.closest('section')))
    .then(() => stage.value.classList.add('is-live'))
    .catch(() => {})
})
</script>

<style scoped>
.hero-stage { position: relative; aspect-ratio: 4 / 3; }
.hero-still { width: 100%; height: 100%; object-fit: contain; transition: opacity .8s; }
.hero-3d { position: absolute; inset: -14% -24% -12% -14%; pointer-events: none; opacity: 0; transition: opacity 1.2s ease; }
.hero-stage.is-live .hero-still { opacity: 0; }
.hero-stage.is-live .hero-3d { opacity: 1; }
/* Phones show the still: give it a slow camera drift so the hero isn't frozen. */
@media (max-width: 1023px) and (prefers-reduced-motion: no-preference) {
  .hero-still { animation: drift 9s ease-in-out infinite alternate; }
}
@keyframes drift { from { transform: scale(1) translate(0, 0); } to { transform: scale(1.05) translate(-1.5%, -1%); } }
.hero-3d :deep(canvas) { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.sys-label {
  position: absolute; z-index: 1; translate: -50% -140%; opacity: 0; white-space: nowrap;
  font-size: 11px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 999px; background: rgb(250 249 246 / .9); border: 1px solid rgb(28 27 24 / .12);
}
</style>
