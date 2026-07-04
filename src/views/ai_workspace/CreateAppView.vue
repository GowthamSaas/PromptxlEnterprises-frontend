<template>
  <div class="page-shell">
    <AIPageHeader title="Create App" subtitle="Describe your app idea and generate a project draft." />

    <div class="grid">
      <div class="col-8">
        <Card>
          <template #title>App Prompt</template>
          <template #content>
            <!-- Provider & Model Selection -->
            <div class="provider-section">
              <label class="section-label">LLM Provider & Model</label>
              <div class="provider-row">
                <Dropdown
                  v-model="selectedProvider"
                  :options="connectedProviders"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select Provider"
                  class="provider-dropdown"
                  :loading="llmStore.loading"
                  @change="onProviderChange"
                >
                  <template #value="slotProps">
                    <div v-if="slotProps.value" class="provider-option">
                      <i class="pi pi-cloud"></i>
                      <span>{{ slotProps.value }}</span>
                    </div>
                    <span v-else>{{ slotProps.placeholder }}</span>
                  </template>
                  <template #option="slotProps">
                    <div class="provider-option">
                      <i class="pi pi-cloud"></i>
                      <span>{{ slotProps.option.label }}</span>
                    </div>
                  </template>
                </Dropdown>

                <Dropdown
                  v-model="selectedModel"
                  :options="availableModels"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select Model"
                  class="model-dropdown"
                  :loading="modelsLoading"
                  :disabled="!selectedProvider"
                >
                  <template #value="slotProps">
                    <span v-if="slotProps.value">{{ slotProps.value }}</span>
                    <span v-else class="placeholder">{{ slotProps.placeholder }}</span>
                  </template>
                </Dropdown>
              </div>
              <small v-if="!connectedProviders.length" class="p-error">
                No LLM providers connected. Please connect a provider in settings.
              </small>
            </div>

            <PromptInput v-model="promptText" />
            <div class="actions">
              <GenerateButton :loading="loading" :disabled="!canGenerate" @generate="handleGenerate" />
            </div>
          </template>
        </Card>
      </div>
      <div class="col-4">
        <RecentProjects :projects="projects" />
      </div>
    </div>

    <div class="templates-grid">
      <AppTemplateCard
        v-for="template in templates"
        :key="template.id"
        :template="template"
        :selected="selectedTemplate?.id === template.id"
        @select="selectTemplate"
      />
    </div>
    <GeneratedAppModal v-if="showModal" :result="generated" @close="closeModal" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useProjectStore } from '../../stores/project'
import { useLLMStore } from '../../stores/llm'
import AIPageHeader from '../../components/common/AIPageHeader.vue'
import PromptInput from '../../components/create_app/PromptInput.vue'
import GenerateButton from '../../components/create_app/GenerateButton.vue'
import RecentProjects from '../../components/create_app/RecentProjects.vue'
import AppTemplateCard from '../../components/create_app/AppTemplateCard.vue'
import GeneratedAppModal from '../../components/create_app/GeneratedAppModal.vue'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import { appTemplates } from '../../utils/templates'

const templates = ref(appTemplates)
const promptText = ref('')
const selectedTemplate = ref(null)
const projectStore = useProjectStore()
const llmStore = useLLMStore()
const projects = projectStore.projects
const loading = computed(() => projectStore.loading)
const generated = ref(null)
const showModal = ref(false)

// Provider & Model selection
const selectedProvider = ref(null)
const selectedModel = ref(null)
const availableModels = ref([])
const modelsLoading = ref(false)

// Computed properties
const connectedProviders = computed(() => {
  return llmStore.providers.map(p => ({
    label: p.provider.charAt(0).toUpperCase() + p.provider.slice(1),
    value: p.provider
  }))
})

const canGenerate = computed(() => {
  return promptText.value.trim() && selectedProvider.value && selectedModel.value
})

// Fetch connected providers on mount
onMounted(async () => {
  await llmStore.fetchProviders()
})

// Handle provider change - fetch models
async function onProviderChange() {
  selectedModel.value = null
  availableModels.value = []

  if (!selectedProvider.value) {
    return
  }

  modelsLoading.value = true
  try {
    await llmStore.fetchModels(selectedProvider.value)
    availableModels.value = llmStore.models.map(m => ({
      label: m.id,
      value: m.id
    }))
  } catch (error) {
    console.error('Failed to fetch models:', error)
  } finally {
    modelsLoading.value = false
  }
}

async function handleGenerate() {
  if (!promptText.value.trim() || !selectedProvider.value || !selectedModel.value) {
    return
  }

  const payload = {
    prompt: promptText.value,
    app_name: selectedTemplate.value?.name ? `${selectedTemplate.value.name} App` : 'GeneratedApp',
    template: selectedTemplate.value?.name,
    provider: selectedProvider.value,
    model: selectedModel.value
  }

  try {
    const response = await projectStore.generateProject(payload)
    promptText.value = ''
    generated.value = response?.data || null
    showModal.value = true
  } catch (error) {
    console.error('Failed to generate app:', error)
  }
}

function selectTemplate(template) {
  selectedTemplate.value = template
}

function closeModal() {
  showModal.value = false
  generated.value = null
}
</script>

<style scoped>
.page-shell {
  padding: 8px 0 20px;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.actions {
  margin-top: 16px;
}

/* Provider Section Styles */
.provider-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--surface-border);
}

.section-label {
  display: block;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-color);
}

.provider-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.provider-dropdown {
  flex: 1;
}

.model-dropdown {
  flex: 1.5;
}

.provider-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.provider-option i {
  color: var(--primary-color);
}

.placeholder {
  color: var(--text-color-secondary);
}

:deep(.p-dropdown) {
  width: 100%;
}
</style>


