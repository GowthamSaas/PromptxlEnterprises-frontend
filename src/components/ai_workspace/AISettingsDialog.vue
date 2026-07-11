<template>

  <Dialog
    v-model:visible="dialogVisible"
    modal
    header="AI Settings"
    :style="{ width: '480px' }"
    :draggable="false"
  >

    <div class="dialog-body">

      <!-- Provider -->

      <div class="field">

        <label>Provider</label>

        <Select
          v-model="selectedProvider"
          :options="providerOptions"
          optionLabel="provider"
          optionValue="provider"
          placeholder="Select Provider"
          fluid
          @change="onProviderChange"
        />

      </div>

      <!-- Model -->

      <div class="field">

        <label>Model</label>

        <Select
          v-model="selectedModel"
          :options="modelOptions"
          optionLabel="id"
          optionValue="id"
          placeholder="Select Model"
          fluid
          :disabled="!selectedProvider"
        />

      </div>

    </div>

    <template #footer>

      <Button
        label="Cancel"
        severity="secondary"
        text
        @click="dialogVisible=false"
      />

      <Button
        label="Save"
        icon="pi pi-check"
        @click="saveSettings"
      />

    </template>

  </Dialog>

</template>

<script setup>

import { computed } from "vue";

import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Select from "primevue/select";

import { useLLMStore } from "../../stores/llm";

const llmStore = useLLMStore();

const props = defineProps({

  visible: Boolean,

});

const emit = defineEmits([

  "update:visible",

]);

const dialogVisible = computed({

  get: () => props.visible,

  set: (value) =>

    emit("update:visible", value),

});



const selectedProvider = computed({

  get: () => llmStore.selectedProvider,

  set: (value) => {

    llmStore.selectedProvider = value;

  },

});

const selectedModel = computed({

  get: () => llmStore.selectedModel,

  set: (value) => {

    llmStore.selectedModel = value;

  },

});

const providerOptions = computed(() => {

  return llmStore.providers;

});

const modelOptions = computed(() => {

  return llmStore.models;

});

async function onProviderChange() {

  selectedModel.value = null;

  if (!selectedProvider.value) return;

  await llmStore.fetchModels(
    selectedProvider.value
  );

}

function saveSettings() {

  dialogVisible.value = false;

}

</script>

<style scoped>

.dialog-body{

display:flex;

flex-direction:column;

gap:22px;

padding-top:10px;

}

.field{

display:flex;

flex-direction:column;

gap:8px;

}

.field label{

font-weight:600;

font-size:14px;

color:#334155;

}

</style>