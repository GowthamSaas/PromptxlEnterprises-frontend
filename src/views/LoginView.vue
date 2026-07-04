<template>
  <div class="login-page-wrapper">

    <!-- bg-decorations -->
    <div class="bg-decorations">
      <!-- Stars -->
      <span
        v-for="(star, i) in [
          { top: '15%', left: '10%',   delay: '0s'   },
          { top: '25%', right: '15%',  delay: '1.5s' },
          { bottom: '20%', left: '15%',  delay: '3s'   },
          { bottom: '15%', right: '25%', delay: '4.5s' }
        ]"
        :key="i"
        class="star-anim"
        :style="{
          animationDelay: star.delay,
          top: star.top, left: star.left, right: star.right, bottom: star.bottom
        }"
      >✦</span>

      <!-- Rocket 1 -->
      <i class="pi pi-rocket rocket-1"></i>

      <!-- Rocket 2 -->
      <i class="pi pi-rocket rocket-2"></i>
    </div>

    <!-- login-card-container -->
    <div class="login-card-container">

      <!-- login-info-panel -->
      <div class="login-info-panel">

        <!-- nextgen-badge -->
        <div class="nextgen-badge">
          <span class="badge-hash">#</span>
          Next-Gen App Builder
        </div>

        <!-- main-heading -->
        <h1 class="main-heading">
          Build faster.<br />
          <span class="gradient-text">Scale further.</span>
        </h1>

        <!-- panel-desc -->
        <p class="panel-desc">
          Experience the future of development with our AI-powered platform. Turn concepts into production-ready code in minutes.
        </p>

        <!-- features-list -->
        <div class="features-list">

          <!-- Feature 1 -->
          <div class="feature-item">
            <div class="feature-icon feature-icon-cyan">
              <i class="pi pi-shield"></i>
            </div>
            <div>
              <h3>Zero Lock-In</h3>
              <p>Full ownership of your code. Export standard React & Node.js projects anytime.</p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="feature-item">
            <div class="feature-icon feature-icon-purple">
              <i class="pi pi-bolt"></i>
            </div>
            <div>
              <h3>Production-Ready Tools</h3>
              <p>Built-in authentication, database management, and one-click deployment.</p>
            </div>
          </div>

        </div>
      </div>

      <!-- login-form-panel -->
      <div class="login-form-panel">

        <h2 class="form-title">Welcome back</h2>
        <p class="form-subtitle">Enter your credentials to access your workspace</p>

        <Button
          type="button"
          label="Continue with Google"
          icon="pi pi-google"
          class="google-btn"
          @click="handleGoogleSignIn"
        />

        <Divider align="center" class="custom-divider">
          <span>OR CONTINUE WITH EMAIL</span>
        </Divider>

        <form @submit.prevent="handleLogin" class="login-form">

          <!-- Email -->
            <div class="field-wrapper">
            <i class="pi pi-envelope field-icon"></i>

            <InputText
              v-model="email"
              type="email"
              placeholder="Email address"
              fluid
              class="custom-input"
              :class="{ 'p-invalid': emailError }"
            />

            <small
              v-if="emailError"
              class="p-error validation-error"
            >
              {{ emailError }}
            </small>
          </div>

          <!-- Password -->
          <div class="field-wrapper">
          <i class="pi pi-lock field-icon"></i>

          <Password
            v-model="password"
            placeholder="Password"
            :feedback="false"
            toggleMask
            fluid
            class="custom-password"
            inputClass="custom-password-input"
            :class="{ 'p-invalid': passwordError }"
          />

          <small
            v-if="passwordError"
            class="p-error validation-error"
          >
            {{ passwordError }}
          </small>
        </div>

          <Button
            type="submit"
            label="Sign In"
            icon="pi pi-arrow-right"
            iconPos="right"
            :loading="loading"
            class="submit-btn w-full"
          />
        </form>

        <p class="form-footer-text">
          By continuing, you agree to our Terms and Privacy Policy
        </p>
      </div>
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
import Divider from 'primevue/divider'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const emailError = ref('')
const passwordError = ref('')

async function handleLogin() {

  // Email Required
  if (!email.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Validation',
      detail: 'Email is required',
      life: 3000
    })
    return
  }

  // Email Format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email.value)) {
    toast.add({
      severity: 'warn',
      summary: 'Validation',
      detail: 'Enter a valid email address',
      life: 3000
    })
    return
  }

  // Password Required
  if (!password.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Validation',
      detail: 'Password is required',
      life: 3000
    })
    return
  }

  // Password Length
  if (password.value.length < 6) {
    toast.add({
      severity: 'warn',
      summary: 'Validation',
      detail: 'Password must be at least 6 characters',
      life: 3000
    })
    return
  }

  loading.value = true

  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Welcome back!',
      life: 3000
    })

    router.push('/')

  } catch (error) {
  toast.add({
    severity: 'error',
    summary: 'Login Failed',
    detail:
      error.response?.data?.detail ||
      'Invalid email or password',
    life: 3000
  })
} finally {
    loading.value = false
  }
}

function handleGoogleSignIn() {
  toast.add({ severity: 'info', summary: 'Google Sign In', detail: 'Google Sign In is not configured for this enterprise workspace.', life: 3000 })
}
</script>

<style scoped>
/* ─────────────────────────────────────────────
   LAYOUT & CONTAINER
───────────────────────────────────────────── */
.login-page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 50%, #1e113a 0%, #0a0515 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.bg-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.login-card-container {
  position: relative;
  z-index: 2;
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: rgba(15, 18, 30, 0.45);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.login-info-panel {
  flex: 1;
  padding: 3.5rem;
  background: linear-gradient(135deg, rgba(27, 13, 45, 0.95) 0%, rgba(18, 9, 32, 0.98) 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-form-panel {
  flex: 1;
  padding: 3.5rem;
  background: #090a0f;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ─────────────────────────────────────────────
   INFO PANEL STYLES
───────────────────────────────────────────── */
.nextgen-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.25);
  color: #c084fc;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 100px;
  width: fit-content;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
}

.badge-hash {
  font-weight: bold;
  color: #c084fc;
}

.main-heading {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.15;
  color: #fff;
  margin: 0 0 1.2rem;
  letter-spacing: -0.02em;
}

.panel-desc {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 2.5rem;
  max-width: 420px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 18px 20px;
  transition: background 0.3s, border-color 0.3s;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

.feature-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon-cyan {
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.2);
  color: #38bdf8;
}

.feature-icon-purple {
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.2);
  color: #c084fc;
}

.feature-icon i { font-size: 1.25rem; }

.feature-item h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px;
}

.feature-item p {
  font-size: 0.82rem;
  color: #94a3b8;
  margin: 0;
  line-height: 1.45;
}

/* ─────────────────────────────────────────────
   FORM PANEL STYLES
───────────────────────────────────────────── */
.form-title {
  font-size: 1.85rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}

.form-subtitle {
  font-size: 0.9rem;
  color: #64748b;
  text-align: center;
  margin: 0 0 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-wrapper {
  position: relative;
  width: 100%;
}

.field-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: #94a3b8;
  pointer-events: none;
  transition: color 0.2s;
}

.field-wrapper:focus-within .field-icon {
  color: #a855f7;
}

.form-footer-text {
  font-size: 0.72rem;
  color: #475569;
  text-align: center;
  margin: 2rem 0 0;
  line-height: 1.45;
}

/* ─────────────────────────────────────────────
   PRIMEVUE & INPUT OVERRIDES
───────────────────────────────────────────── */
.gradient-text {
  background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

:deep(.custom-divider) { margin: 1.75rem 0 !important; }
:deep(.custom-divider::before),
:deep(.custom-divider::after) { border-top: 1px solid rgba(255, 255, 255, 0.08) !important; }
:deep(.custom-divider .p-divider-content) {
  background: #090a0f !important;
  color: #64748b !important;
  font-size: 0.65rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  padding: 0 1rem !important;
}

:deep(.google-btn .p-button-icon) {
  color: #ea4335 !important;
  font-size: 1.1rem !important;
}

:deep(.custom-input) {
  width: 100%;
  height: 52px;
  padding-left: 42px !important;
  box-sizing: border-box;
}

:deep(.custom-password) {
  width: 100%;
}

:deep(.custom-password .p-inputtext) {
  width: 100%;
  height: 52px;
  padding-left: 42px !important;
  padding-right: 42px !important;
  box-sizing: border-box;
}

:deep(.custom-password .p-password-toggle-mask-icon) {
  right: 14px;
  color: #94a3b8;
}
.validation-error {
  display: block;
  margin-top: 6px;
  margin-left: 4px;
  font-size: 0.8rem;
}

/* ─────────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────────── */
.star-anim {
  position: absolute;
  color: rgba(255, 255, 255, 0.15);
  font-size: 1.5rem;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}

.rocket-1 {
  position: absolute;
  pointer-events: none;
  font-size: 1.75rem;
  color: rgba(168, 85, 247, 0.12);
  top: 12%;
  left: 28%;
  transform: rotate(45deg);
  animation: float-shape 8s ease-in-out infinite;
}

.rocket-2 {
  position: absolute;
  pointer-events: none;
  font-size: 1.5rem;
  color: rgba(56, 189, 248, 0.12);
  bottom: 15%;
  right: 32%;
  transform: rotate(-135deg);
  animation: float-shape-reverse 9s ease-in-out infinite;
}

@keyframes float-shape {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50%      { transform: translateY(-15px) rotate(50deg); }
}

@keyframes float-shape-reverse {
  0%, 100% { transform: translateY(0) rotate(-135deg); }
  50%      { transform: translateY(15px) rotate(-130deg); }
}

/* ─────────────────────────────────────────────
   RESPONSIVE DESIGN
───────────────────────────────────────────── */
/* Tablet */
@media (max-width: 900px) {
  .login-card-container {
    flex-direction: column;
    max-width: 480px;
    margin: 0 auto;
  }
  .login-info-panel {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 2.5rem 2rem;
  }
  .login-form-panel {
    padding: 2.5rem 2rem;
  }
  .main-heading { font-size: 2.1rem; }
}

/* Mobile */
@media (max-width: 540px) {
  .login-page-wrapper {
    padding: 1rem;
  }
  .login-info-panel,
  .login-form-panel {
    padding: 2rem 1.5rem;
  }
  .main-heading { font-size: 1.7rem; }
  .panel-desc { font-size: 0.85rem; margin-bottom: 1.5rem; }

  :deep(.custom-input),
  :deep(.custom-password .p-inputtext) {
    height: 48px;
    font-size: 14px;
  }
}

/* Small Mobile */
@media (max-width: 380px) {
  .login-info-panel { padding: 1.5rem; }
  .login-form-panel { padding: 1.5rem; }
  .feature-item { padding: 14px 12px; gap: 12px; }
  .form-title { font-size: 1.5rem; }
}
</style>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-12px) rotate(8deg); }
}
</style>
