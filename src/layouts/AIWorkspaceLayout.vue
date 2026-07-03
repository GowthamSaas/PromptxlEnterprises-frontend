<template>
  <div class="ai-workspace-layout">
    <header class="workspace-header">
      <AITopNavbar />
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AITopNavbar from '../components/common/AITopNavbar.vue'
</script>

<style scoped>
.ai-workspace-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
}

.workspace-header {
  z-index: 10;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.main-content {
  flex: 1;
  padding: 24px 28px;
}
</style>
