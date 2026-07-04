import { defineStore } from 'pinia'
import { ref } from 'vue'

import { connectorAPI } from '../services/connector'

export const useConnectorStore = defineStore('connector', () => {

  const loading = ref(false)

  const connectors = ref({

    vercel: {
      connected: false,
      account: '',
      teams: 0
    },

    github: {
      connected: false,
      account: '',
      repositories: 0
    },

    supabase: {
      connected: false,
      project: '',
      tables: 0
    }

  })

  // ==========================================
  // Fetch Connectors
  // ==========================================

  async function fetchConnectors() {

    loading.value = true

    try {

      const { data } = await connectorAPI.list()

      // reset

      connectors.value.vercel = {
        connected: false,
        account: '',
        teams: 0
      }

      connectors.value.github = {
        connected: false,
        account: '',
        repositories: 0
      }

      connectors.value.supabase = {
        connected: false,
        project: '',
        tables: 0
      }

      data.connectors.forEach(item => {
        const metadata = item.provider_metadata ?? item.metadata ?? {}

        if (item.provider === 'vercel') {

          connectors.value.vercel = {
            connected: item.connected,
            account: item.account_name || '',
            teams: metadata.teams || 0
          }

        }

        if (item.provider === 'github') {

          connectors.value.github = {
            connected: item.connected,
            account: item.account_name || '',
            repositories: metadata.repositories || 0
          }

        }

        if (item.provider === 'supabase') {

          connectors.value.supabase = {
            connected: item.connected,
            project: item.account_name || '',
            tables: metadata.tables || 0
          }

        }

      })

    }

    catch (error) {
      console.error('Failed to fetch connectors:', error)
    }

    finally {

      loading.value = false

    }

  }

  // ==========================================
  // Connect
  // ==========================================

  async function connectConnector(payload) {

    loading.value = true

    try {

      await connectorAPI.connect(payload)

      await fetchConnectors()

      return true

    }

    finally {

      loading.value = false

    }

  }

  // ==========================================
  // Disconnect
  // ==========================================

  async function disconnectConnector(provider) {

    loading.value = true

    try {

      await connectorAPI.disconnect(provider)

      await fetchConnectors()

      return true

    }

    finally {

      loading.value = false

    }

  }

  return {

    connectors,

    loading,

    fetchConnectors,

    connectConnector,

    disconnectConnector

  }

})