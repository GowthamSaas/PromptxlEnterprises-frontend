import api from './api'

export const llmAPI = {
  // Get all connected providers
  getProviders() {
    return api.get('/llm-providers/providers')
  },

  // Connect a provider
  connectProvider(data) {
    return api.post('/llm-providers/connect', data)
  },

  // Disconnect a provider
  disconnectProvider(provider) {
    return api.post('/llm-providers/disconnect', {
      provider
    })
  },

  // Get models for a provider
  getModels(provider) {
    return api.get(`/llm-providers/models/${provider}`)
  }
}