<template>
  <div class="surface-0 p-4">
    <div class="flex flex-column gap-4">
      <div class="flex flex-column gap-2">
        <h2 class="text-3xl font-bold text-900">Create Custom App — Quick Guide</h2>
        <p class="text-600 text-base">Follow these steps to connect services, add LLM providers, and scaffold your app.</p>
      </div>

      <div class="grid">
  <!-- Connector -->
  <div class="col-12 md:col-4">
    <Card
      class="h-full cursor-pointer w-full"
      @click="selectSection('connectors')"
      :pt="{
        root: { class: 'hover:shadow-2 transition-all duration-300 h-full' },
        body: { class: 'p-3 h-full' },
        content: { class: 'p-0 h-full' }
      }"
    >
      <template #content>
        <div class="flex flex-column align-items-center justify-content-center text-center gap-2 py-3">
          <i class="pi pi-sitemap text-2xl text-green-500"></i>

          <div class="font-semibold text-900">
            Connector
          </div>

          <div class="text-500 text-sm">
            Connect external services
          </div>
        </div>
      </template>
    </Card>
  </div>

  <!-- LLM -->
  <div class="col-12 md:col-4">
    <Card
      class="h-full cursor-pointer w-full"
      @click="selectSection('llm')"
      :pt="{
        root: { class: 'hover:shadow-2 transition-all duration-300 h-full' },
        body: { class: 'p-3 h-full' },
        content: { class: 'p-0 h-full' }
      }"
    >
      <template #content>
        <div class="flex flex-column align-items-center justify-content-center text-center gap-2 py-3">
          <i class="pi pi-cog text-2xl text-purple-500"></i>

          <div class="font-semibold text-900">
            LLM Provider
          </div>

          <div class="text-500 text-sm">
            Add and manage LLM APIs
          </div>
        </div>
      </template>
    </Card>
  </div>

  <!-- Create App -->
  <div class="col-12 md:col-4">
    <Card
      class="h-full cursor-pointer w-full"
      @click="selectSection('createApp')"
      :pt="{
        root: { class: 'hover:shadow-2 transition-all duration-300 h-full' },
        body: { class: 'p-3 h-full' },
        content: { class: 'p-0 h-full' }
      }"
    >
      <template #content>
        <div class="flex flex-column align-items-center justify-content-center text-center gap-2 py-3">
          <i class="pi pi-plus-circle text-2xl text-cyan-500"></i>

          <div class="font-semibold text-900">
            Create App
          </div>

          <div class="text-500 text-sm">
            Scaffold and generate your app
          </div>
        </div>
      </template>
    </Card>
  </div>
</div>

      <Card class="mt-3" :pt="{ body: { class: 'p-0' }, content: { class: 'p-0' } }" :style="{ backgroundColor: '#f3effc' }">
        <template #content>
          <div class="flex align-items-center gap-3 p-4" style="border-bottom: 1px solid #e9ecef;">
            <div style="width: 50px; height: 50px; min-width: 50px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(124, 58, 237, 0.15); color: #7c3aed; font-size: 1.5rem;">
              <i :class="selectedInfo.icon"></i>
            </div>
            <div class="flex-1">
              <div class="text-900 font-bold text-xl">{{ selectedInfo.title }}</div>
              <div class="text-500 text-sm mt-1">{{ selectedInfo.description }}</div>
            </div>
          </div>

          <div class="p-5">
            <div v-for="(step, index) in selectedInfo.steps" :key="index" class="flex gap-4 mb-3">
              <div class="flex flex-column align-items-center flex-shrink-0">
                <div 
                  class="flex align-items-center justify-content-center text-white font-bold"
                  style="width: 48px; height: 48px; min-width: 48px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); z-index: 10; font-size: 1.1rem;"
                >
                  {{ index + 1 }}
                </div>
                <div 
                  v-if="index < selectedInfo.steps.length - 1"
                  style="width: 2px; height: 50px; background: linear-gradient(180deg, #c5b3e3 0%, #dcc9f0 100%); margin-top: 0.25rem;"
                ></div>
              </div>
              <div class="flex-1 pt-1">
                <div class="text-900 font-semibold mb-2" style="font-size: 0.95rem;">{{ step.title }}</div>
                <div class="text-500" style="font-size: 0.85rem; line-height: 1.5;">{{ step.text }}</div>
              </div>
            </div>

            <div class="flex justify-content-end mt-4">
              <Button 
                :label="selectedInfo.buttonText || 'Continue'" 
                icon="pi pi-arrow-right" 
                icon-pos="right"
                class="p-button-rounded p-button-outlined"
                :pt="{ root: { class: 'border-2' }, label: { class: 'font-semibold' } }"
                @click="goTo(selectedInfo.navPath || '/connectors')" 
              />
            </div>
          </div>
        </template>
      </Card>
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
/* Minimal CSS - mostly using PrimeVue utilities */
:deep(.p-button-rounded.p-button-outlined) {
  background: white !important;
  border-color: #7c3aed !important;
  color: #7c3aed !important;
}

:deep(.p-button-rounded.p-button-outlined:hover) {
  background: #f3effc !important;
}
</style>