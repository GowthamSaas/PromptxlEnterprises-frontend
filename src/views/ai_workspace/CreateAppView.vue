<template>
  <div class="page-shell">
    <AIPageHeader title="Create App" subtitle="Describe your app idea and generate a project draft." />

    <div class="grid">
      <div class="col-8">
        <Card>
          <template #title>App Prompt</template>
          <template #content>
            <PromptInput />
            <div class="actions">
              <GenerateButton @generate="handleGenerate" />
            </div>
          </template>
        </Card>
      </div>
      <div class="col-4">
        <RecentProjects :projects="projects" />
      </div>
    </div>

    <div class="templates-grid">
      <AppTemplateCard v-for="template in templates" :key="template.id" :template="template" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AIPageHeader from '../../components/common/AIPageHeader.vue'
import PromptInput from '../../components/create_app/PromptInput.vue'
import GenerateButton from '../../components/create_app/GenerateButton.vue'
import RecentProjects from '../../components/create_app/RecentProjects.vue'
import AppTemplateCard from '../../components/create_app/AppTemplateCard.vue'
import Card from 'primevue/card'
import { appTemplates } from '../../utils/templates'

const templates = ref(appTemplates)
const projects = ref([
  { id: 1, name: 'Support Copilot', status: 'Draft' },
  { id: 2, name: 'Knowledge Agent', status: 'Ready' }
])

function handleGenerate() {
  console.log('Generate app')
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
