<template>
  <Card class="template-card">
    <template #title>{{ template.name }}</template>
    <template #content>
      <p>{{ template.description }}</p>
      <Button label="Use Template" size="small" />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

defineProps({ template: Object })
</script>

<style scoped>
.template-card {
  height: 100%;
}
</style>
