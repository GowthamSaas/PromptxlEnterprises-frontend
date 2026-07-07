<template>
  <div class="project-empty">
    <i class="pi pi-folder-open empty-icon"></i>

    <h2>No Projects Found</h2>

    <p>
      You haven't created any projects yet.
      Generate your first AI application to get started.
    </p>

    <Button
      icon="pi pi-plus"
      label="Create Project"
      @click="$emit('create')"
    />
  </div>
</template>

<script setup>
defineEmits(["create"]);
</script>

<style scoped>
.project-empty {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border: 2px dashed #d1d5db;
  border-radius: 12px;
  background: #fafafa;
  text-align: center;
  padding: 2rem;
}

.empty-icon {
  font-size: 4rem;
  color: #9ca3af;
}

h2 {
  margin: 0;
  color: #374151;
}

p {
  max-width: 420px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}
</style>