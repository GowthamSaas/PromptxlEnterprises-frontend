<template>
  <Tag
    :severity="connected ? 'success' : 'secondary'"
    :value="connected ? 'Connected' : 'Not Connected'"
  />
</template>

<script setup>
import Tag from 'primevue/tag'

defineProps({
  connected: {
    type: Boolean,
    default: false
  }
})
</script>
