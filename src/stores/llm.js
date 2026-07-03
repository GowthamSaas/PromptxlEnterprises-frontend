import { defineStore } from 'pinia'
import { ref } from 'vue'
import { llmAPI } from '../services/llm'

export const useLLMStore = defineStore('llm', () => {
  const providers = ref([])
  const models = ref([])
  const selectedProvider = ref(null)

  const loading = ref(false)
  const error = ref(null)

  async function fetchProviders() {
    loading.value = true
    error.value = null

    try {
      const response = await llmAPI.getProviders()
      providers.value = response.data.providers || []
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to load providers'
    } finally {
      loading.value = false
    }
  }

  async function connectProvider(payload) {
    loading.value = true
    error.value = null

    try {
      const response = await llmAPI.connectProvider(payload)

      await fetchProviders()

      return response
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to connect provider'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function disconnectProvider(provider) {
    loading.value = true
    error.value = null

    try {
      await llmAPI.disconnectProvider(provider)

      await fetchProviders()
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to disconnect provider'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchModels(provider) {
    loading.value = true
    error.value = null

    try {
      selectedProvider.value = provider

      const response = await llmAPI.getModels(provider)

      models.value = response.data.models || []

      return response
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to load models'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    providers,
    models,
    selectedProvider,
    loading,
    error,
    fetchProviders,
    connectProvider,
    disconnectProvider,
    fetchModels
  }
})