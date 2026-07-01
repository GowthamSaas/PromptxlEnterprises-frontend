<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="logo">
        <h2>PromptXL</h2>
        <span>Enterprise</span>
      </div>
      
      <nav class="nav-menu">
        <router-link to="/" class="nav-item">
          <i class="pi pi-home"></i>
          <span>Dashboard</span>
        </router-link>
        
        <template v-if="authStore.isOwner">
          <router-link to="/admins" class="nav-item">
            <i class="pi pi-users"></i>
            <span>Admins</span>
          </router-link>
        </template>
        
        <template v-if="authStore.isOwner || authStore.isAdmin">
          <router-link to="/users" class="nav-item">
            <i class="pi pi-user"></i>
            <span>Users</span>
          </router-link>
          <router-link to="/applications" class="nav-item">
            <i class="pi pi-th-large"></i>
            <span>Applications</span>
          </router-link>
          <router-link to="/assignments" class="nav-item">
            <i class="pi pi-link"></i>
            <span>Assignments</span>
          </router-link>
        </template>
      </nav>
      
      <div class="user-block"  @click="goToProfile">
        <div class="user-avatar">
          <i class="pi pi-user"></i>
        </div>
        <div class="user-info">
          <strong>{{ authStore.user?.full_name?.split(' ')[0] }}</strong>
          <span class="role-badge">{{ authStore.user?.role }}</span>
        </div>
        <Button 
          icon="pi pi-sign-out" 
          text 
          rounded 
          class="logout-btn" 
          @click.stop="logout" 
          v-tooltip.top="'Sign Out'"
        />
      </div>
    </aside>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Button from 'primevue/button'

const router = useRouter()
const authStore = useAuthStore()

function goToProfile() {
  router.push('/profile')
}

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 280px;
  min-height: 100vh;
  padding: 28px 24px 32px;
  background: linear-gradient(175deg, #1e1b4b 0%, #312e81 55%, #4338ca 100%);
  color: #eff6ff;
  display: flex;
  flex-direction: column;
  
}

.logo {
  margin-bottom: 18px;
  padding: 18px 16px;
  border-radius: 16px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
}

.logo h2 {
  font-size: 30px;
  letter-spacing: -0.06em;
}

.logo span {
  color: rgba(229,231,235,0.85);
}

.logo h2 {
  font-size: 28px;
  margin: 0;
  letter-spacing: -0.04em;
}

.logo span {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  color: rgba(229,231,235,0.9);
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 12px;
  color: rgba(226,232,240,0.95);
  text-decoration: none;
  background: rgba(255,255,255,0.06);
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.nav-item:hover {
  transform: translateX(3px);
}

.nav-item.router-link-active {
  background: rgba(255,255,255,0.18);
  color: #ffffff;
}

.nav-item:hover,
.nav-item.router-link-active {
  background: rgba(255,255,255,0.14);
  color: white;
}

.user-block {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px;
  margin-top: auto;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-avatar i {
  color: #a5b4fc;
  font-size: 1rem;
}

.user-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.user-info strong {
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role-badge {
  font-size: 0.75rem;
  color: rgba(199, 210, 254, 0.7);
  margin-top: 1px;
}

.logout-btn {
  color: rgba(199, 210, 254, 0.7) !important;
  width: 32px !important;
  height: 32px !important;
  padding: 0 !important;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
}

.main-content {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 28px 32px;
  min-width: 0;
}

@media (max-width: 900px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: auto;
    position: relative;
  }

  .user-info {
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    margin-top: 24px;
  }
}
</style>
