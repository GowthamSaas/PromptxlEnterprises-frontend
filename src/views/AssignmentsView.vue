<template>
  <div class="management-page assignments-page">
    <div class="page-header">
      <div class="page-heading">
        <span class="section-label">Assignment Center</span>
        <h1>Application Assignments</h1>
      </div>
    </div>

    <div class="assignment-container">
      <Card class="user-select-card">
        <template #title>
          <div class="card-title-row">
            <span class="card-title">Select User</span>
            <span class="card-meta">1 result is available</span>
          </div>
        </template>
        <template #content>
          <div
    style="
        display:flex;
        align-items:center;
        gap:12px;
        margin-bottom:16px;
    "
>
    <IconField
        iconPosition="left"
        style="flex:1;"
    >
        <InputIcon class="pi pi-search" />

        <InputText
            v-model="userSearch"
            placeholder="Search users..."
            style="width:100%;"
        />
    </IconField>

    <Button
        icon="pi pi-refresh"
        severity="secondary"
        outlined
        rounded
        @click="usersStore.fetchUsers()"
    />
</div>

<Listbox
    v-model="selectedUser"
    :options="filteredUsers"
    optionLabel="full_name"
    class="w-full user-listbox"
    :listStyle="{ maxHeight: '100%' }"
>
            <template #option="{ option }">
              <div class="user-option">
                <div>
                  <strong>{{ option.full_name }}</strong>
                  <p class="user-role-label">{{ option.role }}</p>
                </div>
                <Tag :value="option.role" size="small" />
              </div>
            </template>
          </Listbox>
        </template>
      </Card>

      <Card class="apps-assign-card">
        <template #title>
          <div class="card-title-row">
            <span class="card-title">
              <span v-if="selectedUser">Applications for {{ selectedUser.full_name }}</span>
              <span v-else>No selected item</span>
            </span>
            <span class="card-meta">Select a user</span>
          </div>
        </template>
        <template #content>
          <div v-if="!selectedUser" class="empty-state">
            <i class="pi pi-arrow-left"></i>
            <p>Select a user to manage their applications</p>
          </div>

           <div v-else>
            <div
                style="
                    display:flex;
                    align-items:center;
                    gap:6px;
                    margin-bottom:16px;
                "
            >
                <IconField
                    iconPosition="left"
                    style="flex:1;"
                >
                    <InputIcon class="pi pi-search" />
 
                    <InputText
                        v-model="searchQuery"
                        placeholder="Search applications by name or description"
                        style="width:100%;"
                    />
                </IconField>
 
                <Button
                    icon="pi pi-refresh"
                    severity="secondary"
                    outlined
                    rounded
                    @click="applicationsStore.fetchApplications()"
                />
            </div>
            
            <div class="apps-checklist">
              <div v-for="app in applications" :key="app.id" class="app-checkbox">
                <Checkbox 
                  :inputId="'app-' + app.id" 
                  :value="app.id" 
                  v-model="assignedAppIds"
                  @change="handleAssignmentChange(app.id)"
                />
                <label :for="'app-' + app.id" class="app-label">
                  <img :src="app.icon_url" :alt="app.name" />
                  <div>
                    <strong>{{ app.name }}</strong>
                    <span>{{ app.description || 'No description' }}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useUsersStore } from '../stores/users'
import { useApplicationsStore } from '../stores/applications'
import { assignmentsAPI } from '../services/api'
import Card from 'primevue/card'
import Listbox from 'primevue/listbox'
import Checkbox from 'primevue/checkbox'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const userSearch = ref('')
const toast = useToast()
const usersStore = useUsersStore()
const applicationsStore = useApplicationsStore()

const searchQuery = ref('')
const filteredUsers = computed(() => {
    const query = userSearch.value.trim().toLowerCase()

    return usersStore.users
        .filter(user => user.role === 'user')
        .filter(user => {
            if (!query) return true

            return (
                user.full_name?.toLowerCase().includes(query) ||
                user.email?.toLowerCase().includes(query)
            )
        })
})
const applications = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return applicationsStore.applications
  return applicationsStore.applications.filter(app =>
    app.name?.toLowerCase().includes(query) ||
    app.description?.toLowerCase().includes(query)
  )
})

const selectedUser = ref(null)
const assignedAppIds = ref([])
const originalAssignedIds = ref([])

// Load user assignments when user is selected
watch(selectedUser, async (user) => {
  if (!user) {
    assignedAppIds.value = []
    return
  }
  
  try {
    const response = await assignmentsAPI.getUserAssignments(user.id)
    assignedAppIds.value = response.data.map(a => a.application_id)
    originalAssignedIds.value = [...assignedAppIds.value]
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load assignments', life: 3000 })
  }
})

async function handleAssignmentChange(appId) {
  if (!selectedUser.value) return
  
  const isNowAssigned = assignedAppIds.value.includes(appId)
  const wasAssigned = originalAssignedIds.value.includes(appId)
  
  try {
    if (isNowAssigned && !wasAssigned) {
      // Assign
      await assignmentsAPI.assign({
        user_id: selectedUser.value.id,
        application_ids: [appId]
      })
      originalAssignedIds.value.push(appId)
      toast.add({ severity: 'success', summary: 'Assigned', detail: 'Application assigned', life: 2000 })
    } else if (!isNowAssigned && wasAssigned) {
      // Unassign
      await assignmentsAPI.remove(selectedUser.value.id, appId)
      originalAssignedIds.value = originalAssignedIds.value.filter(id => id !== appId)
      toast.add({ severity: 'info', summary: 'Removed', detail: 'Assignment removed', life: 2000 })
    }
  } catch (error) {
    // Revert on error
    if (isNowAssigned) {
      assignedAppIds.value = assignedAppIds.value.filter(id => id !== appId)
    } else {
      assignedAppIds.value.push(appId)
    }
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail || 'Failed to update', life: 3000 })
  }
}

onMounted(() => {
  usersStore.fetchUsers()
  applicationsStore.fetchApplications()
})
</script>

<style scoped>
/* ── Page-specific layout ── */
.assignment-container {
    display:grid;
    grid-template-columns:360px 1fr;
    gap:24px;
    height:calc(100vh - 180px);
}

.user-select-card,
.apps-assign-card {
    height: 100%;
}

.user-select-card :deep(.p-card),
.apps-assign-card :deep(.p-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
}

:deep(.p-card-body) {
    flex: 1;
    display: flex;
    
    overflow: hidden;
    flex-direction: column;
}

:deep(.p-card-content) {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.user-listbox { 
  border: none !important;
  background: transparent !important;
}

.user-listbox {
    flex: 1;
    min-height: 0;
}

.user-select-card :deep(.p-listbox) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
}

.user-select-card :deep(.p-listbox-list-wrapper) {
    flex: 1;
    overflow-y: auto;
}

:deep(.p-listbox-item) {
  border-radius: 12px;
  margin-bottom: 4px;
  padding: 12px 16px !important;
}

.apps-checklist {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 0;
  max-height: 520px;
  overflow-y: auto;
  padding-right: 4px;
}

.card-title-row { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  width: 100%;
}

.card-title { 
  font-size: 1.1rem; 
  font-weight: 700; 
  color: var(--clr-text-dark); 
}

.card-meta { 
  font-size: .75rem; 
  color: var(--clr-text-muted); 
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.user-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
}

.user-option div:first-child {
  display: flex;
  flex-direction: column;
}

.user-option strong {
  font-size: 0.95rem;
  color: var(--clr-text-dark);
  line-height: 1.2;
}

.user-role-label { 
  font-size: 0.75rem; 
  color: var(--clr-text-muted); 
  margin-top: 2px;
}

.apps-checklist { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
}

.app-checkbox {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  background: #f8fafc;
  border: 1px solid var(--clr-border-soft);
  border-radius: 14px;
  transition: all 0.2s ease;
}

.app-checkbox:hover {
  background: #fff;
  border-color: var(--clr-primary-border);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
}

.app-label { 
  display: flex; 
  align-items: center; 
  gap: 14px; 
  cursor: pointer; 
  flex: 1; 
}

.app-label img {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  object-fit: contain;
}

.app-label strong { 
  display: block; 
  font-size: 0.95rem; 
  color: var(--clr-text-dark); 
}

.app-label span { 
  font-size: .82rem; 
  color: var(--clr-text-muted); 
}

@media (max-width: 960px) { 
  .assignment-container { grid-template-columns: 1fr; } 
}
</style>
