<template>
  <Card class="provider-card">
    <template #title>
      <div class="card-title">
        <i :class="icon"></i>
        <span>{{ provider.name }}</span>
      </div>
    </template>
    <template #content>
      <p>{{ provider.description }}</p>
      <div class="card-actions">
        <Button label="Connect" size="small" @click="$emit('connect', provider.key)" />
        <ProviderStatus :connected="provider.connected" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProviderStatus from './ProviderStatus.vue'

defineProps({ provider: Object })
defineEmits(['connect'])
</script>

<style scoped>
.provider-card {
  height: 100%;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
</style>
