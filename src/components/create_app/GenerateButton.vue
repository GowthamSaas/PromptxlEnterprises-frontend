<template>
  <Button label="Generate App" icon="pi pi-bolt" @click="$emit('generate')" />
</template>

<script setup>
import Button from 'primevue/button'

defineEmits(['generate'])
</script>
