<template>
  <Dialog
    :visible="visible"
    modal
    header="Edit Project"
    :style="{ width: '500px' }"
    @update:visible="$emit('close')"
  >
    <div class="form-group">
      <label>Project Name</label>

      <InputText
        v-model="form.name"
        class="w-full"
        placeholder="Enter project name"
      />
    </div>

    <div class="form-group">
      <label>Description</label>

      <Textarea
        v-model="form.description"
        rows="5"
        class="w-full"
        placeholder="Enter description"
      />
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="secondary"
        outlined
        @click="$emit('close')"
      />

      <Button
        label="Update"
        icon="pi pi-check"
        @click="updateProject"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { reactive, watch } from "vue";

import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },

  project: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits([
  "close",
  "update",
]);

const form = reactive({
  name: "",
  description: "",
});

watch(
  () => props.project,
  (project) => {
    form.name = project?.name || "";
    form.description = project?.description || "";
  },
  {
    immediate: true,
  }
);

function updateProject() {
  emit("update", {
    ...props.project,
    name: form.name,
    description: form.description,
  });
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: .5rem;
}
</style>