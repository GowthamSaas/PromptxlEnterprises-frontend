<template>
  <div class="workspace-page">

    <WorkspaceHeader />

    <div class="workspace-layout">

      <PromptPanel />

      <ExplorerPanel />

      <MonacoEditor />

      <GenerateProgress />

    </div>

  </div>
</template>

<script setup>
import WorkspaceHeader from "../../components/ai_workspace/WorkspaceHeader.vue";
import PromptPanel from "../../components/ai_workspace/PromptPanel.vue";
import ExplorerPanel from "../../components/ai_workspace/ExplorerPanel.vue";
import MonacoEditor from "../../components/ai_workspace/MonacoEditor.vue";
import GenerateProgress from "../../components/ai_workspace/GenerateProgress.vue";
</script>

<style scoped>

.workspace-page{

    height:100vh;

    display:flex;

    flex-direction:column;

    background:#f8fafc;

}

.workspace-layout{

    flex:1;

    display:grid;

    grid-template-columns:320px 340px 1fr;

    overflow:hidden;

}

@media (max-width:1400px){

.workspace-layout{

grid-template-columns:280px 300px 1fr;

}

}

@media (max-width:1100px){

.workspace-layout{

grid-template-columns:260px 280px 1fr;

}

}

</style>