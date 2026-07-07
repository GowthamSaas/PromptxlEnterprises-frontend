<template>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '450px' }"
    :header="isFolder ? 'Create Folder' : 'Create File'"
  >

    <div class="dialog-content">

      <div class="field">

        <label>
          {{ isFolder ? "Folder Name" : "File Name" }}
        </label>

        <InputText
          v-model="name"
          fluid
          autofocus
          :placeholder="isFolder ? 'components' : 'App.vue'"
          @keyup.enter="create"
        />

      </div>

      <div
        v-if="!isFolder"
        class="field"
      >

        <label>Language</label>

        <Select
          v-model="language"
          :options="languages"
          placeholder="Select Language"
          fluid
        />

      </div>

    </div>

    <template #footer>

      <Button
        label="Cancel"
        severity="secondary"
        text
        @click="close"
      />

      <Button
        :label="isFolder ? 'Create Folder' : 'Create File'"
        icon="pi pi-check"
        @click="create"
      />

    </template>

  </Dialog>
</template>

<script setup>
import { ref } from "vue";

import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Select from "primevue/select";

const emit = defineEmits([
  "create",
]);

const visible = ref(false);

const isFolder = ref(false);

const name = ref("");

const language = ref("javascript");

const languages = [
  "javascript",
  "typescript",
  "vue",
  "html",
  "css",
  "json",
  "python",
];

function open(folder = false) {

  isFolder.value = folder;

  name.value = "";

  language.value = "javascript";

  visible.value = true;

}

function close() {

  visible.value = false;

}

function create() {

  emit("create", {

    isFolder: isFolder.value,

    name: name.value,

    language: language.value,

  });

  close();

}

defineExpose({

  open,

});
</script>

<style scoped>

.dialog-content{

display:flex;

flex-direction:column;

gap:20px;

padding-top:10px;

}

.field{

display:flex;

flex-direction:column;

gap:8px;

}

.field label{

font-weight:600;

}

</style>