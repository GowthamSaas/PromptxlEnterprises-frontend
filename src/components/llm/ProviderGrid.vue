<template>
  <div class="provider-grid">
    <ProviderCard v-for="provider in providers" :key="provider.key" :provider="provider" @connect="$emit('connect', $event)" />
  </div>
</template>

<script setup>
import ProviderCard from './ProviderCard.vue'

defineProps({ providers: Array })
defineEmits(['connect'])
</script>

<style scoped>
.provider-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
</style>
