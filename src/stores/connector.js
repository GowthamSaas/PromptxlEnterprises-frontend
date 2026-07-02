import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConnectorStore = defineStore('connector', () => {

  const loading = ref(false)

  const connectors = ref({

    // -----------------------
    // Vercel
    // -----------------------
    vercel: {
      connected: false,
      account: '',
      teams: 0
    },

    // -----------------------
    // GitHub
    // -----------------------
    github: {
      connected: false,
      account: '',
      repositories: 0
    },

    // -----------------------
    // Supabase
    // -----------------------
    supabase: {
      connected: false,
      project: '',
      tables: 0
    }

  })

  async function fetchConnectors() {
    // Dummy
    return
  }

  async function connectConnector(payload) {

    loading.value = true

    // Dummy Validation Delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // -----------------------
    // Vercel
    // -----------------------
    if (payload.provider === 'vercel') {

      connectors.value.vercel = {
        connected: true,
        account: 'Connected Account',
        teams: 1
      }

    }

    // -----------------------
    // GitHub
    // -----------------------
    if (payload.provider === 'github') {

      connectors.value.github = {
        connected: true,
        account: 'Connected Account',
        repositories: 8
      }

    }

    // -----------------------
    // Supabase
    // -----------------------
    if (payload.provider === 'supabase') {

      connectors.value.supabase = {
        connected: true,
        project: 'Connected Project',
        tables: 12
      }

    }

    loading.value = false

    return true
  }

  async function disconnectConnector(provider) {

    loading.value = true

    await new Promise(resolve => setTimeout(resolve, 600))

    // -----------------------
    // Vercel
    // -----------------------
    if (provider === 'vercel') {

      connectors.value.vercel = {
        connected: false,
        account: '',
        teams: 0
      }

    }

    // -----------------------
    // GitHub
    // -----------------------
    if (provider === 'github') {

      connectors.value.github = {
        connected: false,
        account: '',
        repositories: 0
      }

    }

    // -----------------------
    // Supabase
    // -----------------------
    if (provider === 'supabase') {

      connectors.value.supabase = {
        connected: false,
        project: '',
        tables: 0
      }

    }

    loading.value = false

    return true
  }

  return {
    connectors,
    loading,
    fetchConnectors,
    connectConnector,
    disconnectConnector
  }

})