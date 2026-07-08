<script setup>
import splashLogo from "../assets/logo/splash-logo.png";
</script>

<template>
  <div class="splash-screen">
    <div class="splash-content">
      <img src="/src/assets/logo/splash-logo.png" alt="logo" />
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: radial-gradient(circle at center, #4338ca 0%, #1e1b4b 70%);
  overflow: hidden;
}

.splash-content {
  text-align: center;
  animation: splashAnimation 2.3s ease-in-out;
}
.full-logo {
  width: min(600px, 90vw);
  height: auto;
  display: block;
  margin: 0 auto;
}

.logo-box {
  width: 120px;
  height: 120px;

  margin: 0 auto 28px;

  border-radius: 28px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(8px);

  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.08);
}

.logo-image {
  width: 68px;
  height: 68px;
  object-fit: contain;
}

.logo-title {
  margin: 0;

  color: #fff;

  font-size: clamp(42px, 7vw, 68px);

  font-weight: 800;

  letter-spacing: -2px;

  text-shadow: 0 6px 25px rgba(0, 0, 0, 0.35);
}

.logo-subtitle {
  margin-top: 12px;

  font-size: clamp(16px, 2vw, 24px);

  font-weight: 700;

  letter-spacing: 12px;

  color: #7384ff;
}

@keyframes splashAnimation {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  30% {
    opacity: 1;
    transform: scale(1);
  }

  80% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1.05);
  }
}
</style>
