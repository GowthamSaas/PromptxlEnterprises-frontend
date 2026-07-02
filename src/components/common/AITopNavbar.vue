<template>
  <div class="ai-top-navbar">
    <div class="title-area">
      <h3>AI Workspace</h3>
      <p>Connect services, manage providers and generate apps.</p>
    </div>

    <div class="nav-actions">
      <Button
        v-if="showGuideButton"
        label="Guide"
        :outlined="!isGuideActive"
        :class="{ active: isGuideActive }"
        size="small"
        @click="goTo('/create-app/guide')"
      />
      <Button
        label="Connectors"
        :outlined="!isConnectorsActive"
        :class="{ active: isConnectorsActive }"
        size="small"
        @click="goTo('/connectors')"
      />
      <Button
        label="LLM Providers"
        :outlined="!isLLMProvidersActive"
        :class="{ active: isLLMProvidersActive }"
        size="small"
        @click="goTo('/llm/providers')"
      />
      <Button
        label="Create App"
        :outlined="!isCreateAppActive"
        :class="{ active: isCreateAppActive }"
        size="small"
        @click="goTo('/create-app/createapp')"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()

const showGuideButton = computed(() => {
  return ['/connectors', '/llm/providers', '/create-app/createapp', '/create-app/guide'].includes(route.path)
})

const isGuideActive = computed(() => route.path === '/create-app/guide')
const isConnectorsActive = computed(() => route.path === '/connectors')
const isLLMProvidersActive = computed(() => route.path === '/llm/providers')
const isCreateAppActive = computed(() => route.path === '/create-app/createapp')

function goTo(path) {
  router.push(path)
}
</script>

<style scoped>
.ai-top-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
}

.title-area h3 {
  margin: 0;
  color: #0f172a;
}

.title-area p {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

.nav-actions {
  display: flex;
  gap: 10px;
}

.button-active,
.nav-actions .p-button.active {
  background: #4f46e5;
  color: #ffffff;
  border-color: #4f46e5;
}

.nav-actions .p-button.active:hover,
.nav-actions .p-button.active:focus,
.nav-actions .p-button.active:active {
  background: #4338ca;
  border-color: #4338ca;
}
</style>
