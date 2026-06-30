import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usersAPI } from '../services/api'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)

  async function fetchUsers() {
    loading.value = true
    try {
      const response = await usersAPI.getAll()
      users.value = response.data
    } finally {
      loading.value = false
    }
  }

  async function createUser(data) {
    const response = await usersAPI.create(data)
    users.value.push(response.data)
    return response.data
  }

  async function updateUser(id, data) {
    const response = await usersAPI.update(id, data)
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = response.data
    }
    return response.data
  }

  async function deleteUser(id) {
    await usersAPI.delete(id)
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
})
