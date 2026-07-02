<template>
  <Card class="provider-card">
    <template #title>
      <div class="card-title">
        <ProviderIcon :providerKey="provider.key" />
        <span>{{ provider.name }}</span>
      </div>
    </template>
    <template #content>
      <p>{{ provider.description }}</p>
      <div class="provider-key-form">
        <label class="field-label" :for="`apiKey-${provider.key}`">API Key</label>
        <Password
          :id="`apiKey-${provider.key}`"
          v-model="apiKey"
          :feedback="false"
          toggleMask
          class="api-key-input"
        />
        <div class="guide-text">
          <strong>How to get your API key:</strong>
          <template v-if="provider.key === 'openai'">
            <ol>
              <li>Go to OpenAI Platform → API Keys</li>
              <li>Click "Create new secret key"</li>
              <li>Give it a name (e.g., "AppGen Access")</li>
              <li>Copy and paste the key here</li>
            </ol>
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">Get API Key</a>
          </template>
          <template v-else-if="provider.key === 'gemini'">
            <ol>
              <li>Go to Google AI Studio → Get API Key</li>
              <li>Click "Create API Key"</li>
              <li>Select or create a Google Cloud project</li>
              <li>Copy and paste the key here</li>
            </ol>
            <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer">Get API Key</a>
          </template>
          <template v-else-if="provider.key === 'claude'">
            <ol>
              <li>Go to Anthropic Console → Settings → API Keys</li>
              <li>Click "Create Key"</li>
              <li>Give it a name (e.g., "AppGen Access")</li>
              <li>Copy and paste the key here</li>
            </ol>
            <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer">Get API Key</a>
          </template>
          <template v-else>
            <p>Paste your provider API key here.</p>
          </template>
        </div>
      </div>
      <div class="card-actions">
        <Button label="Connect" size="small" @click="connect" :disabled="!apiKey" />
        <ProviderStatus :connected="provider.connected" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Password from 'primevue/password'
import ProviderStatus from './ProviderStatus.vue'
import ProviderIcon from './ProviderIcon.vue'

const props = defineProps({ provider: Object })
const emit = defineEmits(['connect'])
const apiKey = ref('')

function connect() {
  emit('connect', { provider: props.provider.key, apiKey: apiKey.value })
}
</script>

<style scoped>
.provider-card {
  height: 100%;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.provider-key-form {
  margin-top: 16px;
}

.field-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.api-key-input {
  width: 100%;
  min-width: 0;
}

.guide-text {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.4;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
</style>
