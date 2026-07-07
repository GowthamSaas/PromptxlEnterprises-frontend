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
          <strong>{{ projects.length }}</strong>
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
      <div v-else-if="projects.length === 0" class="empty-state">
        <i class="pi pi-inbox" style="font-size: 48px; color: #cbd5e1"></i>
        <p>No applications assigned to you yet.</p>
      </div>
      <div v-else class="apps-grid">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="app-card"
          @click="openProject(project)"
        >
          <div class="project-icon">
  <i class="pi pi-folder-open"></i>
</div>
          <h3>{{ project.name }}</h3>
          <p>{{ project.description || "No description" }}</p>
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
import { useProjectAssignmentsStore } from '../stores/projectAssignments'
import { useUsersStore } from '../stores/users'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

const authStore = useAuthStore()
const projectAssignmentsStore = useProjectAssignmentsStore()
const usersStore = useUsersStore()

const loading = ref(false)
const projects = computed(() => projectAssignmentsStore.myProjects)

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
    applications: projectAssignmentsStore.myProjects.length
  }
})

function openProject(project) {

  console.log(project)

  // Later
  // router.push(`/projects/${project.id}`)

}

onMounted(async () => {
  loading.value = true

  try {

    if (authStore.isUser) {

      await projectAssignmentsStore.fetchMyProjects()

    } else {

      await usersStore.fetchUsers()

    }

  } finally {

    loading.value = false

  }

})
</script>

<style scoped>

.project-icon{

    width:70px;

    height:70px;

    border-radius:16px;

    display:flex;

    justify-content:center;

    align-items:center;

    background:var(--primary-50);

    margin:0 auto 1rem;

}

.project-icon i{

    font-size:2rem;

    color:var(--primary-color);

}
/* Dashboard-specific overrides are now in main.css */
</style>
