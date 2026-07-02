<template>
  <ConnectorCard title="Vercel" description="Deploy your generated application to Vercel instantly." icon="pi pi-send" @connect="$emit('connect')" />
</template>

<script setup>
import ConnectorCard from './ConnectorCard.vue'

defineEmits(['connect'])
</script>
