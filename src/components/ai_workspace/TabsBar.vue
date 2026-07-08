<template>
  <div class="tabs-bar">

    <div
      v-if="currentFile"
      class="tab active"
    >

      <div class="tab-left">

        <i :class="fileIcon"></i>

        <span>
          {{ currentFile.file_name }}
        </span>

      </div>

      <Button
        icon="pi pi-times"
        text
        rounded
        severity="secondary"
        size="small"
        @click="closeCurrentFile"
      />

    </div>

    <div
      v-else
      class="empty-tab"
    >

      No file opened

    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";

import Button from "primevue/button";

import { useProjectFilesStore } from "../../stores/projectFiles";

const projectFilesStore = useProjectFilesStore();

const currentFile = computed(() => {
  return projectFilesStore.currentFile;
});

const fileIcon = computed(() => {

  if (!currentFile.value)
    return "pi pi-file";

  switch (currentFile.value.language) {

    case "vue":
      return "pi pi-code";

    case "javascript":
      return "pi pi-file-edit";

    case "css":
      return "pi pi-palette";

    case "html":
      return "pi pi-globe";

    case "json":
      return "pi pi-database";

    default:
      return "pi pi-file";

  }

});

function closeCurrentFile() {

  projectFilesStore.closeFile();

}
</script>

<style scoped>

.tabs-bar{

height:44px;

display:flex;

align-items:center;

background:#252526;

border-bottom:1px solid #3b3b3b;

overflow-x:auto;

}

.tab{

height:100%;

display:flex;

align-items:center;

justify-content:space-between;

padding:0 14px;

min-width:220px;

background:#1e1e1e;

border-right:1px solid #3b3b3b;

color:white;

}

.tab-left{

display:flex;

align-items:center;

gap:10px;

}

.active{

border-top:2px solid #3b82f6;

}

.empty-tab{

padding-left:16px;

font-size:13px;

color:#9ca3af;

}

</style>