import { defineStore } from 'pinia'
import { ref } from 'vue'
import { generateAPI } from '../services/generate'

export const useProjectStore = defineStore('project', () => {
  const projects = ref([])
  const loading = ref(false)

  async function generateProject(payload) {
    loading.value = true
    try {
      const response = await generateAPI.generate(payload)
      projects.value = [response.data, ...projects.value]
      return response
    } finally {
      loading.value = false
    }
  }

  return { projects, loading, generateProject }
})
