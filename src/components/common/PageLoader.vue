<template>
  <div class="page-loader">
    <ProgressSpinner />
    <p>Loading workspace...</p>
  </div>
</template>

<script setup>
import ProgressSpinner from 'primevue/progressspinner'
</script>

<style scoped>
.page-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  gap: 12px;
  color: #64748b;
}
</style>
