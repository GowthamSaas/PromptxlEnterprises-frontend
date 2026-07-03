<template>
  <Dialog :visible="true" modal closable :style="{ width: '70vw' }">
    <template #header>
      <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
        <div>
          <div style="font-weight:700">Generated App: {{ result?.app_name || 'Untitled' }}</div>
          <div style="font-size:0.9rem;color:#6b7280">{{ result?.summary || '' }}</div>
        </div>
        <div>
          <Button label="Close" class="p-button-text" @click="$emit('close')" />
        </div>
      </div>
    </template>

    <div v-if="result?.files?.length">
      <div v-for="(file, idx) in result.files" :key="idx" class="file-block">
        <div class="file-header">{{ file.path }}</div>
        <pre class="file-content">{{ file.content }}</pre>
      </div>
    </div>
    <div v-else>
      <p>No files were generated.</p>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const props = defineProps({
  result: Object
})
</script>

<style scoped>
.file-block {
  margin-bottom: 18px;
}
.file-header {
  font-weight: 700;
  background: #f3f4f6;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}
.file-content {
  background: #0f172a;
  color: #e6edf3;
  padding: 12px;
  border-radius: 6px;
  overflow: auto;
  max-height: 360px;
}
</style>
