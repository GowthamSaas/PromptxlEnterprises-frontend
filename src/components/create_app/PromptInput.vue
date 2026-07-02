<template>
  <div class="prompt-input">
    <label>Describe your app</label>
    <Textarea v-model="value" rows="5" placeholder="Describe the app you want to build..." />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Textarea from 'primevue/textarea'

const value = ref('')
</script>

<style scoped>
.prompt-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
