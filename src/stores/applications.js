import { defineStore } from 'pinia'
import { ref } from 'vue'
import { applicationsAPI } from '../services/api'

export const useApplicationsStore = defineStore('applications', () => {
  const applications = ref([])
  const loading = ref(false)

  async function fetchApplications() {
    loading.value = true
    try {
      const response = await applicationsAPI.getAll()
      applications.value = response.data
    } finally {
      loading.value = false
    }
  }

  async function createApplication(data) {
    const response = await applicationsAPI.create(data)
    applications.value.push(response.data)
    return response.data
  }

  async function updateApplication(id, data) {
    const response = await applicationsAPI.update(id, data)
    const index = applications.value.findIndex(a => a.id === id)
    if (index !== -1) {
      applications.value[index] = response.data
    }
    return response.data
  }

  async function deleteApplication(id) {
    await applicationsAPI.delete(id)
    applications.value = applications.value.filter(a => a.id !== id)
  }

  return {
    applications,
    loading,
    fetchApplications,
    createApplication,
    updateApplication,
    deleteApplication
  }
})
