<template>
  <div class="breadcrumb-container">

    <Breadcrumb
      v-if="items.length"
      :model="items"
    />

    <span
      v-else
      class="empty-text"
    >
      No file selected
    </span>

  </div>
</template>

<script setup>
import { computed } from "vue";

import Breadcrumb from "primevue/breadcrumb";

import { useProjectFilesStore } from "../../stores/projectFiles";

const projectFilesStore = useProjectFilesStore();

const items = computed(() => {

  if (!projectFilesStore.currentFile) {

    return [];

  }

  return projectFilesStore.currentFile.file_path

    .split("/")

    .map((part) => ({

      label: part,

    }));

});
</script>

<style scoped>

.breadcrumb-container{

height:42px;

display:flex;

align-items:center;

padding:0 16px;

border-bottom:1px solid var(--surface-border);

background:var(--surface-ground);

overflow:hidden;

}

.empty-text{

font-size:13px;

color:var(--text-color-secondary);

}

:deep(.p-breadcrumb){

padding:0;

border:none;

background:transparent;

}

</style>