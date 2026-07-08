<template>
  <Card class="template-card" :class="{ selected: selected }">
    <template #title>{{ template.name }}</template>
    <template #content>
      <p>{{ template.description }}</p>
      <Button label="Use Template" size="small" @click="$emit('select', template)" />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

const props = defineProps({
  template: Object,
  selected: Boolean
})
const emit = defineEmits(['select'])
</script>

<style scoped>
.template-card {
 /* jnjkn */
}

.template-card.selected {
  border: 2px solid #5a67d8;
  box-shadow: 0 10px 20px rgba(90, 103, 216, 0.18);
}
</style>
