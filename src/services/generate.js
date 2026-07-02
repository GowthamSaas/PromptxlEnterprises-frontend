import api from './api'

export const generateAPI = {
  generate: (data) => api.post('/generate-app', data)
}
