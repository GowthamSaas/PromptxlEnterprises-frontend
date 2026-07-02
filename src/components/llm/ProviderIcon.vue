<template>
  <div class="provider-icon" :class="providerKey" :style="{ width: size + 'px', height: size + 'px' }">
    <svg v-if="providerKey === 'openai'" viewBox="0 0 48 48" role="img" aria-label="OpenAI icon">
      <defs>
        <linearGradient id="openaiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#000" />
          <stop offset="100%" stop-color="#444" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="url(#openaiGradient)" />
      <path d="M24 14c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 4c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z" fill="#fff" opacity="0.9" />
    </svg>

    <svg v-else-if="providerKey === 'gemini'" viewBox="0 0 48 48" role="img" aria-label="Gemini icon">
      <circle cx="24" cy="24" r="20" fill="#fff" stroke="#4285F4" stroke-width="3" />
      <path d="M24 14v20M14 24h20" stroke="#4285F4" stroke-width="4" stroke-linecap="round" />
      <path d="M24 14l10 10-10 10-10-10 10-10" fill="none" stroke="#0F9D58" stroke-width="4" />
    </svg>

    <svg v-else-if="providerKey === 'claude'" viewBox="0 0 48 48" role="img" aria-label="Claude icon">
      <defs>
        <linearGradient id="claudeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7C3AED" />
          <stop offset="100%" stop-color="#F59E0B" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="url(#claudeGradient)" />
      <path d="M30 14a10 10 0 1 1 0 20" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" />
    </svg>

    <svg v-else viewBox="0 0 48 48" role="img" aria-label="Provider icon">
      <circle cx="24" cy="24" r="20" fill="#cbd5e1" />
      <text x="24" y="30" text-anchor="middle" font-size="18" fill="#1f2937" font-weight="700">?</text>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({ providerKey: String, size: { type: Number, default: 28 } })
</script>

<style scoped>
.provider-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}

.provider-icon svg {
  width: 100%;
  height: 100%;
}
</style>
