<template>
  <div class="sa-page">
    <!-- Page Header -->
    <div class="sa-page-header">
      <div>
        <h1 class="sa-page-title">Create Tenant</h1>
        <p class="sa-page-sub">Onboard a new company and register its first administrator account.</p>
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
                placeholder="e.g. acme-corp"
                class="sa-input"
                :class="{ 'p-invalid': errors.tenantId }"
                autocomplete="off"
              />
              <small v-if="errors.tenantId" class="sa-error-msg">{{ errors.tenantId }}</small>
              <small v-else class="sa-hint">Unique identifier for the tenant (slug format recommended).</small>
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
        <div class="sa-panel">
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

      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth'
import { tenantsAPI } from '../services/api'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Divider from 'primevue/divider'

const router = useRouter()
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

const errors = reactive({
  tenantId: '',
  companyName: '',
  contactEmail: '',
  ownerFullName: '',
  ownerEmail: '',
  ownerPassword: ''
})

function validate() {
  let valid = true

  errors.tenantId = tenantId.value.trim() ? '' : 'Tenant ID is required.'
  errors.companyName = companyName.value.trim() ? '' : 'Company name is required.'
  errors.contactEmail = contactEmail.value.trim() ? '' : 'Contact email is required.'
  errors.ownerFullName = ownerFullName.value.trim() ? '' : 'Owner full name is required.'
  errors.ownerEmail = ownerEmail.value.trim() ? '' : 'Owner email is required.'
  errors.ownerPassword = ownerPassword.value.length >= 8 ? '' : 'Password must be at least 8 characters.'

  for (const k in errors) {
    if (errors[k]) valid = false
  }
  return valid
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  try {
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
    router.push('/superadmin/tenants')
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail || 'Unable to create tenant', life: 5000 })
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

