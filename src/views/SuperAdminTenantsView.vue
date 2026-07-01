<template>
  <div class="sa-page">
    <!-- Page Header -->
    <div class="sa-page-header">
      <div class="sa-page-header-text">
        <h1 class="sa-page-title">Tenants</h1>
        <p class="sa-page-sub">All registered company tenants on the PromptXL platform.</p>
      </div>
      <!-- <Button
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
      </Button> -->
    </div>

    <!-- Tenants Table Card -->
    <div class="sa-panel">
      <!-- Toolbar -->
      <div class="sa-table-toolbar">
        <!-- <InputIcon class="pi pi-search" /> -->
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

        <Column header="Status" sortable>
          <template #body>
            <div class="sa-status-cell">
              <Tag value="Active" severity="success" icon="pi pi-check-circle" />
            </div>
          </template>
        </Column>

        <Column header="Actions" style="width: 160px">
          <template #body="{ data }">
            <div class="sa-action-buttons">
              <Button icon="pi pi-eye" text class="sa-table-action" @click="viewTenant(data)" />
              <Button icon="pi pi-pencil" text class="sa-table-action" @click="editTenant(data)" />
              <Button icon="pi pi-trash" text class="sa-table-action" @click="confirmDeleteTenant(data)" />
            </div>
          </template>
        </Column>
      </DataTable>

      <Dialog v-model:visible="editDialogVisible" header="Edit Tenant" modal :style="{ width: '520px' }" dismissableMask>
        <div class="sa-edit-form">
          <div class="field">
            <label for="editCompanyName">Company Name</label>
            <InputText id="editCompanyName" v-model="editForm.company_name" class="w-full" />
          </div>
          <div class="field">
            <label for="editContactEmail">Contact Email</label>
            <InputText id="editContactEmail" v-model="editForm.contact_email" class="w-full" />
          </div>
          <div class="field">
            <label for="editContactPhone">Contact Phone</label>
            <InputText id="editContactPhone" v-model="editForm.contact_phone" class="w-full" />
          </div>
          <div class="field">
            <label for="editAddress">Address</label>
            <InputText id="editAddress" v-model="editForm.address" class="w-full" />
          </div>
        </div>

        <template #footer>
          <Button label="Cancel" severity="secondary" text @click="editDialogVisible = false" />
          <Button label="Save" @click="saveTenant" />
        </template>
      </Dialog>

      <Dialog v-model:visible="viewDialogVisible" header="Tenant Details" modal :style="{ width: '520px' }" dismissableMask>
        <div class="sa-tenant-detail-grid">
          <div class="sa-detail-label">Company</div>
          <div>{{ selectedTenant?.company_name || '—' }}</div>
          <div class="sa-detail-label">Tenant ID</div>
          <div>{{ selectedTenant?.tenant_id || '—' }}</div>
          <div class="sa-detail-label">Contact Email</div>
          <div>{{ selectedTenant?.contact_email || '—' }}</div>
          <div class="sa-detail-label">Phone</div>
          <div>{{ selectedTenant?.contact_phone || '—' }}</div>
          <div class="sa-detail-label">Address</div>
          <div>{{ selectedTenant?.address || '—' }}</div>
        </div>

        <template #footer>
          <Button label="Close" severity="secondary" text @click="viewDialogVisible = false" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
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
import Dialog from 'primevue/dialog'

const router = useRouter()
const toast = useToast()
const confirm = useConfirm()
const authStore = useAuthStore()

const tenants = ref([])
const loading = ref(true)
const searchQuery = ref('')
const viewDialogVisible = ref(false)
const editDialogVisible = ref(false)
const selectedTenant = ref(null)
const editingTenant = ref(null)
const editForm = ref({
  company_name: '',
  contact_email: '',
  contact_phone: '',
  address: ''
})

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

function viewTenant(tenant) {
  selectedTenant.value = tenant
  viewDialogVisible.value = true
}

function editTenant(tenant) {
  editingTenant.value = tenant
  editForm.value = {
    company_name: tenant.company_name || '',
    contact_email: tenant.contact_email || '',
    contact_phone: tenant.contact_phone || '',
    address: tenant.address || ''
  }
  editDialogVisible.value = true
}

async function saveTenant() {
  if (!editingTenant.value) return
  try {
    await tenantsAPI.update(editingTenant.value.id, {
      company_name: editForm.value.company_name,
      contact_email: editForm.value.contact_email,
      contact_phone: editForm.value.contact_phone,
      address: editForm.value.address
    })
    toast.add({ severity: 'success', summary: 'Updated', detail: 'Tenant updated successfully', life: 3000 })
    editDialogVisible.value = false
    await loadTenants()
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.response?.data?.detail || 'Could not update tenant', life: 3000 })
  }
}

function confirmDeleteTenant(tenant) {
  confirm.require({
    message: `Delete tenant "${tenant.company_name}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await tenantsAPI.delete(tenant.id)
        toast.add({ severity: 'success', summary: 'Deleted', detail: 'Tenant deleted successfully', life: 3000 })
        await loadTenants()
      } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: e.response?.data?.detail || 'Could not delete tenant', life: 3000 })
      }
    }
  })
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

.sa-status-cell {
  display: flex;
  justify-content: center;
}

.sa-action-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.sa-table-action .p-button {
  height: 32px;
  width: 32px;
  min-width: 32px;
}

.sa-edit-form {
  display: grid;
  gap: 16px;
}

.sa-edit-form .field label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #334155;
}

.sa-tenant-detail-grid {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 12px 20px;
  padding: 16px 0;
}

.sa-detail-label {
  font-weight: 700;
  color: #334155;
}
</style>

