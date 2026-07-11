<template>
  <header class="workspace-header">

    <!-- Left -->
    <div class="header-left">

  <div class="project-info">

    <h2 class="project-name">
      {{ projectName }}
    </h2>

    <div class="project-meta">

      <Tag
        icon="pi pi-server"
        :value="provider"
        severity="info"
      />

      <Tag
        icon="pi pi-microchip-ai"
        :value="model"
        severity="contrast"
      />

    </div>

  </div>

</div>

    <!-- Right -->

    <div class="header-right">

      <Button
        icon="pi pi-save"
        label="Save"
        severity="secondary"
        outlined
        disabled
      />

      <Button
        icon="pi pi-download"
        label="Export"
        severity="help"
        outlined
        disabled
      />

      <Button
        icon="pi pi-history"
        label="History"
        severity="contrast"
        outlined
        disabled
      />

    </div>

  </header>
</template>

<script setup>
import { computed } from "vue";

import { useProjectStore } from "../../stores/project";
;

import Button from "primevue/button";
import Tag from "primevue/tag";

const projectStore = useProjectStore();


const projectName = computed(() => {
  return (
    projectStore.currentProject?.name ||
    "Untitled Project"
  );
});

const provider = computed(() => {
  return (
    projectStore.currentProject?.provider ||
    "-"
  );
});




const model = computed(() => {
  return (
    projectStore.currentProject?.model ||
    "-"
  );
});
</script>

<style scoped>

.workspace-header{

height:90px;

padding:16px 24px;

display:flex;

justify-content:space-between;

align-items:center;

background:var(--surface-card);

border-bottom:1px solid var(--surface-border);

}

.project-info{

display:flex;

flex-direction:column;

gap:12px;

}

.project-name{

margin:0;

font-size:22px;

font-weight:700;

}



.project-meta{

display:flex;

gap:10px;

flex-wrap:wrap;

}

.header-right{

display:flex;

gap:12px;

align-items:center;

}

.workspace-mode{

margin-top:10px;

}

</style>