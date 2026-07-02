<template>
  <div class="page-shell">
    <AIPageHeader title="My Apps" subtitle="Review and manage the apps you created." />

    <div class="apps-grid">
      <Card v-for="app in apps" :key="app.id">
        <template #title>{{ app.name }}</template>
        <template #content>
          <p>{{ app.description }}</p>
          <Tag :value="app.status" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AIPageHeader from '../../components/common/AIPageHeader.vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

const apps = ref([
  { id: 1, name: 'Support Copilot', description: 'An AI assistant for ticket triage.', status: 'Live' },
  { id: 2, name: 'Knowledge Agent', description: 'A secure enterprise Q&A assistant.', status: 'Draft' }
])
</script>

<style scoped>
.page-shell {
  padding: 8px 0 20px;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
</style>
