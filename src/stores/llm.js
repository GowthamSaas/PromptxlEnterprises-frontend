import { defineStore } from 'pinia'
import { ref } from 'vue'
import { llmAPI } from '../services/llm'

export const useLLMStore = defineStore('llm', () => {
  const providers = ref([])
  const models = ref([])
  const selectedProvider = ref(null)
  const selectedModel = ref(null)

  const loading = ref(false)
  const error = ref(null)

  async function fetchProviders() {
    loading.value = true
    error.value = null

    try {
      const response = await llmAPI.getProviders()
      console.log('Fetch providers response:', response)
      providers.value = response.data.providers || []
      console.log('Updated providers:', providers.value)
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to load providers'
      console.error('Fetch providers error:', err)
    } finally {
      loading.value = false
    }
  }

  async function connectProvider(payload) {
    loading.value = true
    error.value = null

    try {
      const response = await llmAPI.connectProvider(payload)
      console.log('Connect provider response:', response)

      await fetchProviders()
      console.log('Providers after connect:', providers.value)

      return response
    } catch (err) {
      error.value = err.response?.data?.detail || 'Failed to connect provider'
      console.error('Connect provider error:', err)
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
    selectedModel,
    loading,
    error,
    fetchProviders,
    connectProvider,
    disconnectProvider,
    fetchModels
  }
})