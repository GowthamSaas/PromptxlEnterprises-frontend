<template>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '420px' }"
    header="Delete File"
  >

    <div class="dialog-content">

      <i class="pi pi-exclamation-triangle warning-icon"></i>

      <h3>Delete "{{ fileName }}"?</h3>

      <p>
        This action cannot be undone.
      </p>

    </div>

    <template #footer>

      <Button
        label="Cancel"
        severity="secondary"
        text
        @click="close"
      />

      <Button
        label="Delete"
        icon="pi pi-trash"
        severity="danger"
        @click="remove"
      />

    </template>

  </Dialog>
</template>

<script setup>
import { ref } from "vue";

import Dialog from "primevue/dialog";
import Button from "primevue/button";

const emit = defineEmits([
  "delete",
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

function remove() {

  emit("delete", fileId.value);

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

align-items:center;

text-align:center;

padding:20px;

}

.warning-icon{

font-size:64px;

color:#f59e0b;

margin-bottom:20px;

}

.dialog-content h3{

margin:0;

font-size:20px;

font-weight:600;

}

.dialog-content p{

margin-top:12px;

color:#64748b;

line-height:1.7;

}

</style>