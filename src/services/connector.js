import api from './api'

export const connectorAPI = {
  list: () => api.get('/connectors'),
  connect: (data) => api.post('/connectors/connect', data)
}
