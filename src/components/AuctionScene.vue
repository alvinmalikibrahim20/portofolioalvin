<template>
  <figure class="mb-5">
    <div ref="root" class="auction">
      <!-- Still render of the final moment: what phones, reduced-motion visitors and crawlers see. -->
      <img src="/images/projects/tunas-auction-scene.webp" alt="Illustration of a live vehicle auction: a car on a turntable, bid paddles raised and the gavel down" width="1280" height="800" class="auction-still" loading="lazy" decoding="async" />
      <div class="auction-canvas" aria-hidden="true"></div>
      <div class="auction-hud" aria-hidden="true">
        <div class="flex justify-between items-start gap-3">
          <p class="chip"><span class="dot"></span>Live auction</p>
          <p class="chip lot">Lot 027 · Passenger car</p>
        </div>
        <div class="flex justify-between items-end gap-4">
          <div>
            <p class="label">Current bid</p>
            <p class="price">Rp 135.000.000</p>
          </div>
          <ul class="history hidden sm:block">
            <li><span>Web</span>Rp 135.000.000</li>
            <li><span>iOS</span>Rp 131.000.000</li>
            <li><span>Android</span>Rp 128.500.000</li>
          </ul>
        </div>
        <p class="stamp is-on">Sold</p>
      </div>
    </div>
    <figcaption class="text-xs text-muted mt-2 leading-relaxed">An illustration of the live-bidding flow: one auction, bids arriving from web, Android and iOS. Real product screens are in the case study.</figcaption>
  </figure>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const root = ref()
onMounted(() => {
  const desktop = matchMedia('(min-width: 1024px) and (pointer: fine)').matches
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (still) return
  // Phones and data-saver: no WebGL, but the HUD still plays the scene's story when it scrolls into view.
  if (!desktop || navigator.connection?.saveData) return void import('../scene-hud.js').then((m) => m.playHud(root.value, 'auction')).catch(() => {})
  import('../scene-pin.js')
    .then(({ pinScene }) => { const pin = pinScene(root.value, 1100); return import('../auction3d.js').then((m) => m.initAuction3D(root.value, pin)) })
    .catch(() => {})
})
</script>

<style scoped>
.auction { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 4px; background: #1C1B18; color: #FAF9F6; }
.auction-still { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity .8s; }
.auction.is-live .auction-still { opacity: 0; }
.auction-canvas { position: absolute; inset: 0; }
.auction-canvas :deep(canvas) { width: 100%; height: 100%; display: block; }
.auction-hud { position: absolute; inset: 0; padding: clamp(14px, 3.2%, 30px); display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; }
.chip { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgb(250 249 246 / .2); border-radius: 999px; padding: 6px 12px; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; background: rgb(28 27 24 / .5); backdrop-filter: blur(4px); }
.dot { width: 7px; height: 7px; border-radius: 99px; background: #E0703A; animation: live 1.2s ease-in-out infinite; }
@keyframes live { 50% { opacity: .25; } }
.label { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: rgb(250 249 246 / .6); }
.price { font-family: Newsreader, Georgia, serif; font-size: clamp(1.6rem, 4vw, 2.9rem); line-height: 1.1; font-variant-numeric: tabular-nums; }
.price.bump { animation: bump .5s ease; }
@keyframes bump { 30% { color: #E0703A; transform: translateY(-3px); } }
.history { font-size: 13px; text-align: right; min-width: 210px; }
.history :deep(li) { display: flex; justify-content: space-between; gap: 16px; padding: 4px 0; border-top: 1px solid rgb(250 249 246 / .12); color: rgb(250 249 246 / .75); font-variant-numeric: tabular-nums; }
.history :deep(li:first-child) { color: #FAF9F6; }
.history :deep(span) { color: #E0703A; }
.stamp {
  position: absolute; left: 50%; top: 42%; translate: -50% -50%; rotate: -12deg;
  border: 3px solid #E0703A; color: #E0703A; border-radius: 6px; padding: .1em .5em;
  background: rgb(28 27 24 / .72); backdrop-filter: blur(6px);
  font-family: Newsreader, Georgia, serif; font-size: clamp(2rem, 7vw, 5rem); letter-spacing: .08em; text-transform: uppercase;
  opacity: 0; scale: 1.8; transition: opacity .25s, scale .35s cubic-bezier(.2, 1.6, .4, 1);
}
.stamp.is-on { opacity: 1; scale: 1; }
@media (prefers-reduced-motion: reduce) { .dot { animation: none; } }
@media (max-width: 639px) { .lot { display: none; } }
</style>
