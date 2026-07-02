<template>
  <div class="create-app-guide">
    <h2>Create Custom App — Quick Guide</h2>
    <p class="subtitle">Follow these steps to connect services, add LLM providers, and scaffold your app.</p>

    <div class="guide-grid">
      <Card class="guide-card">
        <template #title>
          <div class="card-title"><i class="pi pi-sitemap"></i> Connectors</div>
        </template>
        <p>Link external services (Supabase, GitHub, Vercel) to enable deployment and storage.</p>
        <Button label="Go to Connectors" class="p-mt-4" @click="goTo('/connectors')" />
      </Card>

      <Card class="guide-card">
        <template #title>
          <div class="card-title"><i class="pi pi-cog"></i> LLM Providers</div>
        </template>
        <p>Connect your OpenAI / Anthropic / Google keys to allow generation and runtime calls.</p>
        <Button label="Go to LLM Providers" class="p-mt-4" @click="goTo('/llm/providers')" />
      </Card>

      <Card class="guide-card">
        <template #title>
          <div class="card-title"><i class="pi pi-plus-circle"></i> Create App</div>
        </template>
        <p>Describe the app you want to generate and use templates to scaffold a project.</p>
        <Button label="Go to Create App" class="p-mt-4" @click="goTo('/create-app')" />
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'

const router = useRouter()
function goTo(path) {
  router.push(path)
}
</script>

<style scoped>
.create-app-guide {
  max-width: 1100px;
  margin: 8px auto;
}
.subtitle {
  color: #64748b;
  margin-bottom: 18px;
}
.guide-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.guide-card { padding: 16px }
.card-title { display:flex; gap:8px; align-items:center; font-weight:600 }
</style>
