<template>
  <div class="superadmin-login-wrapper">
    <!-- Animated background glowing blobs -->
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>

    <div class="superadmin-login-container">
      <Card class="superadmin-login-card">
        <template #content>
          <div class="header-section">
            <div class="core-badge">
              <i class="pi pi-shield"></i>
              <span>SYSTEM COMMAND</span>
            </div>
            <h1>Superadmin Portal</h1>
            <p>Access global configuration and administration</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="input-wrapper">
    <i class="pi pi-envelope input-icon"></i>

    <InputText
        v-model="email"
        placeholder="root@promptxl.enterprise"
        fluid
        class="custom-input"
    />
</div>

<div class="input-wrapper">
    <i class="pi pi-lock input-icon"></i>

    <Password
        v-model="password"
        :feedback="false"
        toggleMask
        fluid
        inputClass="custom-input"
        placeholder="••••••••" 
        class="custom-password"
    />
</div>

            <Button type="submit" :loading="loading" label="Authenticate" icon="pi pi-angle-right" iconPos="right" class="cyber-btn w-full" />
          </form>

          <div class="card-footer">
            <router-link to="/login" class="tenant-link">
              <i class="pi pi-arrow-left"></i>
              Return to Tenant Login
            </router-link>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  try {
    await authStore.login({ email: email.value, password: password.value })
    if (!authStore.isSuperAdmin) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Superadmin access required', life: 5000 })
      authStore.logout()
      return
    }
    toast.add({ severity: 'success', summary: 'Success', detail: 'Welcome Superadmin!', life: 3000 })
    router.push('/superadmin')
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail || 'Login failed', life: 3000 })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.superadmin-login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #06030c;
  position: relative;
  overflow: hidden;
  padding: 24px;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #fff;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.12;
  pointer-events: none;
  z-index: 1;
}

.orb-1 { width: 450px; height: 450px; background: #a855f7; top: -100px; left: -100px; animation: drift-orb 15s ease-in-out infinite alternate; }
.orb-2 { width: 550px; height: 550px; background: #3b82f6; bottom: -150px; right: -150px; animation: drift-orb 18s ease-in-out infinite alternate-reverse; }
.orb-3 { width: 320px; height: 320px; background: #ec4899; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.06; }

@keyframes drift-orb {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(60px, 40px) scale(1.15); }
}

.superadmin-login-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 450px;
}

.superadmin-login-card {
  background: rgba(12, 8, 24, 0.7) !important;
  backdrop-filter: blur(24px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 24px !important;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
  position: relative !important;
  overflow: hidden !important;
}

.superadmin-login-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 3px;
  background: linear-gradient(90deg, #a855f7, #3b82f6, #ec4899);
}

.superadmin-login-card :deep(.p-card-body) {
  padding: 44px 40px !important;
}

.superadmin-login-card :deep(.p-card-content) {
  padding: 0 !important;
}

.header-section {
  text-align: center;
  margin-bottom: 36px;
}

.core-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.25);
  color: #c084fc;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 100px;
  letter-spacing: 0.08em;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(168, 85, 247, 0.05);
}

.core-badge i { font-size: 0.75rem; }

.header-section h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.header-section p {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0;
  line-height: 1.45;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #64748b;
  font-size: 1rem;
  z-index: 10;
  pointer-events: none;
  transition: color 0.2s;
}

.input-wrapper:focus-within .input-icon { color: #a855f7; }

.card-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.tenant-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tenant-link i { font-size: 0.75rem; transition: transform 0.2s ease; }
.tenant-link:hover { color: #c084fc; }
.tenant-link:hover i { transform: translateX(-3px); }

@media (max-width: 480px) {
  .superadmin-login-card :deep(.p-card-body) {
    padding: 32px 24px !important;
  }

  .header-section h1 {
    font-size: 1.75rem;
  }
}

@media (max-width: 380px) {
  .superadmin-login-card :deep(.p-card-body) {
    padding: 24px 16px !important;
  }

  .header-section h1 {
    font-size: 1.5rem;
  }

  .superadmin-login-wrapper {
    padding: 12px;
  }
}

.input-wrapper{
    position:relative;
}

.input-icon{
    position:absolute;
    left:14px;
    top:50%;
    transform:translateY(-50%);
    z-index:2;
    color:#94a3b8;
}

:deep(.custom-input){
    height:52px;
    padding-left:42px !important;
}

:deep(.custom-password){
    width:100%;
}

:deep(.custom-password .p-inputtext){
    width:100%;
    padding-left:42px !important;
    padding-right:42px !important;
}

:deep(.custom-password .p-password-toggle-mask-icon){
    right:14px;
}
</style>
