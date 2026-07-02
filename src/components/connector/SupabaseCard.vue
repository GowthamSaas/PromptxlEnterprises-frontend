<template>
  <ConnectorCard title="Supabase" description="Connect your Supabase project to store apps and data securely." icon="pi pi-database" @connect="$emit('connect')" />
</template>

<script setup>
import ConnectorCard from './ConnectorCard.vue'

defineEmits(['connect'])
</script>
