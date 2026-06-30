<template>
  <div class="management-page">
    <div class="page-header">
      <div class="page-heading">
        <span class="section-label">Owner Workspace</span>
        <h1>Admins Management</h1>
      </div>
      <Button label="Add Admin" icon="pi pi-plus" class="header-action" @click="openDialog()" />
    </div>

    <div class="management-panel">
      <DataTable :value="admins" :loading="loading" stripedRows>
        <Column field="full_name" header="Name" />
        <Column field="email" header="Email" />
        <Column field="is_active" header="Status">
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
                @click="viewAdmin(data)"
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

      <!-- Admin Dialog -->
      <Dialog v-model:visible="dialogVisible" :header="editingAdmin ? 'Edit Admin' : 'Add Admin'" modal
        style="width: 450px" dismissableMask>
        <div class="field">
          <label for="fullName">Full Name</label>
          <InputText id="fullName" v-model="form.full_name" class="w-full" placeholder="Enter full name" />
        </div>
        <div class="field">
          <label for="email">Email Address</label>
          <InputText id="email" v-model="form.email" type="email" class="w-full" placeholder="admin@example.com" />
        </div>
        <div class="field" v-if="!editingAdmin">
          <label for="password">Initial Password</label>
          <Password id="password" v-model="form.password" class="w-full" :feedback="false" toggleMask
            placeholder="••••••••" />
        </div>
        <div class="field field-row-inline">
          <label for="active">Account Active Status</label>
          <InputSwitch id="active" v-model="form.is_active" />
        </div>
        <template #footer>
          <Button label="Cancel" text class="modal-cancel-btn" @click="dialogVisible = false" />
          <Button label="Save Changes" class="modal-save-btn" @click="saveAdmin" :loading="saving" />
        </template>
      </Dialog>

    <Dialog
    v-model:visible="viewDialogVisible"
    header="Admin Details"
    modal
    :style="{ width: '600px' }"
>
    <div style="padding: 10px 0">

        <div style="display:flex; margin-bottom:20px;">
            <div style="width:180px; font-weight:600;">
                Full Name
            </div>
            <div>
                {{ selectedAdmin?.full_name }}
            </div>
        </div>

        <div style="display:flex; margin-bottom:20px;">
            <div style="width:180px; font-weight:600;">
                Email Address
            </div>
            <div>
                {{ selectedAdmin?.email }}
            </div>
        </div>

        <div style="display:flex; margin-bottom:20px;">
            <div style="width:180px; font-weight:600;">
                Role
            </div>
            <div>
                <Tag
                    :value="selectedAdmin?.role"
                    severity="info"
                />
            </div>
        </div>

        <div style="display:flex; margin-bottom:20px;">
            <div style="width:180px; font-weight:600;">
                Status
            </div>
            <div>
                <Tag
                    :value="selectedAdmin?.is_active ? 'Active' : 'Inactive'"
                    :severity="selectedAdmin?.is_active ? 'success' : 'danger'"
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
  </div>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useUsersStore } from '../stores/users'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import InputSwitch from 'primevue/inputswitch'
import Tag from 'primevue/tag'

const toast = useToast()
const confirm = useConfirm()
const usersStore = useUsersStore()

const loading = computed(() => usersStore.loading)
const admins = computed(() => usersStore.users.filter(u => u.role === 'admin'))


const viewDialogVisible = ref(false)  //view updates
const selectedAdmin = ref(null)

const dialogVisible = ref(false)
const editingAdmin = ref(null)
const saving = ref(false)
const form = ref({
  full_name: '',
  email: '',
  password: '',
  role: 'admin',
  is_active: true
})

function viewAdmin(admin) {
  selectedAdmin.value = admin
  viewDialogVisible.value = true
}

function openDialog(admin = null) {
  editingAdmin.value = admin
  if (admin) {
    form.value = { ...admin, password: '' }
  } else {
    form.value = { full_name: '', email: '', password: '', role: 'admin', is_active: true }
  }
  dialogVisible.value = true
}

async function saveAdmin() {
  saving.value = true
  try {
    if (editingAdmin.value) {
      const updateData = { ...form.value }
      if (!updateData.password) delete updateData.password
      await usersStore.updateUser(editingAdmin.value.id, updateData)
      toast.add({ severity: 'success', summary: 'Success', detail: 'Admin updated', life: 3000 })
    } else {
      await usersStore.createUser(form.value)
      toast.add({ severity: 'success', summary: 'Success', detail: 'Admin created', life: 3000 })
    }
    dialogVisible.value = false
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail || 'Failed to save', life: 3000 })
  } finally {
    saving.value = false
  }
}

function confirmDelete(admin) {
  confirm.require({
    message: `Delete admin "${admin.full_name}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await usersStore.deleteUser(admin.id)
        toast.add({ severity: 'success', summary: 'Deleted', detail: 'Admin deleted', life: 3000 })
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail, life: 3000 })
      }
    }
  })
}

onMounted(() => {
  usersStore.fetchUsers()
})
</script>

<style scoped>
/* All common styles are in main.css */
</style>
