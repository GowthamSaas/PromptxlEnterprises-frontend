<template>
  <div class="ai-top-navbar">
    <div class="title-area">
      <h3>AI Workspace</h3>
      <p>Connect services, manage providers and generate apps.</p>
    </div>

    <div class="nav-actions">
      <Button label="Connectors" :outlined="route.path !== '/connectors'" size="small" @click="goTo('/connectors')" />
      <Button label="LLM Providers" :outlined="route.path !== '/llm/providers'" size="small" @click="goTo('/llm/providers')" />
      <Button label="Create App" :outlined="route.path !== '/create-app/guide'" size="small" @click="goTo('/create-app/guide')" />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()

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
</style>
