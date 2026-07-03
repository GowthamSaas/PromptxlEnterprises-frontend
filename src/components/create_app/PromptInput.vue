<template>
  <div class="prompt-input">
    <label>Describe your app</label>
    <Textarea v-model="value" rows="5" placeholder="Describe the app you want to build..." />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Textarea from 'primevue/textarea'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue
  }
)

watch(value, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped>
.prompt-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
