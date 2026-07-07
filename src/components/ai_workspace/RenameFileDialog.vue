<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Rename File"
    :style="{ width: '420px' }"
  >

    <div class="dialog-content">

      <div class="field">

        <label>File Name</label>

        <InputText
          v-model="fileName"
          fluid
          autofocus
          @keyup.enter="rename"
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
        label="Rename"
        icon="pi pi-pencil"
        @click="rename"
      />

    </template>

  </Dialog>
</template>

<script setup>
import { ref } from "vue";

import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const emit = defineEmits([
  "rename",
]);

const visible = ref(false);

const fileId = ref(null);

const fileName = ref("");

function open(file) {

  fileId.value = file.id;

  fileName.value = file.file_name;

  visible.value = true;

}

function close() {

  visible.value = false;

}

function rename() {

  if (!fileName.value.trim()) return;

  emit("rename", {

    id: fileId.value,

    fileName: fileName.value,

  });

  close();

}

defineExpose({

  open,

});
</script>

<style scoped>

.dialog-content{

padding-top:12px;

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