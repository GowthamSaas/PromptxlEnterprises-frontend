<template>
  <!-- Status Card -->
  <div
    :style="{
      border: connected ? '1px solid #BBF7D0' : '1px solid #FECACA',
      background: connected ? '#F0FDF4' : '#FEF2F2',
      borderRadius: '16px',
      padding: '22px',
      display: 'flex',
      alignItems: 'center',
      gap: '18px'
    }"
  >
    <!-- Icon -->
    <Avatar
      :icon="connected ? 'pi pi-check-circle' : 'pi pi-times-circle'"
      shape="circle"
      :style="{
        width:'60px',
        height:'60px',
        background: connected ? '#DCFCE7' : '#FEE2E2',
        color: connected ? '#16A34A' : '#DC2626'
      }"
    />

    <!-- Text -->
    <div style="flex:1">

      <div
        :style="{
          fontSize:'28px',
          fontWeight:'700',
          color: connected ? '#166534' : '#991B1B'
        }"
      >
        {{ connected ? 'Connected' : 'Not Connected' }}
      </div>

      <div
        style="
          margin-top:6px;
          color:#64748B;
          font-size:16px;
        "
      >
        {{
          connected
            ? 'API key is active and ready to use'
            : `Owner has not connected a ${provider} API key yet.`
        }}
      </div>

    </div>

  </div>

  <!-- Connection Details -->
  <div
    v-if="connected"
    style="
      display:flex;
      gap:36px;
      margin-top:22px;
      padding-top:18px;
      border-top:1px solid #DCFCE7;
    "
  >

    <div>

      <div
        style="
          font-size:13px;
          color:#6B7280;
        "
      >
        Connected by
      </div>

      <div
        style="
          margin-top:6px;
          font-weight:600;
          color:#2563EB;
        "
      >
        {{ connectedBy || '-' }}
      </div>

    </div>

    <div>

      <div
        style="
          font-size:13px;
          color:#6B7280;
        "
      >
        Connected on
      </div>

      <div
        style="
          margin-top:6px;
          font-weight:600;
          color:#2563EB;
        "
      >
        {{ formatDate(connectedOn) }}
      </div>

    </div>

    <div>

      <div
        style="
          font-size:13px;
          color:#6B7280;
        "
      >
        Last used
      </div>

      <div
        style="
          margin-top:6px;
          font-weight:600;
          color:#2563EB;
        "
      >
        {{ formatDateTime(lastUsed) }}
      </div>

    </div>

  </div>

</template>

<script setup>

import Avatar from 'primevue/avatar'

defineProps({

  connected: Boolean,

  provider: {
    type: String,
    default: ''
  },

  connectedBy: {
    type: String,
    default: ''
  },

  connectedOn: {
    type: String,
    default: ''
  },

  lastUsed: {
    type: String,
    default: ''
  }

})

function formatDate(value) {

  if (!value) return '-'

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

}

function formatDateTime(value) {

  if (!value) return '-'

  return new Date(value).toLocaleString()

}

</script>