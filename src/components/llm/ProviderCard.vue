<template>
  <component
    :is="cardComponent"
    :provider="provider"
    :loading="loading"
    @connect="$emit('connect', $event)"
    @disconnect="$emit('disconnect', $event)"
  />
</template>

<script setup>
import { computed } from 'vue'

import OpenAICard from './OpenAICard.vue'
import ClaudeCard from './ClaudeCard.vue'
import GeminiCard from './GeminiCard.vue'
import MinimaxCard from './MinimaxCard.vue'

const props = defineProps({
  provider: { type: Object, required: true },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['connect', 'disconnect'])

const cardComponent = computed(() => {
  if (props.provider.key === 'openai') return OpenAICard
  if (props.provider.key === 'claude') return ClaudeCard
  if (props.provider.key === 'gemini') return GeminiCard
  if (props.provider.key === 'minimax') return MinimaxCard
  return OpenAICard
})
import { watchEffect } from 'vue'



watchEffect(() => {
  console.log('----------------------')
  console.log('key:', props.provider.key)
  console.log('connected:', props.provider.connected)
  console.log('ownerConnected:', props.provider.ownerConnected)
  console.log('connectedBy:', props.provider.connectedBy)
  console.log(props.provider)
})
</script>
