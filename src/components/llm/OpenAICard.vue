<template>
  <Card class="provider-card">
    <template #content>
      <div class="row row-between">
        <div class="row">
          <Avatar icon="pi pi-bolt" shape="square" size="large" class="openai-avatar" />
          <div>
            <h3 class="title">OpenAI</h3>
           <small class="subtitle">
  Owner-managed OpenAI provider for your workspace.
</small>
          </div>
        </div>

       <Tag
  :severity="provider.ownerConnected ? 'success' : 'danger'"
  :value="provider.ownerConnected ? 'Connected' : 'Not Connected'"
  rounded
/>
      </div>

      <!-- ============================= -->
      <!-- ADMIN VIEW (Read Only) -->
      <!-- ============================= -->
    <!-- ============================= -->
<!-- ADMIN VIEW (Read Only) -->
<!-- ============================= -->
<template v-if="isAdminView">

  <!-- Connected -->
  <Card
    v-if="provider.ownerConnected"
    :pt="{
      body: { style: { padding: '18px' } },
      content: { style: { padding: 0 } }
    }"
    style="border:1px solid #dcfce7;background:#f0fdf4;"
  >
    <template #content>

      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
        "
      >

        <div
          style="
            display:flex;
            align-items:center;
            gap:12px;
          "
        >

          <i
            class="pi pi-check-circle"
            style="
              font-size:28px;
              color:#16a34a;
            "
          ></i>

          <div>

            <div
              style="
                font-weight:600;
                color:#14532d;
              "
            >
              Connected
            </div>

            <div
              style="
                font-size:13px;
                color:#166534;
                margin-top:4px;
              "
            >
              API key is active and ready to use.
            </div>

          </div>

        </div>

        <Tag
          value="Connected"
          severity="success"
          rounded
        />

      </div>

    </template>
  </Card>

  <!-- Not Connected -->
  <Card
    v-else
    :pt="{
      body: { style: { padding: '18px' } },
      content: { style: { padding: 0 } }
    }"
    style="border:1px solid #fee2e2;background:#fef2f2;"
  >
    <template #content>

      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
        "
      >

        <div
          style="
            display:flex;
            align-items:center;
            gap:12px;
          "
        >

          <i
            class="pi pi-times-circle"
            style="
              font-size:28px;
              color:#dc2626;
            "
          ></i>

          <div>

            <div
              style="
                font-weight:600;
                color:#991b1b;
              "
            >
              Not Connected
            </div>

            <div
              style="
                font-size:13px;
                color:#b91c1c;
                margin-top:4px;
              "
            >
              Owner has not connected an OpenAI API key yet.
            </div>

          </div>

        </div>

        <Tag
          value="Not Available"
          severity="danger"
          rounded
        />

      </div>
        
    </template>
  </Card>
  <template v-if="provider.ownerConnected">
   <Divider style="margin:16px 0;" />

<div
  style="
    display:flex;
    flex-direction:column;
    gap:10px;
    font-size:14px;
  "
>

  <div
    style="
      display:flex;
      justify-content:space-between;
    "
  >
    <span style="color:#64748b;">Connected By</span>
    <strong>{{ provider.connectedBy }}</strong>
  </div>

  <div
    style="
      display:flex;
      justify-content:space-between;
    "
  >
    <span style="color:#64748b;">Connected On</span>
    <strong>{{ formatDate(provider.connectedOn) }}</strong>
  </div>

  <div
    style="
      display:flex;
      justify-content:space-between;
    "
  >
    <span style="color:#64748b;">Last Used</span>
    <strong>{{ formatDate(provider.lastUsed) }}</strong>
  </div>

</div>
</template>
</template>

      <!-- ============================= -->
      <!-- OWNER VIEW (Full Configuration) -->
      <!-- ============================= -->
      <template v-else>
        <template v-if="!provider.connected">
          <label class="field-label">OpenAI API Key</label>
          <InputGroup class="field">
            <InputGroupAddon><i class="pi pi-key" /></InputGroupAddon>
            <Password v-model="apiKey" :disabled="loading" toggleMask :feedback="false" placeholder="sk-..." />
          </InputGroup>

          <Button :label="`Connect OpenAI`" icon="pi pi-link" severity="success" :loading="loading" :disabled="loading || !apiKey" fluid class="field" @click="connectProvider" />

          <Message severity="success" :closable="false" icon="pi pi-sparkles">
            <strong class="guide-title">How to get your API key</strong>
            <ol class="guide-list">
              <li>Go to OpenAI Platform → API Keys</li>
              <li>Click "Create new secret key"</li>
              <li>Give it a name (e.g. "AppGen Access")</li>
              <li>Copy and paste the key here</li>
            </ol>
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener" class="row guide-link">
              <i class="pi pi-external-link" /> Get API Key
            </a>
          </Message>
        </template>

        <template v-else>
          <Message severity="info" :closable="false" icon="pi pi-check-circle">
            <div class="row row-between">
              <div>
                <strong class="guide-title">API Key Connected</strong>
                <small>Your OpenAI API is ready to use</small>
              </div>
              <Button label="Disconnect" icon="pi pi-trash" severity="danger" text :loading="loading" :disabled="loading" @click="disconnectProvider" />
            </div>
          </Message>
        </template>
      </template>
    </template>
  </Card>
</template>

<script setup>
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Password from 'primevue/password'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Message from 'primevue/message'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useAuthStore } from '../../stores/auth'
import Divider from 'primevue/divider'
const props = defineProps({ provider: { type: Object, required: true }, loading: { type: Boolean, default: false } })
const emit = defineEmits(['connect', 'disconnect'])
const apiKey = ref('')

const authStore = useAuthStore()

// Role-based view control
const isAdminView = computed(() => authStore.isAdmin && !authStore.isOwner)
const canConfigure = computed(() => authStore.isOwner)

function connectProvider() {
  if (!apiKey.value.trim()) {
    emit('connect', { error: 'Please enter your API Key.' })
    return
  }
  emit('connect', { provider: 'openai', api_key: apiKey.value })
  apiKey.value = ''
}

function disconnectProvider() {
  emit('disconnect', 'openai')
}

function formatDate(value) {
  if (!value) return '-'

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })
  watchEffect(() => {
  console.log('OpenAI Card', props.provider)
})
}
</script>

<style scoped>
.provider-card {
  position: relative;
  min-height: 100%;
  border-radius: 1.25rem;
  padding: 1.5rem;
  background: #ffffff;
  box-shadow: 0 20px 42px rgba(15, 23, 42, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.provider-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.12);
}
.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.row-between {
  justify-content: space-between;
}
.title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}
.subtitle {
  display: block;
  margin-top: 0.25rem;
  color: #64748b;
  font-size: 0.93rem;
}
.field-label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #334155;
}
.field {
  margin-top: 1rem;
  width: 100%;
}
:deep(.p-inputgroup) {
  width: 100%;
}
.guide-title {
  display: block;
  margin-bottom: 0.75rem;
  color: #0f172a;
  font-weight: 700;
}
.guide-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #475569;
  line-height: 1.75;
}
.guide-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #15803d;
  font-weight: 600;
  margin-top: 0.75rem;
  text-decoration: none;
}
.guide-link:hover {
  text-decoration: underline;
}
.openai-avatar {
  background: #d1fae5;
  color: #047857;
}
</style>
