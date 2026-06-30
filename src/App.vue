<template>
  <div class="app-container">
    <Toast />
    <ConfirmDialog />
    <router-view />
  </div>
</template>

<script setup>
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
</script>

<style>
.app-container {
  min-height: 100vh;
}
</style>
