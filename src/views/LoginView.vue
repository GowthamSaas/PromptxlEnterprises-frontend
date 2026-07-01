<template>
  <!-- login-page-wrapper -->
  <div :style="{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at 50% 50%, #1e113a 0%, #0a0515 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem',
    fontFamily: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
    color: '#ffffff'
  }">

    <!-- bg-decorations -->
    <div :style="{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }">

      <!-- Stars -->
      <span
        v-for="(star, i) in [
          { top: '15%', left: '10%',   delay: '0s'   },
          { top: '25%', right: '15%',  delay: '1.5s' },
          { bottom: '20%', left: '15%',  delay: '3s'   },
          { bottom: '15%', right: '25%', delay: '4.5s' }
        ]"
        :key="i"
        :style="{
          position: 'absolute',
          color: 'rgba(255,255,255,0.15)',
          fontSize: '1.5rem',
          pointerEvents: 'none',
          animation: `float 6s ease-in-out ${star.delay} infinite`,
          top: star.top, left: star.left, right: star.right, bottom: star.bottom
        }"
      >✦</span>

      <!-- Rocket 1 -->
      <i class="pi pi-rocket" :style="{
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: '1.75rem',
        color: 'rgba(168,85,247,0.12)',
        top: '12%',
        left: '28%',
        transform: 'rotate(45deg)',
        animation: 'float-shape 8s ease-in-out infinite'
      }"></i>

      <!-- Rocket 2 -->
      <i class="pi pi-rocket" :style="{
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: '1.5rem',
        color: 'rgba(56,189,248,0.12)',
        bottom: '15%',
        right: '32%',
        transform: 'rotate(-135deg)',
        animation: 'float-shape-reverse 9s ease-in-out infinite'
      }"></i>
    </div>

    <!-- login-card-container -->
    <div class="login-card-container" :style="{
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      width: '100%',
      maxWidth: '1000px',
      background: 'rgba(15,18,30,0.45)',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
    }">

      <!-- login-info-panel -->
      <div class="login-info-panel" :style="{
        flex: 1,
        padding: '3.5rem',
        background: 'linear-gradient(135deg, rgba(27,13,45,0.95) 0%, rgba(18,9,32,0.98) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }">

        <!-- nextgen-badge -->
        <div :style="{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(168,85,247,0.1)',
          border: '1px solid rgba(168,85,247,0.25)',
          color: '#c084fc',
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '6px 14px',
          borderRadius: '100px',
          width: 'fit-content',
          marginBottom: '2rem',
          letterSpacing: '0.02em'
        }">
          <span :style="{ fontWeight: 'bold', color: '#c084fc' }">#</span>
          Next-Gen App Builder
        </div>

        <!-- main-heading -->
        <h1 :style="{
          fontSize: '2.5rem',
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#fff',
          margin: '0 0 1.2rem',
          letterSpacing: '-0.02em'
        }">
          Build faster.<br />
          <span class="gradient-text">Scale further.</span>
        </h1>

        <!-- panel-desc -->
        <p :style="{
          color: '#94a3b8',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          margin: '0 0 2.5rem',
          maxWidth: '420px'
        }">
          Experience the future of development with our AI-powered platform. Turn concepts into production-ready code in minutes.
        </p>

        <!-- features-list -->
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '16px' }">

          <!-- Feature 1 -->
          <div class="feature-item" :style="{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '16px',
            padding: '18px 20px',
            transition: 'background 0.3s, border-color 0.3s'
          }">
            <div :style="{
              width: '42px', height: '42px', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: 'rgba(14,165,233,0.12)',
              border: '1px solid rgba(14,165,233,0.2)',
              color: '#38bdf8'
            }">
              <i class="pi pi-shield" style="font-size: 1.25rem;"></i>
            </div>
            <div>
              <h3 :style="{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', margin: '0 0 4px' }">Zero Lock-In</h3>
              <p :style="{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, lineHeight: 1.45 }">Full ownership of your code. Export standard React & Node.js projects anytime.</p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="feature-item" :style="{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '16px',
            padding: '18px 20px',
            transition: 'background 0.3s, border-color 0.3s'
          }">
            <div :style="{
              width: '42px', height: '42px', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: 'rgba(168,85,247,0.12)',
              border: '1px solid rgba(168,85,247,0.2)',
              color: '#c084fc'
            }">
              <i class="pi pi-bolt" style="font-size: 1.25rem;"></i>
            </div>
            <div>
              <h3 :style="{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', margin: '0 0 4px' }">Production-Ready Tools</h3>
              <p :style="{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, lineHeight: 1.45 }">Built-in authentication, database management, and one-click deployment.</p>
            </div>
          </div>

        </div>
      </div>

      <!-- login-form-panel -->
      <div class="login-form-panel" :style="{
        flex: 1,
        padding: '3.5rem',
        background: '#090a0f',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }">

        <h2 :style="{
          fontSize: '1.85rem', fontWeight: 700, color: '#fff',
          textAlign: 'center', margin: '0 0 6px', letterSpacing: '-0.01em'
        }">Welcome back</h2>

        <p :style="{ fontSize: '0.9rem', color: '#64748b', textAlign: 'center', margin: '0 0 2rem' }">
          Enter your credentials to access your workspace
        </p>

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

        <form @submit.prevent="handleLogin" :style="{ display: 'flex', flexDirection: 'column', gap: '16px' }">

          <!-- Email -->
          <div class="field-wrapper">
    <i class="pi pi-envelope field-icon"></i>

    <InputText
        v-model="email"
        type="email"
        placeholder="Email address"
        fluid
        class="custom-input"
    />
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
    />
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

        <p :style="{
          fontSize: '0.72rem', color: '#475569',
          textAlign: 'center', margin: '2rem 0 0', lineHeight: 1.45
        }">
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

async function handleLogin() {
  loading.value = true
  try {
    await authStore.login({ email: email.value, password: password.value })
    toast.add({ severity: 'success', summary: 'Success', detail: 'Welcome back!', life: 3000 })
    router.push('/')
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.detail || 'Login failed', life: 3000 })
  } finally {
    loading.value = false
  }
}

function handleGoogleSignIn() {
  toast.add({ severity: 'info', summary: 'Google Sign In', detail: 'Google Sign In is not configured for this enterprise workspace.', life: 3000 })
}
</script>

<style scoped>
/* gradient-text: -webkit-text-fill-color cannot be set via inline style */
.gradient-text {
  background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

/* hover: cannot be done inline */
.feature-item:hover {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

/* focus-within: cannot be done inline */
.field-wrapper:focus-within .field-icon {
  color: #a855f7;
}

/* field-icon needs focus-within interaction */
.field-wrapper{
    position:relative;
    width:100%;
}

.field-icon{
    position:absolute;
    left:14px;
    top:50%;
    transform:translateY(-50%);
    z-index:10;
    color:#94a3b8;
    pointer-events:none;
}

/* Email */

:deep(.custom-input){
    width:100%;
    height:52px;
    padding-left:42px !important;
    box-sizing:border-box;
}

/* Password wrapper */

:deep(.custom-password){
    width:100%;
}

/* PrimeVue 4 wrapper */

:deep(.custom-password .p-inputtext){
    width:100%;
    height:52px;
    padding-left:42px !important;
    padding-right:42px !important;
    box-sizing:border-box;
}

/* Eye Icon */

:deep(.custom-password .p-password-toggle-mask-icon){
    right:14px;
    color:#94a3b8;
}

/* Mobile */

@media(max-width:768px){

    :deep(.custom-input),
    :deep(.custom-password .p-inputtext){

        height:48px;
        font-size:14px;

    }

}

/* responsive: cannot be done inline */
@media (max-width: 860px) {
  .login-card-container { flex-direction: column; max-width: 480px; }
  .login-info-panel     { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 2.5rem 2rem; }
  .login-form-panel     { padding: 2.5rem 2rem; }
}

/* keyframes: must stay in CSS */
@keyframes float-shape {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50%       { transform: translateY(-15px) rotate(50deg); }
}
@keyframes float-shape-reverse {
  0%, 100% { transform: translateY(0) rotate(-135deg); }
  50%       { transform: translateY(15px) rotate(-130deg); }
}

/* PrimeVue deep overrides */
:deep(.custom-divider) { margin: 1.75rem 0 !important; }
:deep(.custom-divider::before),
:deep(.custom-divider::after) { border-top: 1px solid rgba(255,255,255,0.08) !important; }
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
</style>

<!-- Unscoped: required so inline animation can resolve this keyframe -->
<style>
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-12px) rotate(8deg); }
}
</style>