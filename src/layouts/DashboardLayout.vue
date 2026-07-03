<template>
  <div class="dashboard-layout">
    
    <!-- ── Desktop Sidebar ── -->
    <aside class="sidebar desktop-sidebar">
      <div class="logo">
        <div class="logo-text">
          <h2>PromptXL</h2>
          <span>Enterprise</span>
        </div>
      </div>
      
      <nav class="nav-menu">
        <router-link to="/" class="nav-item" exact-active-class="nav-item--active">
          <i class="pi pi-home"></i>
          <span>Dashboard</span>
        </router-link>
        
        <template v-if="authStore.isOwner">
          <router-link to="/admins" class="nav-item" active-class="nav-item--active">
            <i class="pi pi-users"></i>
            <span>Admins</span>
          </router-link>
        </template>
        
        <template v-if="authStore.isOwner || authStore.isAdmin">
          <router-link to="/users" class="nav-item" active-class="nav-item--active">
            <i class="pi pi-user"></i>
            <span>Users</span>
          </router-link>
          <router-link to="/applications" class="nav-item" active-class="nav-item--active">
            <i class="pi pi-th-large"></i>
            <span>Applications</span>
          </router-link>
          <router-link to="/assignments" class="nav-item" active-class="nav-item--active">
            <i class="pi pi-link"></i>
            <span>Assignments</span>
          </router-link>
          <router-link to="/create-app/guide" class="nav-item" active-class="nav-item--active">
            <i class="pi pi-plus-circle"></i>
            <span>Create Custom App</span>
          </router-link>
        </template>
      </nav>
      
      <div class="user-block" @click="goToProfile">
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

    <!-- ── Right column: toolbar (mobile only) + main content ── -->
    <div class="content-col">

      <!-- Mobile top bar -->
      <Toolbar class="mobile-toolbar">
        <template #start>
          <Button icon="pi pi-bars" text rounded @click="sidebarVisible = true" class="mobile-menu-btn" />
          <div class="mobile-brand">
            <span class="mobile-title">PromptXL</span>
            <span class="mobile-badge">Enterprise</span>
          </div>
        </template>
      </Toolbar>

      <!-- Mobile Drawer -->
      <Drawer
        v-model:visible="sidebarVisible"
        position="left"
        class="mobile-drawer sa-dark-drawer"
        :dismissable="true"
        :modal="true"
        @hide="sidebarVisible = false"
      >
        <template #header>
          <div class="sa-drawer-header-custom">
             <Button icon="pi pi-times" text rounded class="sa-drawer-close" aria-label="Close" @click="sidebarVisible = false" />
          </div>
        </template>

        <div class="logo">
          <div class="logo-text">
            <h2>PromptXL</h2>
            <span>Enterprise</span>
          </div>
        </div>
        
        <nav class="nav-menu">
          <router-link to="/" class="nav-item" exact-active-class="nav-item--active" @click="sidebarVisible = false">
            <i class="pi pi-home"></i>
            <span>Dashboard</span>
          </router-link>
          
          <template v-if="authStore.isOwner">
            <router-link to="/admins" class="nav-item" active-class="nav-item--active" @click="sidebarVisible = false">
              <i class="pi pi-users"></i>
              <span>Admins</span>
            </router-link>
          </template>
          
          <template v-if="authStore.isOwner || authStore.isAdmin">
            <router-link to="/users" class="nav-item" active-class="nav-item--active" @click="sidebarVisible = false">
              <i class="pi pi-user"></i>
              <span>Users</span>
            </router-link>
            <router-link to="/applications" class="nav-item" active-class="nav-item--active" @click="sidebarVisible = false">
              <i class="pi pi-th-large"></i>
              <span>Applications</span>
            </router-link>
            <router-link to="/assignments" class="nav-item" active-class="nav-item--active" @click="sidebarVisible = false">
              <i class="pi pi-link"></i>
              <span>Assignments</span>
            </router-link>
            <router-link to="/create-app/guide" class="nav-item" active-class="nav-item--active" @click="sidebarVisible = false">
              <i class="pi pi-plus-circle"></i>
              <span>Create Custom App</span>
            </router-link>
          </template>
        </nav>
        
        <div class="user-block" @click="goToProfile">
          <div class="user-avatar">
            <i class="pi pi-user"></i>
          </div>
          <div class="user-info">
            <strong>{{ authStore.user?.full_name?.split(' ')[0] }}</strong>
            <span class="role-badge">{{ authStore.user?.role }}</span>
          </div>
          <Button icon="pi pi-sign-out" text rounded class="logout-btn" @click.stop="logout" v-tooltip.top="'Sign Out'" />
        </div>
      </Drawer>

      <!-- Page content -->
      <main class="main-content">
        <router-view />
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import Drawer from 'primevue/drawer'

const router = useRouter()
const authStore = useAuthStore()
const sidebarVisible = ref(false)

function goToProfile() {
  sidebarVisible.value = false
  router.push('/profile')
}

function logout() {
  sidebarVisible.value = false
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* ════════════════════════════════════════
   ROOT LAYOUT  –  Sidebar | Content-col
════════════════════════════════════════ */
.dashboard-layout {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
  overflow: hidden;
}

/* ── Sidebar (desktop) ── */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 100;
  background: linear-gradient(175deg, #1e1b4b 0%, #312e81 55%, #4338ca 100%);
  color: #eff6ff;
  box-shadow: 4px 0 24px rgba(15, 23, 42, 0.18);
}

/* ── Right column (grows to fill remaining width) ── */
.content-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* ── Main scrollable area ── */
.main-content {
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 28px 32px;
  box-sizing: border-box;
  width: 100%;
}

/* ═══════════════════════
   SIDEBAR INNER STYLES
═══════════════════════ */
.logo {
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
}

.logo-text h2 {
  font-size: 28px;
  margin: 0;
  letter-spacing: -0.04em;
}

.logo-text span {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(229,231,235,0.9);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  color: rgba(226,232,240,0.95);
  text-decoration: none;
  background: rgba(255,255,255,0.06);
  font-size: 0.95rem;
  font-weight: 500;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.nav-item .pi { font-size: 1.1rem; flex-shrink: 0; }

.nav-item:hover {
  transform: translateX(3px);
  background: rgba(255,255,255,0.14);
  color: white;
}

.nav-item--active {
  background: rgba(255,255,255,0.18) !important;
  color: #ffffff !important;
  font-weight: 600;
}

.user-block {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px;
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.user-block:hover {
  background: rgba(255, 255, 255, 0.12);
}

.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(165, 180, 252, 0.2);
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
  margin-top: 2px;
  text-transform: capitalize;
}

.logout-btn {
  color: rgba(199, 210, 254, 0.7) !important;
  width: 32px !important;
  height: 32px !important;
  padding: 0 !important;
  flex-shrink: 0;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
}

.mobile-toolbar {
  display: none;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-radius: 0 !important;
  padding: 0.75rem 1rem;
  background: #fff !important;
  border-bottom: 1px solid rgba(15, 23, 42, 0.07) !important;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  width: 100%;
  box-sizing: border-box;
}

.mobile-drawer {
  width: 85vw;
  max-width: 280px;
}

@media (max-width: 1024px) {
  .sidebar.desktop-sidebar {
    display: none;
  }

  .mobile-toolbar {
    display: flex;
  }

  .dashboard-layout {
    flex-direction: column;
  }

  .content-col {
    width: 100%;
  }

  .main-content {
    padding: 22px 18px;
  }
}

@media (max-width: 640px) {
  .main-content {
    padding: 16px 14px;
  }
}

.main-content {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 28pi 32px;
  .main-content { padding: 12px; }
}
</style>
