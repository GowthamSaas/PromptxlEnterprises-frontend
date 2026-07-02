import { defineStore } from 'pinia'
import { ref } from 'vue'
import { llmAPI } from '../services/llm'

export const useLLMStore = defineStore('llm', () => {
  const providers = ref([])
  const models = ref([])
  const loading = ref(false)

  async function fetchProviders() {
    loading.value = true
    try {
      const response = await llmAPI.getProviders()
      providers.value = response.data.providers || []
    } finally {
      loading.value = false
    }
  }

  async function connectProvider(payload) {
    const response = await llmAPI.connectProvider(payload)
    await fetchProviders()
    return response
  }

  async function fetchModels(provider) {
    const response = await llmAPI.getModels(provider)
    models.value = response.data.models || []
    return response
  }

  return { providers, models, loading, fetchProviders, connectProvider, fetchModels }
})
