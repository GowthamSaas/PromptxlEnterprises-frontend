<template>
  <div class="create-app-guide surface-0 p-4">
    <div class="flex flex-column gap-4">
      <div class="flex flex-column gap-2">
        <h2 class="text-3xl font-bold text-900">Create Custom App — Quick Guide</h2>
        <p class="text-600 text-base">Follow these steps to connect services, add LLM providers, and scaffold your app.</p>
      </div>

      <div class="flex gap-3 w-full">
        <div class="flex-1 min-w-0">
          <Card
            class="surface-card border-round-xl shadow-2 guide-card transition-duration-200 hover:shadow-4 cursor-pointer"
            :class="{ 'border-primary': selectedSection === 'connectors' }"
            @click="selectSection('connectors')"
            :pt="{ body: { style: 'padding: 0.85rem' }, content: { style: 'padding: 0' } }"
          >
            <template #content>
              <div class="flex align-items-center gap-2">
                <div class="badge-icon surface-100 text-primary flex align-items-center justify-content-center flex-shrink-0">
                  <i class="pi pi-sitemap text-base"></i>
                </div>
                <div class="text-900 font-semibold text-sm">Connectors</div>
              </div>
              <div class="text-500 text-xs line-height-3 mt-2">Link external services (Supabase, GitHub, Vercel) to enable deployment and storage.</div>
            </template>
          </Card>
        </div>

        <div class="flex-1 min-w-0">
          <Card
            class="surface-card border-round-xl shadow-2 guide-card transition-duration-200 hover:shadow-4 cursor-pointer"
            :class="{ 'border-primary': selectedSection === 'llm' }"
            @click="selectSection('llm')"
            :pt="{ body: { style: 'padding: 0.85rem' }, content: { style: 'padding: 0' } }"
          >
            <template #content>
              <div class="flex align-items-center gap-2">
                <div class="badge-icon surface-100 text-purple-600 flex align-items-center justify-content-center flex-shrink-0">
                  <i class="pi pi-cog text-base"></i>
                </div>
                <div class="text-900 font-semibold text-sm">LLM Providers</div>
              </div>
              <div class="text-500 text-xs line-height-3 mt-2">Connect your OpenAI / Anthropic / Google keys to allow generation and runtime calls.</div>
            </template>
          </Card>
        </div>

        <div class="flex-1 min-w-0">
          <Card
            class="surface-card border-round-xl shadow-2 guide-card transition-duration-200 hover:shadow-4 cursor-pointer"
            :class="{ 'border-primary': selectedSection === 'createApp' }"
            @click="selectSection('createApp')"
            :pt="{ body: { style: 'padding: 0.85rem' }, content: { style: 'padding: 0' } }"
          >
            <template #content>
              <div class="flex align-items-center gap-2">
                <div class="badge-icon surface-100 text-cyan-600 flex align-items-center justify-content-center flex-shrink-0">
                  <i class="pi pi-plus-circle text-base"></i>
                </div>
                <div class="text-900 font-semibold text-sm">Create App</div>
              </div>
              <div class="text-500 text-xs line-height-3 mt-2">Describe the app you want to generate and use templates to scaffold a project.</div>
            </template>
          </Card>
        </div>
      </div>

      <Card class="surface-card border-round-xl shadow-2 p-4 mt-4">
        <template #content>
          <div class="flex flex-column gap-4 lg:flex-row lg:align-items-center lg:justify-content-between">
            <div class="flex align-items-center gap-3">
              <div class="badge-icon surface-100 text-primary flex align-items-center justify-content-center">
                <i :class="selectedInfo.icon + ' text-xl'"></i>
              </div>
              <div>
                <div class="text-900 font-semibold text-xl">{{ selectedInfo.title }}</div>
                <div class="text-500 text-sm">{{ selectedInfo.description }}</div>
              </div>
            </div>
            <Button :label="selectedInfo.buttonText || 'Continue'" class="p-button-secondary p-button-sm" @click="goTo(selectedInfo.navPath || '/connectors')" />
          </div>

          <div class="grid gap-3 mt-4">
            <div v-for="(step, index) in selectedInfo.steps" :key="index" class="col-12 surface-100 border-round-lg p-4 shadow-1">
              <div class="flex align-items-center gap-3">
                <div class="step-badge surface-card text-primary flex align-items-center justify-content-center">{{ index + 1 }}</div>
                <div class="flex flex-column gap-1">
                  <div class="text-900 font-semibold">{{ step.title }}</div>
                  <div class="text-500 text-sm">{{ step.text }}</div>
                </div>
              </div>
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
.create-app-guide {
  max-width: 1100px;
  margin: 0 auto;
}
.badge-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.guide-card {
  height: 100px;
  width: 100%;
  box-sizing: border-box;
}
.guide-card :deep(.p-card-body) {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.step-badge {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-weight: 700;
}
</style>