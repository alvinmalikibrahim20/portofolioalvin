<template>
  <figure class="mb-5">
    <div ref="root" class="robotics">
      <!-- Still render: what phones, reduced-motion visitors and crawlers see. -->
      <img src="/images/projects/racer-robot-scene.webp" alt="Illustration of a small line-follower robot on a circuit-board track, sending data to a cloud" width="1280" height="800" class="robotics-still" loading="lazy" decoding="async" />
      <div class="robotics-canvas" aria-hidden="true"></div>
      <div class="robotics-hud" aria-hidden="true">
        <div class="flex justify-between items-start gap-3">
          <p class="chip">R&amp;D lab</p>
          <div class="flex flex-col items-end gap-3">
            <p class="chip route">Sense → Cloud → Model</p>
            <ul class="steps hidden sm:block">
              <li v-for="step in steps" :key="step.label" :data-at="step.at" class="done"><span class="tick"></span>{{ step.label }}</li>
            </ul>
          </div>
        </div>
        <div>
          <p class="label">Sensor readings</p>
          <p class="count">1,248</p>
        </div>
        <p class="stamp is-on">Model ready</p>
      </div>
    </div>
    <figcaption class="text-xs text-muted mt-2 leading-relaxed">An illustration of the robotics side of this role: teaching, and R&amp;D prototypes in IoT and machine learning.</figcaption>
  </figure>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const steps = [{ label: 'Sense', at: 0.1 }, { label: 'Send to cloud', at: 0.3 }, { label: 'Train model', at: 0.58 }, { label: 'Act', at: 0.8 }]
const root = ref()
onMounted(() => {
  const desktop = matchMedia('(min-width: 1024px) and (pointer: fine)').matches
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (still) return
  // Phones and data-saver: no WebGL, but the HUD still plays the scene's story when it scrolls into view.
  if (!desktop || navigator.connection?.saveData) return void import('../scene-hud.js').then((m) => m.playHud(root.value, 'robotics')).catch(() => {})
  import('../scene-pin.js')
    .then(({ pinScene }) => { const pin = pinScene(root.value, 1000); return import('../robotics3d.js').then((m) => m.initRobotics3D(root.value, pin)) })
    .catch(() => {})
})
</script>

<style scoped>
.robotics { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 4px; background: #1A1E1B; color: #FAF9F6; }
.robotics-still { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity .8s; }
.robotics.is-live .robotics-still { opacity: 0; }
.robotics-canvas { position: absolute; inset: 0; }
.robotics-canvas :deep(canvas) { width: 100%; height: 100%; display: block; }
.robotics-hud { position: absolute; inset: 0; padding: clamp(14px, 3.2%, 30px); display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; }
.chip { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgb(250 249 246 / .2); border-radius: 999px; padding: 6px 12px; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; background: rgb(26 30 27 / .55); backdrop-filter: blur(4px); }
.label { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: rgb(250 249 246 / .6); }
.count { font-family: Newsreader, Georgia, serif; font-size: clamp(1.8rem, 4.5vw, 3.2rem); line-height: 1; font-variant-numeric: tabular-nums; }
.steps { font-size: 13px; min-width: 150px; padding: 8px 12px; border-radius: 10px; background: rgb(26 30 27 / .6); backdrop-filter: blur(4px); }
.steps li { display: flex; align-items: center; gap: 10px; padding: 3px 0; color: rgb(250 249 246 / .5); transition: color .3s; }
.steps li.done { color: #FAF9F6; }
.tick { width: 16px; height: 16px; border-radius: 99px; border: 1.5px solid rgb(250 249 246 / .3); display: grid; place-items: center; transition: background-color .3s, border-color .3s; }
.steps li.done .tick { background: #E0703A; border-color: #E0703A; }
.steps li.done .tick::after { content: ''; width: 6px; height: 3px; border: solid #1A1E1B; border-width: 0 0 2px 2px; rotate: -45deg; translate: 0 -1px; }
.stamp {
  position: absolute; left: 50%; top: 46%; translate: -50% -50%; rotate: -8deg; white-space: nowrap;
  border: 3px solid #E0703A; color: #E0703A; border-radius: 6px; padding: .1em .5em; background: rgb(26 30 27 / .75); backdrop-filter: blur(6px);
  font-family: Newsreader, Georgia, serif; font-size: clamp(1.3rem, 3.4vw, 2.5rem); letter-spacing: .06em; text-transform: uppercase;
  opacity: 0; scale: 1.8; transition: opacity .25s, scale .35s cubic-bezier(.2, 1.6, .4, 1);
}
.stamp.is-on { opacity: 1; scale: 1; }
@media (max-width: 639px) { .route { display: none; } }
</style>
