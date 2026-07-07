<template>
  <div class="workspace-toolbar">

    <div class="toolbar-left">

      <Button
  icon="pi pi-save"
  label="Save"
  severity="success"
  outlined
  :disabled="!currentFile"
  @click="saveFile"
/>

      <Button
  icon="pi pi-refresh"
  label="Refresh"
  severity="secondary"
  outlined
  :disabled="!currentFile"
  @click="refreshFile"
/>

    </div>

    <div class="toolbar-right">

      <Tag
        v-if="currentFile"
        :value="currentFile.language"
        severity="info"
      />

    </div>

  </div>
</template>

<script setup>
import { computed, inject } from "vue";

import Button from "primevue/button";
import Tag from "primevue/tag";

import { useProjectFilesStore } from "../../stores/projectFiles";

const projectFilesStore = useProjectFilesStore();

const currentFile = computed(() => {
  return projectFilesStore.currentFile;
});

// Content from Monaco Editor
const editorContent = inject("editorContent");

async function saveFile() {

  if (!currentFile.value) return;

  try {

    await projectFilesStore.saveFile(

      currentFile.value.id,

      editorContent.value

    );

    console.log("File Saved Successfully");

  } catch (error) {

    console.error(error);

  }

}

async function refreshFile() {

  if (!currentFile.value) return;

  await projectFilesStore.openFile(
    currentFile.value.id
  );

}
</script>

<style scoped>

.workspace-toolbar{

height:52px;

display:flex;

justify-content:space-between;

align-items:center;

padding:0 16px;

background:var(--surface-card);

border-bottom:1px solid var(--surface-border);

}

.toolbar-left{

display:flex;

align-items:center;

gap:12px;

}

.toolbar-right{

display:flex;

align-items:center;

gap:10px;

}

</style>