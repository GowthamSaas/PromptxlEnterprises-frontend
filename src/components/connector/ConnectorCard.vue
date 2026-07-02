<template>
  <Card class="connector-card">
    <template #title>
      <div class="card-title">
        <i :class="icon"></i>
        <span>{{ title }}</span>
      </div>
    </template>
    <template #content>
      <p>{{ description }}</p>
      <Button label="Connect" size="small" @click="$emit('connect')" />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

defineProps({
  title: String,
  description: String,
  icon: String
})

defineEmits(['connect'])
</script>

<style scoped>
.connector-card {
  height: 100%;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
