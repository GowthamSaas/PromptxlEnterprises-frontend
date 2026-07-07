<template>
  <div>
    <!-- Status Box -->
    <div
  :style="{
    border: connected ? '1px solid #BBF7D0' : '1px solid #FECACA',
    background: connected ? '#F0FDF4' : '#FEF2F2',
    borderRadius: '18px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    minHeight:'132px',
    boxSizing:'border-box'
  }"
>
      <!-- Icon -->
      <Avatar
  :icon="connected ? 'pi pi-check-circle' : 'pi pi-link'"
  shape="circle"
  :style="{
    width:'64px',
    height:'64px',
    background: connected ? '#DCFCE7' : '#FEE2E2',
    border:'none',
    color: connected ? '#16A34A' : '#DC2626'
  }"
  :pt="{
    icon: {
      style: {
        fontSize: '22px'
      }
    }
  }"
/>

      <!-- Content -->
      <div style="flex:1">

        <div
          :style="{
            fontSize:'20px',
            fontWeight:'600',
            color:'#111827'
          }"
        >
          {{ connected ? 'Connected' : 'Not Connected' }}
        </div>

        <div
          style="
            margin-top:8px;
           color:#475569;
            font-size:15px;
line-height:1.6;
          "
        >
          {{
            connected
              ? 'API key is active and ready to use'
              : `Owner has not connected a ${provider} API key yet`
          }}
        </div>

      </div>

    </div>

    <!-- Footer -->
  <div
  v-if="connected"
  style="
    display:flex;
    margin-top:24px;
    align-items:flex-start;
  "
>

      <!-- Connected By -->
      <div
  style="
    padding-right:26px;
    border-right:1px solid #E5E7EB;
  "
>

  <div
    style="
      font-size:13px;
      color:#6B7280;
      margin-bottom:8px;
    "
  >
    Connected by
  </div>

  <div
    style="
      font-size:18px;
      font-weight:600;
      color:#2563EB;
    "
  >
    {{ connectedBy || '-' }}
  </div>

</div>

      <!-- Connected On -->
      <div
  style="
    padding:0 26px;
    border-right:1px solid #E5E7EB;
  "
>

        <div
          style="
            font-size:13px;
            color:#6B7280;
            margin-bottom:8px;
          "
        >
          Connected on
        </div>

        <div
          style="
            font-size:18px;
            font-weight:600;
            color:#2563EB;
          "
        >
          {{ formatDate(connectedOn) }}
        </div>

      </div>

      <!-- Last Used -->
      <div
  style="
    padding-left:26px;
  "
>

        <div
          style="
            font-size:14px;
            color:#6B7280;
            margin-bottom:8px;
          "
        >
          Last used
        </div>

        <div
          style="
            font-size:18px;
            font-weight:600;
            color:#2563EB;
          "
        >
          {{ formatDate(lastUsed) }}
        </div>

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
    day: '2-digit',
    year: 'numeric'
  })

}
</script>