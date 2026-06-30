<template>
  <div class="sa-page">
    <!-- Welcome Banner -->
    <div class="sa-hero">
      <div class="sa-hero-content">
        <div class="sa-hero-eyebrow">
          <i class="pi pi-shield"></i>
          <span>Superadmin Console</span>
        </div>
        <h1 class="sa-hero-title">{{ greeting }}</h1>
        <p class="sa-hero-sub">Manage all tenants and company owners across the PromptXL Enterprise platform.</p>
      </div>
      <div class="sa-hero-orb"></div>
    </div>

    <!-- Stats Row -->
    <div class="sa-stats-row">
      <div class="sa-stat-card sa-stat-card--clickable" @click="viewTenants">
        <div class="sa-stat-icon sa-stat-icon--blue">
          <i class="pi pi-building"></i>
        </div>
        <div class="sa-stat-body">
          <span class="sa-stat-value">{{ stats.tenants }}</span>
          <span class="sa-stat-label">Total Tenants</span>
        </div>
        <div class="sa-stat-trend up">
          <i class="pi pi-arrow-up-right"></i>
        </div>
      </div>

      <div class="sa-stat-card sa-stat-card--clickable" @click="viewOwners">
        <div class="sa-stat-icon sa-stat-icon--violet">
          <i class="pi pi-users"></i>
        </div>
        <div class="sa-stat-body">
          <span class="sa-stat-value">{{ stats.owners }}</span>
          <span class="sa-stat-label">Company Owners</span>
        </div>
        <div class="sa-stat-trend up">
          <i class="pi pi-arrow-up-right"></i>
        </div>
      </div>

      <div class="sa-stat-card sa-stat-card--clickable" @click="viewActiveAccounts">
        <div class="sa-stat-icon sa-stat-icon--emerald">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="sa-stat-body">
          <span class="sa-stat-value">{{ stats.active }}</span>
          <span class="sa-stat-label">Active Accounts</span>
        </div>
        <div class="sa-stat-trend up">
          <i class="pi pi-arrow-up-right"></i>
        </div>
      </div>
    </div>

    <!-- Quick Actions Panel -->
    <div class="sa-panel">
      <div class="sa-panel-header">
        <div>
          <h2 class="sa-panel-title">Quick Actions</h2>
          <p class="sa-panel-desc">Jump to the most common admin tasks below.</p>
        </div>
      </div>

      <div class="sa-action-grid">
        <div class="sa-action-card sa-action-card--primary" @click="createTenant">
          <div class="sa-action-top">
            <div class="sa-action-icon">
              <i class="pi pi-plus-circle"></i>
            </div>
            <div class="sa-action-body">
              <h3>Create Tenant</h3>
              <p>Onboard a new company and register their first owner account.</p>
            </div>
          </div>
          <Button
            label="Create Tenant"
            icon="pi pi-arrow-right"
            icon-pos="right"
            @click.stop="createTenant"
            class="sa-action-btn"
          />
        </div>

        <div class="sa-action-card sa-action-card--secondary" @click="viewTenants">
          <div class="sa-action-top">
            <div class="sa-action-icon">
              <i class="pi pi-list"></i>
            </div>
            <div class="sa-action-body">
              <h3>View Tenants</h3>
              <p>Browse, search and manage all registered tenant organisations.</p>
            </div>
          </div>
          <Button
            label="View All Tenants"
            icon="pi pi-arrow-right"
            icon-pos="right"
            severity="secondary"
            @click.stop="viewTenants"
            class="sa-action-btn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth'
import { tenantsAPI } from '../services/api'
import Button from 'primevue/button'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const tenantList = ref([])

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning, Superadmin 👋'
  if (h < 18) return 'Good Afternoon, Superadmin 👋'
  return 'Good Evening, Superadmin 👋'
})

const stats = computed(() => ({
  tenants: tenantList.value.length,
  owners: tenantList.value.length, // one owner per tenant
  active: tenantList.value.length
}))

async function init() {
  try {
    const res = await tenantsAPI.getAll()
    tenantList.value = res.data
  } catch { /* silent */ }
}

function createTenant() {
  router.push('/superadmin/tenants/create')
}

function viewTenants() {
  router.push('/superadmin/tenants')
}

function viewOwners() {
  router.push('/superadmin/tenants')
}

function viewActiveAccounts() {
  router.push('/users')
}

onMounted(init)
</script>

<style scoped>
.sa-page {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .sa-page {
    max-width: 100%;
    width: 100%;
  }

  .sa-hero,
  .sa-panel,
  .sa-action-card,
  .sa-stat-card {
    width: 100%;
  }
}

.sa-stat-card--clickable {
  cursor: pointer;
}

.sa-stat-card--clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(15,23,42,.1);
}

@media (max-width: 640px) {
  .sa-hero {
    padding: 24px 18px;
  }

  .sa-action-top {
    flex-direction: column;
    gap: 14px;
  }
}
</style>

