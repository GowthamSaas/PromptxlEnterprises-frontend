<template>
  <Card class="project-card">
    <template #title>
      <div class="card-header">
        <div>
          <h3>{{ project.name }}</h3>

          <Tag
            :value="project.status"
            severity="success"
          />
        </div>
      </div>
    </template>

    <template #content>
      <p class="description">
        {{ project.description || "No description available." }}
      </p>

      <div class="meta">
        <div>
          <span class="label">Provider</span>

          <Tag
            :value="project.provider"
            severity="info"
          />
        </div>

        <div>
          <span class="label">Model</span>

          <Tag
            :value="project.model"
            severity="warning"
          />
        </div>
      </div>

      <small class="created">
        Created :
        {{ formatDate(project.created_at) }}
      </small>

      <Divider />

      <div class="actions">
        <Button
          icon="pi pi-folder-open"
          label="Open"
          severity="primary"
          @click="$emit('open', project)"
        />

        <Button
          icon="pi pi-pencil"
          label="Edit"
          severity="warning"
          outlined
          @click="$emit('edit', project)"
        />

        <Button
          icon="pi pi-download"
          label="Export"
          severity="contrast"
          outlined
          @click="$emit('export', project)"
        />

        <Button
          icon="pi pi-trash"
          label="Delete"
          severity="danger"
          outlined
          @click="$emit('delete', project)"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import Tag from "primevue/tag";
import Divider from "primevue/divider";

defineProps({
  project: {
    type: Object,
    required: true,
  },
});

defineEmits([
  "open",
  "edit",
  "export",
  "delete",
]);

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
</script>

<style scoped>
.project-card {
  height: 100%;
  border-radius: 14px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0 0 8px;
}

.description {
  color: #6b7280;
  min-height: 70px;
  line-height: 1.6;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.meta div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 13px;
  color: gray;
}

.created {
  color: gray;
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>