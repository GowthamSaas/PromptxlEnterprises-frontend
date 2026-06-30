<template>
  <div class="page-shell dashboard-page">
    <section class="dashboard-hero">
      <div class="hero-copy">
        <span class="hero-badge">Enterprise Workspace</span>
        <h1 class="page-title">{{ greeting }}</h1>
        <p class="page-subtitle" v-if="authStore.isUser">Your applications are ready to launch.</p>
        <p class="page-subtitle" v-else>Overview of your tenant usage and quick actions.</p>
      </div>
      <div class="hero-metrics" v-if="authStore.isUser">
        <div class="metric-card">
          <span>Assigned Apps</span>
          <strong>{{ applications.length }}</strong>
        </div>
        <div class="metric-card">
          <span>Active Users</span>
          <strong>{{ stats.users }}</strong>
        </div>
        <div class="metric-card">
          <span>Admins</span>
          <strong>{{ stats.admins }}</strong>
        </div>
      </div>
    </section>

    <template v-if="authStore.isUser">
      <div v-if="loading" class="loading">
        <ProgressSpinner />
      </div>
      <div v-else-if="applications.length === 0" class="empty-state">
        <i class="pi pi-inbox" style="font-size: 48px; color: #cbd5e1"></i>
        <p>No applications assigned to you yet.</p>
      </div>
      <div v-else class="apps-grid">
        <div 
          v-for="app in applications" 
          :key="app.id" 
          class="app-card"
          @click="launchApp(app)"
        >
          <img :src="app.icon_url" :alt="app.name" />
          <h3>{{ app.name }}</h3>
          <p>{{ app.description || 'No description' }}</p>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="stats-grid">
        <Card>
          <template #content>
            <div class="stat-item">
              <i class="pi pi-users stat-icon"></i>
              <div>
                <h3>{{ stats.users }}</h3>
                <p>Total Users</p>
              </div>
            </div>
          </template>
        </Card>
        <Card>
          <template #content>
            <div class="stat-item">
              <i class="pi pi-th-large stat-icon"></i>
              <div>
                <h3>{{ stats.applications }}</h3>
                <p>Applications</p>
              </div>
            </div>
          </template>
        </Card>
        <Card v-if="authStore.isOwner">
          <template #content>
            <div class="stat-item">
              <i class="pi pi-user-plus stat-icon"></i>
              <div>
                <h3>{{ stats.admins }}</h3>
                <p>Admins</p>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <Card class="page-card">
        <template #content>
          <h2 class="section-title">Quick Actions</h2>
          <div class="action-grid">
            <Button label="Add User" icon="pi pi-user-plus" class="p-button-outlined" @click="$router.push('/users')" />
            <Button label="Add Application" icon="pi pi-plus" class="p-button-outlined" @click="$router.push('/applications')" />
            <Button label="Manage Assignments" icon="pi pi-link" class="p-button-outlined" @click="$router.push('/assignments')" />
          </div>
        </template>
      </Card>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useApplicationsStore } from '../stores/applications'
import { useUsersStore } from '../stores/users'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

const authStore = useAuthStore()
const applicationsStore = useApplicationsStore()
const usersStore = useUsersStore()

const loading = ref(false)
const applications = computed(() => applicationsStore.applications)

const greeting = computed(() => {
  const hour = new Date().getHours()
  const name = authStore.user?.full_name?.split(' ')[0] || 'User'
  if (hour < 12) return `Good Morning, ${name}`
  if (hour < 18) return `Good Afternoon, ${name}`
  return `Good Evening, ${name}`
})

const stats = computed(() => {
  const users = usersStore.users
  return {
    users: users.filter(u => u.role === 'user').length,
    admins: users.filter(u => u.role === 'admin').length,
    applications: applicationsStore.applications.length
  }
})

function launchApp(app) {
  window.open(app.launch_url, '_blank')
}

onMounted(async () => {
  loading.value = true
  try {
    await applicationsStore.fetchApplications()
    if (!authStore.isUser) {
      await usersStore.fetchUsers()
    }
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Dashboard-specific overrides are now in main.css */
</style>
