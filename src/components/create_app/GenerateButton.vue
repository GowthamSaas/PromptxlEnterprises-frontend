<template>
  <Button
    :label="loading ? 'Generating...' : 'Generate App'"
    icon="pi pi-bolt"
    :loading="loading"
    :disabled="loading || disabled"
    @click="$emit('generate')"
  />
</template>

<script setup>
import Button from 'primevue/button'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['generate'])
</script>
