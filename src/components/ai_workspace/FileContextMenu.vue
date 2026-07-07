<template>
  <ContextMenu
    ref="menu"
    :model="items"
  />
</template>

<script setup>
import { ref } from "vue";

import ContextMenu from "primevue/contextmenu";

const emit = defineEmits([
  "new-file",
  "new-folder",
  "rename",
  "delete",
]);

const menu = ref();

const items = [

  {
    label: "New File",
    icon: "pi pi-file",
    command: () => emit("new-file"),
  },

  {
    label: "New Folder",
    icon: "pi pi-folder",
    command: () => emit("new-folder"),
  },

  {
    separator: true,
  },

  {
    label: "Rename",
    icon: "pi pi-pencil",
    command: () => emit("rename"),
  },

  {
    label: "Delete",
    icon: "pi pi-trash",
    command: () => emit("delete"),
  },

];

function show(event) {

  menu.value.show(event);

}

defineExpose({

  show,

});
</script>

<style scoped>

:deep(.p-contextmenu){

min-width:220px;

}

:deep(.p-menuitem-link){

padding:12px 16px;

}

</style>