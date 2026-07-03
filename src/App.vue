<template>
  <div class="app-container">
    <Toast :breakpoints="{'920px': {width: '100%', right: '0', left: '0'}}" />
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
