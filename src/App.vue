<template>
  <div class="min-h-screen transition-colors duration-300"
    :class="isDark ? 'bg-[#05050a] text-white' : 'bg-slate-50 text-slate-900'"
  >
    <Home :is-dark="isDark" @toggle-dark="toggleDark" />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import Home from './pages/Home.vue'

const isDark = ref(true)

const toggleDark = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved ? saved === 'dark' : true
  document.documentElement.classList.toggle('dark', isDark.value)
})

provide('isDark', isDark)
provide('toggleDark', toggleDark)
</script>
