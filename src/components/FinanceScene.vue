<template>
  <figure class="mb-5">
    <div ref="root" class="finance">
      <!-- Still render of the reconciled state: what phones, reduced-motion visitors and crawlers see. -->
      <img src="/images/projects/finance-operations-scene.webp" alt="Illustration of auction operations, the finance console and the ERP as three pillars, with payments and records flowing between them and both ledgers aligned" width="1280" height="800" class="finance-still" loading="lazy" decoding="async" />
      <div class="finance-canvas" aria-hidden="true"></div>
      <div class="finance-hud" aria-hidden="true">
        <div class="flex justify-between items-start gap-3">
          <p class="chip">Finance sync</p>
          <div class="flex flex-col items-end gap-3">
            <p class="chip route">Auction → Finance → ERP</p>
            <ul class="steps hidden sm:block">
              <li v-for="step in steps" :key="step.label" :data-at="step.at" class="done"><span class="tick"></span>{{ step.label }}</li>
            </ul>
          </div>
        </div>
        <p v-for="(label, i) in labels" :key="label" class="pillar-label" :style="{ left: ['19%', '50%', '81%'][i] }">{{ label }}</p>
        <div>
          <p class="label">Unmatched records</p>
          <p class="count">0</p>
        </div>
        <p class="stamp is-on">Reconciled</p>
      </div>
    </div>
    <figcaption class="text-xs text-muted mt-2 leading-relaxed">An illustration of the work: payments, refunds and settlements move from auction operations through the finance console to the ERP, so records agree without manual re-entry.</figcaption>
  </figure>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const labels = ['Auction operations', 'Finance console', 'ERP integration']
const steps = [{ label: 'Payments', at: 0.2 }, { label: 'Refunds', at: 0.38 }, { label: 'Settlement', at: 0.56 }, { label: 'ERP sync', at: 0.74 }]
const root = ref()
onMounted(() => {
  const desktop = matchMedia('(min-width: 1024px) and (pointer: fine)').matches
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!desktop || still || navigator.connection?.saveData) return
  import('../finance3d.js').then((m) => m.initFinance3D(root.value)).catch(() => {})
})
</script>

<style scoped>
.finance { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 4px; background: #EFEAE0; color: #1C1B18; }
.finance-still { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity .8s; }
.finance.is-live .finance-still { opacity: 0; }
.finance-canvas { position: absolute; inset: 0; }
.finance-canvas :deep(canvas) { width: 100%; height: 100%; display: block; }
.finance-hud { position: absolute; inset: 0; padding: clamp(14px, 3.2%, 30px); display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; }
.chip { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgb(28 27 24 / .15); border-radius: 999px; padding: 6px 12px; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; background: rgb(250 249 246 / .7); backdrop-filter: blur(4px); }
.pillar-label {
  position: absolute; top: 76%; translate: -50% 0; white-space: nowrap;
  font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 999px; background: rgb(250 249 246 / .85);
  border: 1px solid rgb(28 27 24 / .1); transition: background-color .3s, color .3s;
}
.pillar-label.active { background: #A8501F; color: #FAF9F6; border-color: #A8501F; }
.label { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #6B685F; }
.count { font-family: Newsreader, Georgia, serif; font-size: clamp(1.8rem, 4.5vw, 3.2rem); line-height: 1; font-variant-numeric: tabular-nums; }
.steps { font-size: 13px; min-width: 140px; padding: 8px 12px; border-radius: 10px; background: rgb(250 249 246 / .7); backdrop-filter: blur(4px); }
.steps li { display: flex; align-items: center; gap: 10px; padding: 3px 0; color: #6B685F; transition: color .3s; }
.steps li.done { color: #1C1B18; }
.tick { width: 16px; height: 16px; border-radius: 99px; border: 1.5px solid rgb(28 27 24 / .25); display: grid; place-items: center; transition: background-color .3s, border-color .3s; }
.steps li.done .tick { background: #3F7D4E; border-color: #3F7D4E; }
.steps li.done .tick::after { content: ''; width: 6px; height: 3px; border: solid #FAF9F6; border-width: 0 0 2px 2px; rotate: -45deg; translate: 0 -1px; }
.stamp {
  position: absolute; left: 50%; top: 46%; translate: -50% -50%; rotate: -8deg;
  border: 3px solid #3F7D4E; color: #3F7D4E; border-radius: 6px; padding: .1em .5em; background: rgb(250 249 246 / .8); backdrop-filter: blur(6px);
  font-family: Newsreader, Georgia, serif; font-size: clamp(1.3rem, 3.4vw, 2.5rem); letter-spacing: .06em; text-transform: uppercase;
  opacity: 0; scale: 1.8; transition: opacity .25s, scale .35s cubic-bezier(.2, 1.6, .4, 1);
}
.stamp.is-on { opacity: 1; scale: 1; }
@media (max-width: 639px) { .route, .pillar-label { display: none; } }
</style>
