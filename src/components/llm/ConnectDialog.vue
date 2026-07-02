<template>
  <Dialog v-model:visible="visible" modal header="Connect Provider" :style="{ width: '30rem' }">
    <div class="p-fluid">
      <label class="field-label">Provider API Key</label>
      <Password v-model="apiKey" toggleMask />
    </div>

    <template #footer>
      <Button label="Cancel" severity="secondary" text @click="close" />
      <Button label="Connect" @click="submit" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Password from 'primevue/password'
import Button from 'primevue/button'

const props = defineProps({ modelValue: Boolean, provider: String })
const emit = defineEmits(['update:modelValue', 'connect'])

const visible = ref(props.modelValue)
const apiKey = ref('')

watch(() => props.modelValue, (value) => {
  visible.value = value
})

function close() {
  emit('update:modelValue', false)
}

function submit() {
  emit('connect', { provider: props.provider, apiKey: apiKey.value })
  close()
}
</script>

<style scoped>
.field-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}
</style>
