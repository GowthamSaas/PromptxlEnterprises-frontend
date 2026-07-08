<template>
  <div class="app-container">
    <Toast :breakpoints="{ '920px': { width: '100%', right: '0', left: '0' } }" />
    <ConfirmDialog />

    <SplashView v-if="showSplash" />
    <RouterView v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import SplashView from "./views/SplashView.vue";

const showSplash = ref(false);

onMounted(() => {
  const splashShown = sessionStorage.getItem("splashShown");

  if (!splashShown) {
    showSplash.value = true;

    setTimeout(() => {
      showSplash.value = false;
      sessionStorage.setItem("splashShown", "true");
    }, 1500);
  }
});
</script>

<style>
.app-container {
  min-height: 100vh;
}
</style>