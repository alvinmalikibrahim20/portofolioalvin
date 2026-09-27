<template>
  <a :href="profile.whatsapp" target="_blank" rel="noopener noreferrer" class="button-primary">
    {{ label }} <span aria-hidden="true">↗</span>
  </a>
</template>
<script setup>
import { profile } from '../site.config.js'
defineProps({ label: { type: String, default: "Let's work together" } })
</script>
