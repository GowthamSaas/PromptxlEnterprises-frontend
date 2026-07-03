<template>
  <div class="page-shell">
    <AIPageHeader title="Create App" subtitle="Describe your app idea and generate a project draft." />

    <div class="grid">
      <div class="col-8">
        <Card>
          <template #title>App Prompt</template>
          <template #content>
            <PromptInput v-model="promptText" />
            <div class="actions">
              <GenerateButton :loading="loading" :disabled="!promptText.trim()" @generate="handleGenerate" />
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
import { computed, ref } from 'vue'
import { useProjectStore } from '../../stores/project'
import AIPageHeader from '../../components/common/AIPageHeader.vue'
import PromptInput from '../../components/create_app/PromptInput.vue'
import GenerateButton from '../../components/create_app/GenerateButton.vue'
import RecentProjects from '../../components/create_app/RecentProjects.vue'
import AppTemplateCard from '../../components/create_app/AppTemplateCard.vue'
import GeneratedAppModal from '../../components/create_app/GeneratedAppModal.vue'
import Card from 'primevue/card'
import { appTemplates } from '../../utils/templates'

const templates = ref(appTemplates)
const promptText = ref('')
const selectedTemplate = ref(null)
const projectStore = useProjectStore()
const projects = projectStore.projects
const loading = computed(() => projectStore.loading)
const generated = ref(null)
const showModal = ref(false)

async function handleGenerate() {
  if (!promptText.value.trim()) {
    return
  }

  const payload = {
    prompt: promptText.value,
    app_name: selectedTemplate.value?.name ? `${selectedTemplate.value.name} App` : 'GeneratedApp',
    template: selectedTemplate.value?.name,
    provider: 'minimax'
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
</style>


