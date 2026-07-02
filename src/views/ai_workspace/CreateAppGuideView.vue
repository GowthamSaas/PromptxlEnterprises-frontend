<template>
  <div class="create-app-guide">
    <h2>Create Custom App — Quick Guide</h2>
    <p class="subtitle">Follow these steps to connect services, add LLM providers, and scaffold your app.</p>

    <div class="guide-grid">
      <Card class="guide-card" :class="{ active: selectedSection === 'connectors' }" @click="selectSection('connectors')">
        <template #title>
          <div class="card-title"><i class="pi pi-sitemap"></i> Connectors</div>
        </template>
        <p>Link external services (Supabase, GitHub, Vercel) to enable deployment and storage.</p>
        <Button label="Go to Connectors" class="p-mt-4" @click.stop="goTo('/connectors')" />
      </Card>

      <Card class="guide-card" :class="{ active: selectedSection === 'llm' }" @click="selectSection('llm')">
        <template #title>
          <div class="card-title"><i class="pi pi-cog"></i> LLM Providers</div>
        </template>
        <p>Connect your OpenAI / Anthropic / Google keys to allow generation and runtime calls.</p>
        <Button label="Go to LLM Providers" class="p-mt-4" @click.stop="goTo('/llm/providers')" />
      </Card>

      <Card class="guide-card" :class="{ active: selectedSection === 'createApp' }" @click="selectSection('createApp')">
        <template #title>
          <div class="card-title"><i class="pi pi-plus-circle"></i> Create App</div>
        </template>
        <p>Describe the app you want to generate and use templates to scaffold a project.</p>
        <Button label="Go to Create App" class="p-mt-4" @click.stop="goTo('/create-app/createapp')" />
      </Card>
    </div>

    <div class="detail-card p-mt-6" :key="selectedSection" v-if="selectedInfo">
      <div class="detail-title"><i :class="selectedInfo.icon"></i> {{ selectedInfo.title }}</div>
      <p class="detail-description">{{ selectedInfo.description }}</p>
      <div class="detail-steps" v-if="selectedInfo.steps?.length">
        <div v-for="(step, index) in selectedInfo.steps" :key="index" class="step-item">
          <div class="step-number">{{ index + 1 }}</div>
          <div>
            <div class="step-label">{{ step.title }}</div>
            <p class="step-text">{{ step.text }}</p>
          </div>
        </div>
      </div>
      <div class="detail-action">
        <Button :label="selectedInfo.buttonText || 'Continue'" class="p-button-secondary" @click="goTo(selectedInfo.navPath || '/connectors')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'

const router = useRouter()
const selectedSection = ref('connectors')

const sections = {
  connectors: {
    icon: 'pi pi-sitemap',
    title: 'Connectors — Step-by-step guide',
    description: 'Set up external services so deployments, storage, and code sync work smoothly.',
    steps: [
      { title: 'Link Supabase', text: 'Add your Supabase project credentials and verify database access.' },
      { title: 'Connect GitHub', text: 'Authorize GitHub to manage repository creation and commits.' },
      { title: 'Add Vercel', text: 'Add deployment credentials so generated apps can be published.' }
    ],
    buttonText: 'Open Connectors',
    navPath: '/connectors'
  },
  llm: {
    icon: 'pi pi-cog',
    title: 'LLM Providers — Step-by-step guide',
    description: 'Configure language model providers and make sure API access is ready.',
    steps: [
      { title: 'Add provider keys', text: 'Enter your OpenAI, Anthropic, or Gemini keys securely.' },
      { title: 'Test model access', text: 'Run a quick test call to confirm the provider is reachable.' },
      { title: 'Set model policies', text: 'Choose the right model and set usage limits for reliability.' }
    ],
    buttonText: 'Open LLM Providers',
    navPath: '/llm/providers'
  },
  createApp: {
    icon: 'pi pi-plus-circle',
    title: 'Create App — Step-by-step guide',
    description: 'Choose a template and provide the app details to generate your project.',
    steps: [
      { title: 'Choose a template', text: 'Select the app type that best matches your use case.' },
      { title: 'Configure settings', text: 'Pick the connectors and provider the app will use.' },
      { title: 'Generate the app', text: 'Review the scaffolded result and deploy it when ready.' }
    ],
    buttonText: 'Open Create App',
    navPath: '/create-app/createapp'
  }
}

const selectedInfo = computed(() => sections[selectedSection.value] || sections.connectors)

function goTo(path) {
  router.push(path)
}

function selectSection(section) {
  selectedSection.value = section
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
.guide-card {
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.guide-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
}
.guide-card.active {
  border: 1px solid #4f46e5;
  box-shadow: 0 16px 36px rgba(79, 70, 229, 0.16);
}
.card-title {
  display:flex;
  gap:8px;
  align-items:center;
  font-weight:600;
}
.detail-card {
  padding: 24px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
}
.detail-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 14px;
}
.detail-description {
  color: #475569;
  margin-bottom: 20px;
}
.detail-steps {
  display: grid;
  gap: 14px;
}
.step-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 16px;
  align-items: start;
}
.step-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
  font-weight: 700;
}
.step-label {
  font-weight: 700;
  margin-bottom: 6px;
}
.step-text {
  color: #64748b;
  margin: 0;
}
.detail-action {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}
</style>
