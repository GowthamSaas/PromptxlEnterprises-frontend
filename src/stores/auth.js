import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value)
  const isOwner = computed(() => user.value?.role === 'owner')
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isSuperAdmin = computed(() => user.value?.role === 'superadmin')
  const isUser = computed(() => user.value?.role === 'user')
  const initialized = ref(false)

  async function login(credentials) {
    const response = await authAPI.login(credentials)
    token.value = response.data.access_token
    localStorage.setItem('token', token.value)
    await fetchUser()
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const response = await authAPI.me()
      user.value = response.data
      console.log('User fetched:', user.value)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      logout()
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  async function initializeAuth() {
  if (token.value) {
    await fetchUser()
  }
  initialized.value = true
}

  // Initialize user on store creation
  if (token.value) {
    fetchUser()
  }

  return {
    user,
    token,
    isAuthenticated,
    isOwner,
    isAdmin,
    isSuperAdmin,
    isUser,
    initialized,
    login,
    fetchUser,
    initializeAuth,
    logout
  }
})
