<template>
  <div class="page-shell">
    <AIPageHeader title="Connectors" subtitle="Link your automation tools and deployment platforms." />

    <div class="connector-grid">
      <SupabaseCard @connect="handleConnect('supabase')" />
      <GithubCard @connect="handleConnect('github')" />
      <VercelCard @connect="handleConnect('vercel')" />
    </div>
  </div>
</template>

<script setup>
import AIPageHeader from '../../components/common/AIPageHeader.vue'
import SupabaseCard from '../../components/connector/SupabaseCard.vue'
import GithubCard from '../../components/connector/GithubCard.vue'
import VercelCard from '../../components/connector/VercelCard.vue'

function handleConnect(name) {
  console.log('Connect connector', name)
}
</script>

<style scoped>
.page-shell {
  padding: 8px 0 20px;
}

.connector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
</style>
