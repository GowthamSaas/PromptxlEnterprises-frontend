<template>
  <div class="model-selector">
    <label>Model</label>
    <Dropdown v-model="selectedModel" :options="models" optionLabel="label" optionValue="value" placeholder="Select model" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'

const selectedModel = ref('gpt-4o-mini')
const models = [
  { label: 'GPT-4o Mini', value: 'gpt-4o-mini' },
  { label: 'Claude 3.5 Sonnet', value: 'claude-3-5-sonnet-latest' },
  { label: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash' }
]
</script>

<style scoped>
.model-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
