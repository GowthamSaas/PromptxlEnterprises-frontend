import api from './api'

export const llmAPI = {
  getProviders: () => api.get('/llm-providers/providers'),
  connectProvider: (data) => api.post('/llm-providers/connect', data),
  getModels: (provider) => api.get(`/llm-providers/models/${provider}`)
}
