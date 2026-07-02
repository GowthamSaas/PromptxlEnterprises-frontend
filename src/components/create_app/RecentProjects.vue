<template>
  <Panel header="Recent Projects">
    <ul class="project-list">
      <li v-for="project in projects" :key="project.id">
        <span>{{ project.name }}</span>
        <Tag :value="project.status" />
      </li>
    </ul>
  </Panel>
</template>

<script setup>
import Panel from 'primevue/panel'
import Tag from 'primevue/tag'

defineProps({ projects: Array })
</script>

<style scoped>
.project-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
