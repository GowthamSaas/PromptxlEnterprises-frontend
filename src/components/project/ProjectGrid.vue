<template>
  <div v-if="projects.length" class="project-grid">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @open="$emit('open', $event)"
      @edit="$emit('edit', $event)"
      @export="$emit('export', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>

  <div v-else class="empty-state">
    <i class="pi pi-folder-open empty-icon"></i>

    <h3>No Projects Found</h3>

    <p>Create your first AI application to get started.</p>
  </div>
</template>

<script setup>
import ProjectCard from "./ProjectCard.vue";

defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
});

defineEmits([
  "open",
  "edit",
  "export",
  "delete",
]);
</script>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 2fr));
  gap: 1.5rem;
}

.empty-state {
  height: 350px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  color: #777;

  border: 2px dashed #dcdcdc;
  border-radius: 12px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #bdbdbd;
}

.empty-state h3 {
  margin: 0;
}

.empty-state p {
  margin-top: .5rem;
}
</style>