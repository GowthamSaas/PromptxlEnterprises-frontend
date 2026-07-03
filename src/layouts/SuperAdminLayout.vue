<template>
  <div class="sa-layout">

    <!-- ── Desktop Sidebar ── -->
    <aside class="sa-sidebar desktop-sidebar">
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

    <!-- ── Right column: toolbar (mobile only) + main content ── -->
    <div class="sa-content-col">

      <!-- Mobile top bar -->
      <Toolbar class="mobile-toolbar">
        <template #start>
          <Button icon="pi pi-bars" text rounded @click="sidebarVisible = true" class="mobile-menu-btn" />
          <div class="mobile-brand">
            <span class="mobile-title">PromptXL</span>
            <span class="mobile-badge">SuperAdmin</span>
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
          <router-link to="/superadmin" class="sa-nav-item" exact-active-class="sa-nav-item--active" @click="sidebarVisible = false">
            <i class="pi pi-home"></i>
            <span>Dashboard</span>
          </router-link>
          <router-link to="/superadmin/tenants" class="sa-nav-item" active-class="sa-nav-item--active" @click="sidebarVisible = false">
            <i class="pi pi-building"></i>
            <span>Tenants</span>
          </router-link>
          <router-link to="/superadmin/tenants/create" class="sa-nav-item" active-class="sa-nav-item--active" @click="sidebarVisible = false">
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
          <Button icon="pi pi-sign-out" severity="secondary" text rounded class="sa-logout-btn" v-tooltip.top="'Logout'" @click="handleLogout" />
        </div>
      </Drawer>

      <!-- Page content -->
      <main class="sa-main">
        <router-view />
      </main>

    </div><!-- /.sa-content-col -->

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import Drawer from 'primevue/drawer'
import { ref } from 'vue'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const sidebarVisible = ref(false)

function handleLogout() {
  sidebarVisible.value = false
  authStore.logout()

  toast.add({
    severity: 'success',
    summary: 'Logged out',
    detail: 'See you soon!',
    life: 2000
  })

  router.push('/superadmin/login')
}
</script>

<style scoped>
/* ════════════════════════════════════════
   ROOT LAYOUT  –  Sidebar | Content-col
════════════════════════════════════════ */
.sa-layout {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
  overflow: hidden;
}

/* ── Sidebar (desktop) ── */
.sa-sidebar {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 100;
  background: linear-gradient(175deg, #1e1b4b 0%, #312e81 55%, #4338ca 100%);
  box-shadow: 4px 0 24px rgba(15, 23, 42, 0.18);
}

/* ── Right column (grows to fill remaining width) ── */
.sa-content-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* ── Main scrollable area ── */
.sa-main {
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
}

/* ═══════════════════════
   SIDEBAR INNER STYLES
═══════════════════════ */
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

.sa-logo-icon .pi { font-size: 1.35rem; color: #a5b4fc; }

.sa-logo-text { display: flex; flex-direction: column; }

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

.sa-nav-item .pi { font-size: 1.05rem; flex-shrink: 0; }

.sa-nav-item:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }

.sa-nav-item--active {
  background: rgba(255, 255, 255, 0.18) !important;
  color: #fff !important;
  font-weight: 600;
}

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

.sa-user-avatar .pi { color: #a5b4fc; font-size: 1rem; }

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

.sa-user-role { font-size: 0.72rem; color: rgba(165, 180, 252, 0.75); margin-top: 1px; }

.sa-logout-btn { flex-shrink: 0; color: rgba(199, 210, 254, 0.7) !important; }
.sa-logout-btn:hover { color: #fff !important; background: rgba(255, 255, 255, 0.1) !important; }

/* ═══════════════════════
   MOBILE TOOLBAR
═══════════════════════ */
.mobile-toolbar {
  display: none;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-radius: 0 !important;
  padding: 0.5rem 1rem;
  background: #fff !important;
  border-bottom: 1px solid rgba(15, 23, 42, 0.07) !important;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  width: 100%;
  box-sizing: border-box;
}

.mobile-drawer { width: 85vw; max-width: 280px; }

.mobile-brand {
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  line-height: 1.1;
}

.mobile-title {
  font-size: 1rem;
  font-weight: 800;
  color: #1e1b4b;
  letter-spacing: -0.02em;
}

.mobile-badge {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #7c3aed;
}

.mobile-menu-btn { color: #1e1b4b !important; }

/* ═══════════════════════
   RESPONSIVE BREAKPOINTS
═══════════════════════ */

/* Tablet & Mobile: hide sidebar, show toolbar */
@media (max-width: 1024px) {
  .sa-sidebar { display: none; }
  .mobile-toolbar { display: flex; }
  .sa-main { padding: 16px; }
}

@media (max-width: 640px) {
  .sa-main { padding: 12px; }
}

@media (max-width: 400px) {
  .sa-main { padding: 8px; }
}
</style>
