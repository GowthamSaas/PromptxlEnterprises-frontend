<template>
  <Tag :severity="connected ? 'success' : 'warning'" :value="connected ? 'Connected' : 'Pending'" />
</template>

<script setup>
import Tag from 'primevue/tag'

defineProps({ connected: Boolean })
</script>
