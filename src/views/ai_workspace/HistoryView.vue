<template>
  <div class="page-shell">
    <AIPageHeader title="History" subtitle="Track your recent workspace activity." />

    <DataTable :value="history" stripedRows>
      <Column field="title" header="Activity" />
      <Column field="date" header="Date" />
      <Column field="status" header="Status" />
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AIPageHeader from '../../components/common/AIPageHeader.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const history = ref([
  { title: 'Connected OpenAI', date: '2026-07-02', status: 'Success' },
  { title: 'Generated Support Copilot', date: '2026-07-02', status: 'Completed' }
])
</script>

<style scoped>
.page-shell {
  padding: 8px 0 20px;
}
</style>
