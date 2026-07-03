import api from './api'

export const generateAPI = {
  generate: (data) => api.post('/ai-generator/generate', data)
}
