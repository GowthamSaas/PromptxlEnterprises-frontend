<template>
  <div class="sa-layout">
    <!-- Sidebar -->
    <aside class="sa-sidebar">
      <div class="sa-logo">
        <div class="sa-logo-icon">
          <i class="pi pi-bolt"></i>
        </div>
        <div class="sa-logo-text">
          <span class="sa-logo-name">PromptXL</span>
          <span class="sa-logo-badge">SuperAdmin</span>
        </div>
      </div>

      <nav class="sa-nav">
        <router-link to="/superadmin" class="sa-nav-item" exact-active-class="sa-nav-item--active">
          <i class="pi pi-home"></i>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/superadmin/tenants" class="sa-nav-item" active-class="sa-nav-item--active">
          <i class="pi pi-building"></i>
          <span>Tenants</span>
        </router-link>
        <router-link to="/superadmin/tenants/create" class="sa-nav-item" active-class="sa-nav-item--active">
          <i class="pi pi-plus-circle"></i>
          <span>Create Tenant</span>
        </router-link>
      </nav>

      <div class="sa-user-block">
        <div class="sa-user-avatar">
          <i class="pi pi-shield"></i>
        </div>
        <div class="sa-user-info">
          <span class="sa-user-name">Superadmin</span>
          <span class="sa-user-role">Full Access</span>
        </div>
        <Button
          icon="pi pi-sign-out"
          severity="secondary"
          text
          rounded
          class="sa-logout-btn"
          v-tooltip.top="'Logout'"
          @click="handleLogout"
        />
      </div>
    </aside>

    <!-- Main Content -->
    <main class="sa-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth'
import Button from 'primevue/button'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  toast.add({ severity: 'success', summary: 'Logged out', detail: 'See you soon!', life: 2000 })
  router.push('/superadmin/login')
}
</script>

<style scoped>
.sa-layout {
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
}

/* ── Sidebar ── */
.sa-sidebar {
  width: 260px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  background: linear-gradient(175deg, #1e1b4b 0%, #312e81 55%, #4338ca 100%);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 4px 0 24px rgba(15, 23, 42, 0.18);
}

/* Logo */
.sa-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 8px 32px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
}

.sa-logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sa-logo-icon .pi {
  font-size: 1.35rem;
  color: #a5b4fc;
}

.sa-logo-text {
  display: flex;
  flex-direction: column;
}

.sa-logo-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
}

.sa-logo-badge {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a5b4fc;
  margin-top: 2px;
}

/* Nav */
.sa-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sa-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: rgba(199, 210, 254, 0.85);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.18s ease, color 0.18s ease;
}

.sa-nav-item .pi {
  font-size: 1.05rem;
  flex-shrink: 0;
}

.sa-nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.sa-nav-item--active {
  background: rgba(255, 255, 255, 0.18) !important;
  color: #fff !important;
  font-weight: 600;
}

/* User block at bottom */
.sa-user-block {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 16px;
}

.sa-user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(165, 180, 252, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sa-user-avatar .pi {
  color: #a5b4fc;
  font-size: 1rem;
}

.sa-user-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.sa-user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #e0e7ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sa-user-role {
  font-size: 0.72rem;
  color: rgba(165, 180, 252, 0.75);
  margin-top: 1px;
}

.sa-logout-btn {
  flex-shrink: 0;
  color: rgba(199, 210, 254, 0.7) !important;
}

.sa-logout-btn:hover {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Main content */
.sa-main {
  flex: 1;
  overflow-y: auto;
  min-width: 0;
  background: #f0f2f5;
}

/* Responsive */
@media (max-width: 900px) {
  .sa-layout {
    flex-direction: column;
  }

  .sa-sidebar {
    width: 100%;
    min-height: auto;
    height: auto;
    position: relative;
    padding: 16px;
  }

  .sa-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
  }
}
</style>
