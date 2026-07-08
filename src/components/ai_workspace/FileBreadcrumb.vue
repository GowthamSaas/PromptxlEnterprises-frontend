<template>
  <div class="breadcrumb-container">

    <Breadcrumb
      v-if="items.length"
      :model="items"
    >
      <template #item="{ item, index }">
        <span
          class="breadcrumb-item"
          :class="{ clickable: index < items.length - 1 }"
          @click="onBreadcrumbClick(index)"
        >
          {{ item.label }}
        </span>
      </template>
    </Breadcrumb>

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

  // Handle both Windows (\\) and Unix (/) path separators
  const path = projectFilesStore.currentFile.file_path;

  return path

    .split(/[/\\]/)

    .filter(part => part)

    .map((part, index, arr) => ({

      label: part,
      // Make all but the last item clickable
      clickable: index < arr.length - 1,

    }));

});

function onBreadcrumbClick(index) {

  const clickedPath = items.value
    .slice(0, index + 1)
    .map(item => item.label)
    .join("/");

  // Find the folder in the tree and navigate to it
  console.log("Navigate to:", clickedPath);

}
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

.breadcrumb-item{

font-size:13px;

}

.breadcrumb-item.clickable{

cursor:pointer;

}

.breadcrumb-item.clickable:hover{

color:var(--primary-color);

text-decoration:underline;

}

</style>