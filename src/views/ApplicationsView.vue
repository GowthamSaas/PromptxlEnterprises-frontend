  <template>
    <div class="management-page applications-page">
      <div class="page-header">
        <div class="page-heading">
          <span class="section-label">Application Center</span>
          <h1>Applications</h1>
        </div>
        <Button label="Add Application" icon="pi pi-plus" class="header-action" @click="openDialog()" />
      </div>

      <div class="management-panel">
        <div
    style="
      display:flex;
      align-items:center;
      gap:12px;
      margin-bottom:18px;
    "
  >

    <IconField
      iconPosition="left"
      style="
        flex:1;
        width:100%;
      "
    >

      <InputIcon class="pi pi-search" />

      <InputText
        v-model="searchQuery"
        placeholder="Search Applications..."
        style="width:100%;"
      />

    </IconField>

    <Button
      icon="pi pi-refresh"
      severity="secondary"
      outlined
      rounded
      :loading="loading"
      @click="loadApplications"
    />

  </div>

  <DataTable
    :value="filteredApplications"
    :loading="loading"
    stripedRows
    rowHover
    responsiveLayout="scroll"
    removableSort
    sortMode="multiple"
    :paginator="filteredApplications.length > 10"
    :rows="10"
    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
  >
        <Column header="Icon" style="width: 80px">
          <template #body="{ data }">
            <img :src="data.icon_url" :alt="data.name" style="width: 40px; height: 40px; object-fit: contain" />
          </template>
        </Column>
        <Column
    field="name"
    header="Name"
    sortable
  />
        <Column field="description" header="Description" />
        <Column field="launch_url" header="URL">
          <template #body="{ data }">
            <a :href="data.launch_url" target="_blank" class="url-link">{{ data.launch_url }}</a>
          </template>
        </Column>
        <Column
    field="is_active"
    header="Status"
    sortable
  >
          <template #body="{ data }">
            <Tag :value="data.is_active ? 'Active' : 'Inactive'" :severity="data.is_active ? 'success' : 'danger'" />
          </template>
        </Column>
        <Column header="Actions" style="width: 120px">
    <template #body="{ data }">
      <div
        style="
          display:flex;
          align-items:center;
          gap:16px;
          margin-left:-10px;
        "
      >
        <i
          class="pi pi-eye"
          style="cursor:pointer;color:#0ea5e9;"
          @click="viewApplication(data)"
        />

        <i
          class="pi pi-pencil"
          style="cursor:pointer;color:#6366f1;"
          @click="openDialog(data)"
        />

        <i
          class="pi pi-trash"
          style="cursor:pointer;color:#ef4444;"
          @click="confirmDelete(data)"
        />
      </div>
    </template>
  </Column>
      </DataTable>
      </div>

      <!-- Application Dialog -->
      <Dialog v-model:visible="dialogVisible" :header="editingApp ? 'Edit Application' : 'Add Application'" modal style="width: 500px" dismissableMask>
        <div class="field">
          <label for="name">App Name *</label>
          <InputText id="name" v-model="form.name" class="w-full" placeholder="e.g. ChatGPT, Midjourney" />
        </div>
        <div class="field">
          <label for="description">Description (Optional)</label>
          <Textarea id="description" v-model="form.description" rows="3" class="w-full" placeholder="Briefly describe what this app does" />
        </div>
        <div class="field">
          <label for="icon_url">Icon URL *</label>
          <InputText id="icon_url" v-model="form.icon_url" class="w-full" placeholder="https://example.com/icon.png" />
        </div>
        <div class="field">
          <label for="launch_url">Launch URL *</label>
          <InputText id="launch_url" v-model="form.launch_url" class="w-full" placeholder="https://app.example.com" />
        </div>


      <div class="field field-row-inline">
    <label for="active">Application Active Status</label>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <InputSwitch
        id="active"
        v-model="form.is_active"
        :pt="{
          slider: {
            style: {
              backgroundColor: form.is_active ? '#16a34a' : '#d1d5db'
            }
          }
        }"
      />
      <span
        :style="{
          fontSize: '0.85rem',
          fontWeight: '600',
          color: form.is_active ? '#16a34a' : '#9ca3af'
        }"
      >
        {{ form.is_active ? 'Active' : 'Inactive' }}
      </span>
    </div>
  </div>


        <template #footer>
          <Button
      label="Cancel"
      outlined
      severity="secondary"
      @click="dialogVisible = false"
    />
          <Button label="Save Changes" class="modal-save-btn" @click="saveApp" :loading="saving" />
        </template>
      </Dialog>

      <Dialog
    v-model:visible="viewDialogVisible"
    header="Application Details"
    modal
    :style="{ width: '650px' }"
  >
    <div style="padding:10px 0">

      <div style="display:flex; margin-bottom:20px;">
        <div style="width:180px; font-weight:600;">
          Application Icon
        </div>
        <div>
          <img
            :src="selectedApp?.icon_url"
            :alt="selectedApp?.name"
            style="width:48px;height:48px;object-fit:contain"
          />
        </div>
      </div>

      <div style="display:flex; margin-bottom:20px;">
        <div style="width:180px; font-weight:600;">
          Application Name
        </div>
        <div>
          {{ selectedApp?.name }}
        </div>
      </div>

      <div style="display:flex; margin-bottom:20px;">
        <div style="width:180px; font-weight:600;">
          Description
        </div>
        <div>
          {{ selectedApp?.description || 'N/A' }}
        </div>
      </div>

      <div style="display:flex; margin-bottom:20px;">
        <div style="width:180px; font-weight:600;">
          Launch URL
        </div>
        <div>
          <a
            :href="selectedApp?.launch_url"
            target="_blank"
          >
            {{ selectedApp?.launch_url }}
          </a>
        </div>
      </div>

      <div style="display:flex; margin-bottom:20px;">
        <div style="width:180px; font-weight:600;">
          Status
        </div>
        <div>
          <Tag
            :value="selectedApp?.is_active ? 'Active' : 'Inactive'"
            :severity="selectedApp?.is_active ? 'success' : 'danger'"
          />
        </div>
      </div>

    </div>

    <template #footer>
      <Button
        label="Close"
        icon="pi pi-times"
        text
        @click="viewDialogVisible = false"
      />
    </template>
  </Dialog>
    </div>
  </template>

  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useToast } from 'primevue/usetoast'
  import { useConfirm } from 'primevue/useconfirm'
  import { useApplicationsStore } from '../stores/applications'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Button from 'primevue/button'
  import Dialog from 'primevue/dialog'
  import InputText from 'primevue/inputtext'
  import Textarea from 'primevue/textarea'
  import InputSwitch from 'primevue/inputswitch'
  import Tag from 'primevue/tag'
  import IconField from 'primevue/iconfield'
  import InputIcon from 'primevue/inputicon'


  const toast = useToast()
  const confirm = useConfirm()
  const applicationsStore = useApplicationsStore()

  const loading = computed(() => applicationsStore.loading)
  const applications = computed(() => applicationsStore.applications)
  const searchQuery = ref('')

  const viewDialogVisible = ref(false)
  const selectedApp = ref(null)
  const dialogVisible = ref(false)
  const editingApp = ref(null)
  const saving = ref(false)
  const form = ref({
    name: '',
    description: '',
    icon_url: '',
    launch_url: '',
    is_active: true
  })

  const filteredApplications = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()

    return applications.value.filter(app => {
      if (!q) return true

      return app.name?.toLowerCase().includes(q)
    })
  })

  async function loadApplications() {
    await applicationsStore.fetchApplications()
  }

  function viewApplication(app) {
    selectedApp.value = app
    viewDialogVisible.value = true
  }

  function openDialog(app = null) {
    editingApp.value = app
    if (app) {
      form.value = { ...app }
    } else {
      form.value = { name: '', description: '', icon_url: '', launch_url: '', is_active: true }
    }
    dialogVisible.value = true
  }

  async function saveApp() {
    if (!form.value.name || !form.value.icon_url || !form.value.launch_url) {
      toast.add({ severity: 'warn', summary: 'Validation', detail: 'Please fill required fields', life: 3000 })
      return
    }
    
    saving.value = true
    try {
      if (editingApp.value) {
        await applicationsStore.updateApplication(editingApp.value.id, form.value)
        toast.add({ severity: 'success', summary: 'Success', detail: 'Application updated', life: 3000 })
      } else {
        await applicationsStore.createApplication(form.value)
        toast.add({ severity: 'success', summary: 'Success', detail: 'Application created', life: 3000 })
      }
      dialogVisible.value = false
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail || 'Failed to save', life: 3000 })
    } finally {
      saving.value = false
    }
  }

  function confirmDelete(app) {
    confirm.require({
      message: `Delete application "${app.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await applicationsStore.deleteApplication(app.id)
          toast.add({ severity: 'success', summary: 'Deleted', detail: 'Application deleted', life: 3000 })
        } catch (error) {
          toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail, life: 3000 })
        }
      }
    })
  }

  onMounted(loadApplications)
  </script>

  <style scoped>
  /* Page-specific: slight background tint */
  .applications-page { background: rgba(255, 255, 255, 0.96); }
  </style>
