<template>
  <ConnectorCard title="GitHub" description="Connect GitHub repositories and automate deployment workflows." icon="pi pi-github" @connect="$emit('connect')" />
</template>

<script setup>
import ConnectorCard from './ConnectorCard.vue'

defineEmits(['connect'])
</script>
