<template>
  <div class="page-shell">
    <AIPageHeader title="LLM Providers" subtitle="Connect and manage your AI providers." />

    <ProviderGrid :providers="providers" @connect="openConnectDialog" />

    <ConnectDialog v-model="dialogVisible" :provider="selectedProvider" @connect="handleConnect" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AIPageHeader from '../../components/common/AIPageHeader.vue'
import ProviderGrid from '../../components/llm/ProviderGrid.vue'
import ConnectDialog from '../../components/llm/ConnectDialog.vue'
import { llmProviders } from '../../utils/providers'

const providers = ref(llmProviders)
const dialogVisible = ref(false)
const selectedProvider = ref('openai')

onMounted(() => {
  providers.value = llmProviders.map((provider) => ({ ...provider }))
})

function openConnectDialog(providerKey) {
  selectedProvider.value = providerKey
  dialogVisible.value = true
}

function handleConnect(payload) {
  console.log('Connect provider', payload)
}
</script>

<style scoped>
.page-shell {
  padding: 8px 0 20px;
}
</style>
