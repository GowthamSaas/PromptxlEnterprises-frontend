<template>
  <div class="prompt-panel">

    <div class="panel-header">
      <h3>AI Prompt</h3>
      <p>Describe the application you want to generate.</p>
    </div>

    <div class="panel-body">

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

      <!-- Prompt -->

      <div class="field">

        <label>Prompt</label>

        <Textarea
          v-model="prompt"
          rows="18"
          autoResize
          fluid
          placeholder="Example:
Build a modern Vue Todo application with authentication, dashboard, CRUD operations and Tailwind CSS."
        />

      </div>

    </div>

    <div class="panel-footer">

      <Button
        label="Generate"
        icon="pi pi-sparkles"
        fluid
        :loading="generateStore.loading"
        @click="generateProject"
      />

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import Button from "primevue/button";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import { useRoute } from "vue-router";
import { useLLMStore } from "../../stores/llm";
import { useGenerateStore } from "../../stores/generate";
import { useProjectStore } from "../../stores/project";
import { useProjectFilesStore } from "../../stores/projectFiles";

const llmStore = useLLMStore();

const generateStore = useGenerateStore();

const projectStore = useProjectStore();

const projectFilesStore = useProjectFilesStore();

const prompt = ref("");

const selectedProvider = ref(null);

const selectedModel = ref(null);

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

async function generateProject() {

  if (!prompt.value.trim()) return;

  const response =
    await generateStore.generate({

      prompt: prompt.value,

      provider: selectedProvider.value,

      model: selectedModel.value,

      application_id: null,

    });

  await projectStore.fetchProject(
    response.project_id
);

await projectFilesStore.fetchTree(
    response.project_id
);

// Automatically open first generated file
const firstFile =
    projectFilesStore.findFirstFile();

if (firstFile) {

    await projectFilesStore.openFile(
        firstFile.id
    );

}

}



const route = useRoute();
onMounted(async () => {

  await llmStore.fetchProviders();

  const projectId = route.query.id;

  if (!projectId) return;

  // Load Project
  await projectStore.fetchProject(projectId);

  // Fill Prompt Panel
  prompt.value = projectStore.currentProject.prompt;
  selectedProvider.value = projectStore.currentProject.provider;

  await llmStore.fetchModels(selectedProvider.value);

  selectedModel.value = projectStore.currentProject.model;

  // Load Explorer
  await projectFilesStore.fetchTree(projectId);

  const firstFile = projectFilesStore.findFirstFile();

  if (firstFile) {

    await projectFilesStore.openFile(firstFile.id);

  }

});
</script>

<style scoped>

.prompt-panel{

height:100%;

display:flex;

flex-direction:column;

background:var(--surface-card);

border-right:1px solid var(--surface-border);

}

.panel-header{

padding:20px;

border-bottom:1px solid var(--surface-border);

}

.panel-header h3{

margin:0;

}

.panel-header p{

margin-top:8px;

color:#64748b;

font-size:14px;

}

.panel-body{

flex:1;

overflow:auto;

padding:20px;

display:flex;

flex-direction:column;

gap:20px;

}

.field{

display:flex;

flex-direction:column;

gap:8px;

}

.field label{

font-weight:600;

font-size:14px;

}

.panel-footer{

padding:20px;

border-top:1px solid var(--surface-border);

}

</style>