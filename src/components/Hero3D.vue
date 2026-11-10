<template>
  <!-- Decorative only; desktop gets the WebGL scene, everyone else gets nothing extra. -->
  <div ref="host" class="hero-3d" aria-hidden="true"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const host = ref()
onMounted(() => {
  const desktop = matchMedia('(min-width: 1024px) and (pointer: fine)').matches
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!desktop || still || navigator.connection?.saveData) return
  import('../hero3d.js').then((m) => m.initHero3D(host.value, host.value.closest('section'))).catch(() => {})
})
</script>

<style scoped>
.hero-3d {
  position: absolute; z-index: -1; pointer-events: none;
  width: 720px; height: 540px; right: -200px; top: 10px; /* laptop sits behind the portrait, phone peeks out to its left */
  opacity: 0; transition: opacity 1.2s ease;
}
.hero-3d.is-ready { opacity: 1; }
.hero-3d :deep(canvas) { width: 100%; height: 100%; display: block; }
@media (max-width: 1023px) { .hero-3d { display: none; } }
</style>
