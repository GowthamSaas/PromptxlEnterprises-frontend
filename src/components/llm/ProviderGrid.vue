<template>
  <div class="provider-grid">
    <ProviderCard
      v-for="provider in providers"
      :key="provider.key"
      :provider="provider"
      :loading="loading"
      @connect="$emit('connect', $event)"
      @disconnect="$emit('disconnect', $event)"
    />
  </div>
  <div v-for="provider in providers" :key="provider.key">
  {{ provider.key }}
  {{ provider.ownerConnected }}
  {{ provider.connected }}

  <ProviderCard
    :provider="provider"
    :loading="loading"
    @connect="$emit('connect', $event)"
    @disconnect="$emit('disconnect', $event)"
  />
</div>
</template>

<script setup>
import ProviderCard from './ProviderCard.vue'

defineProps({
  providers: {
    type: Array,
    default: () => []
  },

  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits([
  'connect',
  'disconnect'
])
</script>

<style scoped>
.provider-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(320px, 1fr));
  gap: 24px;
}

@media screen and (max-width: 960px) {
  .provider-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media screen and (min-width: 1440px) {
  .provider-grid {
    grid-template-columns: repeat(2, minmax(320px, 1fr));
    gap: 28px;
  }
}
</style>