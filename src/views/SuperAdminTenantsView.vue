<template>
  <div class="sa-page">
    <!-- Page Header -->
    <div class="sa-page-header">
      <div class="sa-page-header-text">
        <h1 class="sa-page-title">Tenants</h1>
        <p class="sa-page-sub">All registered company tenants on the PromptXL platform.</p>
      </div>
      <Button
        type="button"
        size="large"
        :disabled="loading"
        @click="$router.push('/superadmin/tenants/create')"
      >
        <i v-if="loading" class="pi pi-spinner pi-spin"></i>
        <i v-else class="pi pi-plus"></i>
        {{ loading ? 'Loading...' : 'Newrrrrr Tenant' }}
      </Button>

      <Button size="large">
        <i class="pi pi-check"></i>
        Large
      </Button>
    </div>

    <!-- Tenants Table Card -->
    <div class="sa-panel">
      <!-- Toolbar -->
      <div class="sa-table-toolbar">
        <InputIcon class="pi pi-search" />
        <IconField iconPosition="left" class="sa-search-field">
          <InputText
            v-model="searchQuery"
            placeholder="Search tenants..."
            class="sa-search-input"
          />
        </IconField>
        <Button
          icon="pi pi-refresh"
          severity="secondary"
          text
          rounded
          v-tooltip.top="'Refresh'"
          :loading="loading"
          @click="loadTenants"
        />
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="sa-skeleton-list">
        <Skeleton v-for="i in 4" :key="i" height="64px" border-radius="12px" class="sa-skeleton-row" />
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredTenants.length === 0" class="sa-empty">
        <div class="sa-empty-icon">
          <i class="pi pi-inbox"></i>
        </div>
        <h3>No tenants found</h3>
        <p v-if="searchQuery">No results matching "{{ searchQuery }}"</p>
        <p v-else>Get started by creating your first tenant.</p>
        <Button
          v-if="!searchQuery"
          type="button"
          :disabled="loading"
          @click="$router.push('/superadmin/tenants/create')"
        >
          <i v-if="loading" class="pi pi-spinner pi-spin"></i>
          <i v-else class="pi pi-plus"></i>
          {{ loading ? 'Loading...' : 'Create Tenant' }}
        </Button>
      </div>

      <!-- Data Table -->
      <DataTable
        v-else
        :value="filteredTenants"
        :row-hover="true"
        striped-rows
        responsive-layout="scroll"
        class="sa-data-table"
        :paginator="filteredTenants.length > 10"
        :rows="10"
        paginator-template="PrevPageLink PageLinks NextPageLink"
      >
        <Column field="company_name" header="Company" sortable>
          <template #body="{ data }">
            <div class="sa-col-company">
              <div class="sa-company-avatar">
                {{ data.company_name?.charAt(0).toUpperCase() }}
              </div>
              <div>
                <span class="sa-company-name">{{ data.company_name }}</span>
                <span class="sa-company-id">{{ data.tenant_id }}</span>
              </div>
            </div>
          </template>
        </Column>

        <Column field="contact_email" header="Contact Email" sortable>
          <template #body="{ data }">
            <a :href="`mailto:${data.contact_email}`" class="sa-email-link">
              <i class="pi pi-envelope"></i>
              {{ data.contact_email }}
            </a>
          </template>
        </Column>

        <Column field="contact_phone" header="Phone">
          <template #body="{ data }">
            <span class="sa-phone">{{ data.contact_phone || '—' }}</span>
          </template>
        </Column>

        <Column field="address" header="Address">
          <template #body="{ data }">
            <span class="sa-address">{{ data.address || '—' }}</span>
          </template>
        </Column>

        <Column header="Status">
          <template #body>
            <Tag value="Active" severity="success" icon="pi pi-check-circle" />
          </template>
        </Column>
      </DataTable>
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
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Skeleton from 'primevue/skeleton'
import Tag from 'primevue/tag'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const tenants = ref([])
const loading = ref(true)
const searchQuery = ref('')

const filteredTenants = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return tenants.value
  return tenants.value.filter(t =>
    [t.company_name, t.tenant_id, t.contact_email, t.contact_phone, t.address]
      .some(v => v?.toLowerCase().includes(q))
  )
})

async function loadTenants() {
  loading.value = true
  try {
    const response = await tenantsAPI.getAll()
    tenants.value = response.data
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Failed', detail: 'Could not load tenants', life: 3000 })
  } finally {
    loading.value = false
  }
}

onMounted(loadTenants)
</script>

<style scoped>
/* ── Page layout ── */
.sa-page { max-width: 1200px; }

.sa-panel { overflow: hidden; padding: 0; }

.sa-table-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
}

.sa-search-field { flex: 1; max-width: 360px; }
.sa-search-input { width: 100%; }

/* Skeleton loader */
.sa-skeleton-list { padding: 20px 24px; display: flex; flex-direction: column; gap: 12px; }

/* Empty state */
.sa-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 64px 24px;
  gap: 12px;
}

.sa-empty-icon {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex; align-items: center; justify-content: center;
}

.sa-empty-icon .pi { font-size: 2rem; color: #94a3b8; }
.sa-empty h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0; }
.sa-empty p  { font-size: .88rem; color: #64748b; margin: 0; }

/* Company column */
.sa-col-company { display: flex; align-items: center; gap: 12px; }

.sa-company-avatar {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  font-weight: 700; font-size: 1rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.sa-company-name { display: block; font-weight: 600; color: #111827; font-size: .9rem; }
.sa-company-id   { display: block; font-size: .75rem; color: #94a3b8; font-family: 'Courier New', monospace; margin-top: 2px; }

/* Email / Phone / Address */
.sa-email-link {
  display: flex; align-items: center; gap: 6px;
  color: #4f46e5; text-decoration: none; font-weight: 500;
}
.sa-email-link:hover { text-decoration: underline; }
.sa-phone, .sa-address { color: #374151; }
</style>

