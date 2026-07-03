<template>
  <Card class="provider-card">
    <template #content>
      <div class="row row-between">
        <div class="row">
          <Avatar icon="pi pi-bolt" shape="square" size="large" class="openai-avatar" />
          <div>
            <h3 class="title">OpenAI</h3>
            <small class="subtitle">Connect your OpenAI API for GPT models and more.</small>
          </div>
        </div>

        <Tag :severity="provider.connected ? 'success' : 'secondary'" :value="provider.connected ? 'Connected' : 'Not Connected'" />
      </div>

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
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Password from 'primevue/password'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Message from 'primevue/message'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

const props = defineProps({ provider: { type: Object, required: true }, loading: { type: Boolean, default: false } })
const emit = defineEmits(['connect', 'disconnect'])
const apiKey = ref('')

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
