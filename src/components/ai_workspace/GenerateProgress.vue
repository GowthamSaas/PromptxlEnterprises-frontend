<template>
  <Dialog
    v-model:visible="visible"
    modal
    :closable="false"
    :draggable="false"
    :style="{ width: '420px' }"
  >
    <template #header>
      <div class="dialog-header">
        <i class="pi pi-sparkles"></i>
        <span>Generating Project</span>
      </div>
    </template>

    <div class="progress-container">

      <ProgressSpinner
        strokeWidth="4"
        animationDuration=".8s"
      />

      <h3>Please wait...</h3>

      <p>
        AI is generating your project files.
        This may take a few seconds.
      </p>

      <ProgressBar
        mode="indeterminate"
        style="height:6px"
      />

    </div>

  </Dialog>
</template>

<script setup>
import { computed } from "vue";

import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import ProgressBar from "primevue/progressbar";

import { useGenerateStore } from "../../stores/generate";

const generateStore = useGenerateStore();

const visible = computed(() => {
  return generateStore.loading;
});
</script>

<style scoped>

.dialog-header{

display:flex;

align-items:center;

gap:10px;

font-weight:600;

font-size:16px;

}

.progress-container{

padding:20px;

display:flex;

flex-direction:column;

align-items:center;

gap:20px;

text-align:center;

}

.progress-container h3{

margin:0;

font-size:20px;

}

.progress-container p{

margin:0;

line-height:1.7;

color:#64748b;

}

</style>