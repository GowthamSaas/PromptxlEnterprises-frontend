<template>
  <div class="sa-page">
    <!-- Page Header -->
    <div class="sa-page-header">
      <div>
        <h1 class="sa-page-title">{{ editMode ? 'Edit Tenant' : 'Create Tenant' }}</h1>
        <p class="sa-page-sub">
          {{ editMode ? 'Update tenant details and keep the owner account unchanged.' : 'Onboard a new company and register its first administrator account.' }}
        </p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" novalidate>
      <div class="sa-form-grid">

        <!-- ── Left: Tenant Details ── -->
        <div class="sa-panel">
          <div class="sa-panel-header">
            <div class="sa-panel-icon">
              <i class="pi pi-building"></i>
            </div>
            <div>
              <h2 class="sa-panel-title">Tenant Details</h2>
              <p class="sa-panel-desc">Company and contact information for the new tenant.</p>
            </div>
          </div>

          <Divider class="sa-divider" />

          <div class="sa-fields">
            <div class="sa-field" :class="{ 'sa-field--error': errors.tenantId }">
              <label for="tenantId" class="sa-label">
                Tenant ID
                <span class="sa-required">*</span>
              </label>
              <InputText
                id="tenantId"
                v-model="tenantId"
                @input="markTenantIdTouched"
                placeholder="e.g. acme-corp"
                class="sa-input"
                :class="{ 'p-invalid': errors.tenantId }"
                autocomplete="off"
              />
              <small v-if="errors.tenantId" class="sa-error-msg">{{ errors.tenantId }}</small>
              <small v-else class="sa-hint">
                {{ editMode ? 'Unique identifier for the tenant.' : 'Auto-generated from company name unless edited.' }}
              </small>
            </div>

            <div class="sa-field" :class="{ 'sa-field--error': errors.companyName }">
              <label for="companyName" class="sa-label">
                Company Name
                <span class="sa-required">*</span>
              </label>
              <InputText
                id="companyName"
                v-model="companyName"
                placeholder="e.g. Acme Corporation"
                class="sa-input"
                :class="{ 'p-invalid': errors.companyName }"
              />
              <small v-if="errors.companyName" class="sa-error-msg">{{ errors.companyName }}</small>
            </div>

            <div class="sa-field-row">
              <div class="sa-field" :class="{ 'sa-field--error': errors.contactEmail }">
                <label for="contactEmail" class="sa-label">
                  Contact Email
                  <span class="sa-required">*</span>
                </label>
                <InputText
                  id="contactEmail"
                  v-model="contactEmail"
                  type="email"
                  placeholder="contact@company.com"
                  class="sa-input"
                  :class="{ 'p-invalid': errors.contactEmail }"
                />
                <small v-if="errors.contactEmail" class="sa-error-msg">{{ errors.contactEmail }}</small>
              </div>

              <div class="sa-field">
                <label for="contactPhone" class="sa-label">Contact Phone</label>
                <InputText
                  id="contactPhone"
                  v-model="contactPhone"
                  placeholder="+1 (555) 000-0000"
                  class="sa-input"
                />
              </div>
            </div>

            <div class="sa-field">
              <label for="address" class="sa-label">Address</label>
              <Textarea
                id="address"
                v-model="address"
                placeholder="123 Main St, City, State, ZIP"
                rows="3"
                class="sa-input"
                auto-resize
              />
            </div>
          </div>
        </div>

        <!-- ── Right: Owner Account ── -->
        <div class="sa-panel" v-if="!editMode">
          <div class="sa-panel-header">
            <div class="sa-panel-icon sa-panel-icon--violet">
              <i class="pi pi-user"></i>
            </div>
            <div>
              <h2 class="sa-panel-title">Owner Account</h2>
              <p class="sa-panel-desc">Primary administrator account for this tenant.</p>
            </div>
          </div>

          <Divider class="sa-divider" />

          <div class="sa-fields">
            <div class="sa-field" :class="{ 'sa-field--error': errors.ownerFullName }">
              <label for="ownerFullName" class="sa-label">
                Full Name
                <span class="sa-required">*</span>
              </label>
              <InputText
                id="ownerFullName"
                v-model="ownerFullName"
                placeholder="John Doe"
                class="sa-input"
                :class="{ 'p-invalid': errors.ownerFullName }"
              />
              <small v-if="errors.ownerFullName" class="sa-error-msg">{{ errors.ownerFullName }}</small>
            </div>

            <div class="sa-field" :class="{ 'sa-field--error': errors.ownerEmail }">
              <label for="ownerEmail" class="sa-label">
                Owner Email
                <span class="sa-required">*</span>
              </label>
              <InputText
                id="ownerEmail"
                v-model="ownerEmail"
                type="email"
                placeholder="owner@company.com"
                class="sa-input"
                :class="{ 'p-invalid': errors.ownerEmail }"
              />
              <small v-if="errors.ownerEmail" class="sa-error-msg">{{ errors.ownerEmail }}</small>
              <small v-else class="sa-hint">The owner will use this email to sign in.</small>
            </div>

            <div class="sa-field" :class="{ 'sa-field--error': errors.ownerPassword }">
              <label for="ownerPassword" class="sa-label">
                Password
                <span class="sa-required">*</span>
              </label>
              <Password
                id="ownerPassword"
                v-model="ownerPassword"
                placeholder="Min. 8 characters"
                toggleMask
                :feedback="true"
                promptLabel=""
                class="sa-input sa-password"
                :class="{ 'p-invalid': errors.ownerPassword }"
                input-class="w-full sa-password-input"
              />
              <small v-if="errors.ownerPassword" class="sa-error-msg">{{ errors.ownerPassword }}</small>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="sa-form-actions">
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              outlined
              @click="$router.push('/superadmin/tenants')"
            />
            <Button
              type="submit"
              label="Create Tenant"
              icon="pi pi-check"
              :loading="loading"
            />
          </div>
        </div>
        <div class="sa-panel" v-else>
          <div class="sa-panel-header">
            <div class="sa-panel-icon sa-panel-icon--violet">
              <i class="pi pi-pencil"></i>
            </div>
            <div>
              <h2 class="sa-panel-title">Edit Tenant</h2>
              <p class="sa-panel-desc">Update the tenant details and save changes.</p>
            </div>
          </div>

          <Divider class="sa-divider" />

          <div class="sa-fields">
            <div class="sa-field sa-panel-note">
              <p>Editing tenant details only. Owner credentials are not changed here.</p>
            </div>
          </div>

          <div class="sa-form-actions">
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              outlined
              @click="$router.push('/superadmin/tenants')"
            />
            <Button
              type="submit"
              label="Update Tenant"
              icon="pi pi-check"
              :loading="loading"
            />
          </div>
        </div>

      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth'
import { tenantsAPI } from '../services/api'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Divider from 'primevue/divider'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const authStore = useAuthStore()

const tenantId = ref('')
const companyName = ref('')
const contactEmail = ref('')
const contactPhone = ref('')
const address = ref('')
const ownerFullName = ref('')
const ownerEmail = ref('')
const ownerPassword = ref('')
const loading = ref(false)
const editMode = ref(false)
const editTenantData = ref(null)
const tenantIdTouched = ref(false)

function generateTenantId(source) {
  return source
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}

watch(companyName, (value) => {
  if (!editMode.value && !tenantIdTouched.value) {
    tenantId.value = generateTenantId(value)
  }
})

function markTenantIdTouched() {
  tenantIdTouched.value = true
}

const errors = reactive({
  tenantId: '',
  companyName: '',
  contactEmail: '',
  ownerFullName: '',
  ownerEmail: '',
  ownerPassword: ''
})

function initForm() {
  const editTenant = route.query.edit === '1' ? JSON.parse(window.sessionStorage.getItem('superadmin.editTenant') || 'null') : null
  if (editTenant) {
    editMode.value = true
    editTenantData.value = editTenant
    tenantId.value = editTenant.tenant_id || ''
    companyName.value = editTenant.company_name || ''
    contactEmail.value = editTenant.contact_email || ''
    contactPhone.value = editTenant.contact_phone || ''
    address.value = editTenant.address || ''
    ownerFullName.value = ''
    ownerEmail.value = ''
    ownerPassword.value = ''
  }
}

onMounted(initForm)

function validate() {
  let valid = true

  errors.tenantId = tenantId.value.trim() ? '' : 'Tenant ID is required.'
  errors.companyName = companyName.value.trim() ? '' : 'Company name is required.'
  errors.contactEmail = contactEmail.value.trim() ? '' : 'Contact email is required.'

  if (!editMode.value) {
    errors.ownerFullName = ownerFullName.value.trim() ? '' : 'Owner full name is required.'
    errors.ownerEmail = ownerEmail.value.trim() ? '' : 'Owner email is required.'
    errors.ownerPassword = ownerPassword.value.length >= 8 ? '' : 'Password must be at least 8 characters.'
  } else {
    errors.ownerFullName = ''
    errors.ownerEmail = ''
    errors.ownerPassword = ''
  }

  for (const k in errors) {
    if (errors[k]) valid = false
  }
  return valid
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  try {
    if (editMode.value && editTenantData.value?.id) {
      await tenantsAPI.update(editTenantData.value.id, {
        tenant_id: tenantId.value,
        company_name: companyName.value,
        contact_email: contactEmail.value,
        contact_phone: contactPhone.value,
        address: address.value
      })
      toast.add({ severity: 'success', summary: 'Tenant Updated', detail: `${companyName.value} has been updated successfully.`, life: 4000 })
    } else {
      await tenantsAPI.create({
        tenant_id: tenantId.value,
        company_name: companyName.value,
        contact_email: contactEmail.value,
        contact_phone: contactPhone.value,
        address: address.value,
        owner_full_name: ownerFullName.value,
        owner_email: ownerEmail.value,
        owner_password: ownerPassword.value
      })
      toast.add({ severity: 'success', summary: 'Tenant Created', detail: `${companyName.value} has been onboarded successfully.`, life: 4000 })
    }
    router.push('/superadmin/tenants')
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail || 'Unable to save tenant', life: 5000 })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Page-specific overrides */
.sa-page { max-width: 1200px; }

.sa-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

.sa-panel .sa-fields {
  padding-bottom: 1.5rem;
}

.sa-form-actions {
  margin-top: 2rem;
  position: relative;
  z-index: 2;
}

:deep(.p-password-panel) {
  z-index: 1 !important;
}

/* Fix: Reset padding-left on sa-inputs that inherit the global 1.25rem rule */
:deep(.sa-input.p-inputtextarea) {
  padding-left: 0.75rem !important;
}

/* Fix: Password input placeholder padding */
:deep(.sa-password-input) {
  padding-left: 0.75rem !important;
  width: 100% !important;
}

/* Fix: Hide PrimeVue password panel prompt entirely when empty */
:deep(.sa-password .p-password-panel .p-password-prompt) {
  display: none !important;
}
</style>

