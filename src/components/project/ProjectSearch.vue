<template>
  <div class="project-search">
    <IconField iconPosition="left" class="w-full">
      <InputIcon>
        <i class="pi pi-search"></i>
      </InputIcon>

      <InputText
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        placeholder="Search projects..."
        class="w-full"
      />
    </IconField>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
defineProps({
  modelValue: {
    type: String,
    default: ""
  }
})

defineEmits([
  "update:modelValue"
])
</script>

<style scoped>
.project-search{
    width:100%;
}
</style>