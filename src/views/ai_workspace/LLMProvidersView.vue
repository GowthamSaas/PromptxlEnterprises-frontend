<template>
  <div class="page-shell">
    <AIPageHeader title="LLM Providers" subtitle="Connect and manage your AI providers." />

    <ProviderGrid :providers="providers" @connect="handleConnect" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AIPageHeader from '../../components/common/AIPageHeader.vue'
import ProviderGrid from '../../components/llm/ProviderGrid.vue'
import { llmProviders } from '../../utils/providers'

const providers = ref([])

onMounted(() => {
  providers.value = llmProviders.map((provider) => ({ ...provider }))
})

function handleConnect({ provider, apiKey }) {
  console.log('Connect provider', provider, apiKey)
  const providerItem = providers.value.find((item) => item.key === provider)
  if (providerItem) {
    providerItem.connected = true
  }
}
</script>

<style scoped>
.page-shell {
  padding: 8px 0 20px;
}
</style>
