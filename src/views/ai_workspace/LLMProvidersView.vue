<template>
  <div class="page-shell">

    <Toast />

    <AIPageHeader
      title="LLM Providers"
      subtitle="Connect and manage your AI providers."
    />

    <ProviderGrid
      :providers="providers"
      :loading="loading"
      @connect="handleConnect"
      @disconnect="handleDisconnect"
    />

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

import AIPageHeader from '../../components/common/AIPageHeader.vue'
import ProviderGrid from '../../components/llm/ProviderGrid.vue'

import { useLLMStore } from '../../stores/llm'
import { llmProviders } from '../../utils/providers'

const toast = useToast()
const llmStore = useLLMStore()

const loading = computed(() => llmStore.loading)

const providers = computed(() => {
  return llmProviders.map(provider => {
    const connected = llmStore.providers.find(
      item => item.provider === provider.key
    )

    return {
      ...provider,
      connected: !!connected
    }
  })
})

onMounted(async () => {
  await llmStore.fetchProviders()
})

async function handleConnect(payload) {

  // Empty API Key
  if (payload.error) {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: payload.error,
      life: 3000
    })
    return
  }

  try {

    await llmStore.connectProvider(payload)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `${payload.provider} connected successfully.`,
      life: 3000
    })

  } catch (err) {

    toast.add({
      severity: 'error',
      summary: 'Connection Failed',
      detail:
        err.response?.data?.detail ||
        'Invalid API Key',
      life: 4000
    })

  }
}

async function handleDisconnect(provider) {

  try {

    await llmStore.disconnectProvider(provider)

    toast.add({
      severity: 'success',
      summary: 'Disconnected',
      detail: `${provider} disconnected successfully.`,
      life: 3000
    })

  } catch (err) {

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail:
        err.response?.data?.detail ||
        'Unable to disconnect provider.',
      life: 3000
    })

  }

}
</script>

<style scoped>
.page-shell {
  padding: 8px 0 20px;
}
</style>