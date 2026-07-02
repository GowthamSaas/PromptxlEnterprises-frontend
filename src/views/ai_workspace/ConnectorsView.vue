<template>
  <div
    style="
      display:flex;
      flex-direction:column;
      gap:24px;
      padding:12px;
    "
  >
    <AIPageHeader
      title="Connectors"
      subtitle="Connect your deployment and database services for seamless app deployment"
    />

    <div
  style="
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:24px;
    align-items:start;
    grid-auto-rows:max-content;
  "
>
      <VercelCard />

      <SupabaseCard />

      <GithubCard />
    </div>
  </div>
</template>

<script setup>
import AIPageHeader from '../../components/common/AIPageHeader.vue'

import VercelCard from '../../components/connector/VercelCard.vue'
import SupabaseCard from '../../components/connector/SupabaseCard.vue'
import GithubCard from '../../components/connector/GithubCard.vue'
import { onMounted } from 'vue'

import { useConnectorStore } from '../../stores/connector'

const connectorStore=useConnectorStore()

onMounted(()=>{

    connectorStore.fetchConnectors()

})


</script>