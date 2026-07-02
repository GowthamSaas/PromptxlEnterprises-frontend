<template>
  <div class="ai-page-header">
    <div>
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script>

<style scoped>
.ai-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.ai-page-header h2 {
  margin: 0;
  color: #0f172a;
}

.ai-page-header p {
  margin: 4px 0 0;
  color: #64748b;
}
</style>
