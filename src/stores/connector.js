import { defineStore } from 'pinia'
import { ref } from 'vue'
import { connectorAPI } from '../services/connector'

export const useConnectorStore = defineStore('connector', () => {
  const connectors = ref([])
  const loading = ref(false)

  async function fetchConnectors() {
    loading.value = true
    try {
      const response = await connectorAPI.list()
      connectors.value = response.data || []
    } finally {
      loading.value = false
    }
  }

  async function connectConnector(payload) {
    const response = await connectorAPI.connect(payload)
    await fetchConnectors()
    return response
  }

  return { connectors, loading, fetchConnectors, connectConnector }
})
