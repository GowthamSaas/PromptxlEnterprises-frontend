<template>
  <div class="connector-status">
    <Tag :severity="connected ? 'success' : 'warning'" :value="connected ? 'Connected' : 'Pending'" />
  </div>
</template>

<script setup>
import Tag from 'primevue/tag'

defineProps({ connected: Boolean })
</script>
