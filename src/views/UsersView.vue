<template>
  <div class="management-page">
    <div class="page-header">
      <div class="page-heading">
        <span class="section-label">Admin Console</span>
        <h1>Users Management</h1>
      </div>
      <Button label="Add User" icon="pi pi-plus" class="header-action" @click="openDialog()" />
    </div>

    <div class="management-panel">

<div  style="
        display:flex;
        align-items:center;
        gap:12px;
        margin-bottom:18px;
    ">

    <IconField iconPosition="left"
        style="
            flex:1;
            width:100%;
        ">
        <InputIcon class="pi pi-search" />

        <InputText
            v-model="searchQuery"
            placeholder="Search Users..."
            class="sa-search-input"
        />

    </IconField>

    <Button
        icon="pi pi-refresh"
        severity="secondary"
        outlined
        rounded
        :loading="loading"
        @click="loadUsers"
    />

</div>

      <DataTable 
      :value="filteredUsers" 
      :loading="loading"
      stripedRows
      rowHover 
      responsiveLayout="scroll"
      removableSort
      sortMode="multiple"
      :paginator="filteredUsers.length > 10"
      :rows="10"
      paginator-template="PrevPageLink PageLinks NextPageLink"
      >
      <Column field="full_name" header="Name" sortable />
      <Column field="email" header="Email" sortable />
      <Column field="role" header="Role" sortable>
        <template #body="{ data }">
          <Tag :value="data.role" :severity="getRoleSeverity(data.role)" />
        </template>
      </Column>
      <Column field="is_active" header="Status" sortable>
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
        @click="viewUser(data)"
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

    <!-- User Dialog -->
    <Dialog v-model:visible="dialogVisible" :header="editingUser ? 'Edit User' : 'Add User'" modal style="width: 450px" dismissableMask>
      <div class="field">
        <label for="fullName">Full Name</label>
        <InputText id="fullName" v-model="form.full_name" class="w-full" placeholder="Enter user's name" />
      </div>
      <div class="field">
        <label for="email">Email Address</label>
        <InputText id="email" v-model="form.email" type="email" class="w-full" placeholder="user@example.com" />
      </div>
      <div class="field" v-if="!editingUser">
        <label for="password">Initial Password</label>
        <Password id="password" v-model="form.password" class="w-full" :feedback="false" toggleMask placeholder="••••••••" />
      </div>

     <div class="field field-row-inline">
  <label for="active">Account Active Status</label>
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
        <Button label="Save Changes" class="modal-save-btn" @click="saveUser" :loading="saving" />
      </template>
    </Dialog>
    <Dialog
  v-model:visible="viewDialogVisible"
  header="User Details"
  modal
  :style="{ width: '600px' }"
>
  <div style="padding: 10px 0">

    <div style="display:flex; margin-bottom:20px;">
      <div style="width:180px; font-weight:600;">
        Full Name
      </div>
      <div>
        {{ selectedUser?.full_name }}
      </div>
    </div>

    <div style="display:flex; margin-bottom:20px;">
      <div style="width:180px; font-weight:600;">
        Email Address
      </div>
      <div>
        {{ selectedUser?.email }}
      </div>
    </div>

    <div style="display:flex; margin-bottom:20px;">
      <div style="width:180px; font-weight:600;">
        Role
      </div>
      <div>
        <Tag
          :value="selectedUser?.role"
          :severity="getRoleSeverity(selectedUser?.role)"
        />
      </div>
    </div>

    <div style="display:flex; margin-bottom:20px;">
      <div style="width:180px; font-weight:600;">
        Status
      </div>
      <div>
        <Tag
          :value="selectedUser?.is_active ? 'Active' : 'Inactive'"
          :severity="selectedUser?.is_active ? 'success' : 'danger'"
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
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const toast = useToast()
const confirm = useConfirm()
const usersStore = useUsersStore()

const loading = computed(() => usersStore.loading)

const searchQuery = ref('')
const viewDialogVisible = ref(false)
const selectedUser = ref(null)
const dialogVisible = ref(false)
const editingUser = ref(null)
const saving = ref(false)
const form = ref({
  full_name: '',
  email: '',
  password: '',
  role: 'user',
  is_active: true
})

const filteredUsers = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()

    return usersStore.users
        .filter(user => user.role === 'user')
        .filter(user => {
            if (!q) return true

            return [
                user.full_name,
                user.email,
                user.role,
                user.is_active ? 'active' : 'inactive'
            ]
            .some(value =>
                value?.toString().toLowerCase().includes(q)
            )
        })
})


function viewUser(user) {
  selectedUser.value = user
  viewDialogVisible.value = true
}

async function loadUsers() {
    await usersStore.fetchUsers()
}


function getRoleSeverity(role) {
  const map = { owner: 'danger', admin: 'warning', user: 'info' }
  return map[role] || 'info'
}

function openDialog(user = null) {
  editingUser.value = user
  if (user) {
    form.value = { ...user, password: '' }
  } else {
    form.value = { full_name: '', email: '', password: '', role: 'user', is_active: true }
  }
  dialogVisible.value = true
}

async function saveUser() {
  saving.value = true
  try {
    if (editingUser.value) {
      const updateData = { ...form.value }
      if (!updateData.password) delete updateData.password
      await usersStore.updateUser(editingUser.value.id, updateData)
      toast.add({ severity: 'success', summary: 'Success', detail: 'User updated', life: 3000 })
    } else {
      await usersStore.createUser(form.value)
      toast.add({ severity: 'success', summary: 'Success', detail: 'User created', life: 3000 })
    }
    dialogVisible.value = false
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail || 'Failed to save', life: 3000 })
  } finally {
    saving.value = false
  }
}

function confirmDelete(user) {
  confirm.require({
    message: `Delete user "${user.full_name}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await usersStore.deleteUser(user.id)
        toast.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted', life: 3000 })
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail, life: 3000 })
      }
    }
  })
}

onMounted(loadUsers)
</script>


<style scoped>
/* All common styles are in main.css */
</style>

