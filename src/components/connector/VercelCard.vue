<template>
  <ConnectorCard
    title="Vercel"
    description="Deploy to your Vercel account"
    icon="pi pi-send"
    iconBackground="#111827"
  >
    <template #icon>
       <VercelIcon />
  </template>
    <!-- Connected Badge -->
    <template #actions>
      <Tag
        v-if="isConnected"
        value="Connected"
        severity="success"
        rounded
      />
    </template>

    <!-- ============================= -->
    <!-- CONNECT FORM -->
    <!-- ============================= -->

    <div v-if="!isConnected">
      <!-- Label -->
      <div
        style="
          font-size:14px;
          font-weight:600;
          color:#374151;
          margin-bottom:8px;
        "
      >
        Vercel Access Token
      </div>

      <!-- Password -->
      <IconField
        iconPosition="left"
        style="margin-bottom:18px"
      >
        <InputIcon class="pi pi-key" />

        <Password
          v-model="token"
          placeholder="Enter your token..."
          toggleMask
          :feedback="false"
          fluid
          :disabled="localLoading"
        />
      </IconField>

      <!-- Button -->
      <Button
        :label="localLoading ? 'Validating...' : 'Connect Vercel'"
        :icon="localLoading ? '' : 'pi pi-check-circle'"
        :loading="localLoading"
        fluid
        :disabled="localLoading"
        @click="connect"
      />

      <!-- Help Panel -->
      <Panel style="margin-top:20px">
        <template #header>
          <div
            style="
              display:flex;
              align-items:center;
              gap:8px;
              font-weight:600;
            "
          >
            <i class="pi pi-sparkles"></i>
            How to get your API key
          </div>
        </template>

        <ol
          style="
            margin:0;
            padding-left:20px;
            color:#475569;
            line-height:2;
          "
        >
          <li>Go to Vercel Settings → Tokens</li>
          <li>Create a new token</li>
          <li>Give your token a name</li>
          <li>Copy & paste it here</li>
        </ol>

       <Button
  label="Get API Key"
  icon="pi pi-external-link"
  link
  as="a"
  href="https://vercel.com/account/settings/tokens"
  target="_blank"
/>
      </Panel>
    </div>

    <!-- ============================= -->
    <!-- CONNECTED UI -->
    <!-- ============================= -->

    <div v-else>
  <div
    style="
      background:#ecfdf5;
      border:1px solid #bbf7d0;
      border-radius:14px;
      padding:22px;
    "
  >

    <!-- Header -->
    <div
      style="
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
      "
    >

      <div>

        <div
          style="
            display:flex;
            align-items:center;
            gap:10px;
            font-size:22px;
            font-weight:700;
            color:#166534;
          "
        >
          <i class="pi pi-check-circle"></i>

          API Key Connected
        </div>

        <div
          style="
            margin-top:8px;
            color:#166534;
          "
        >
          Your Vercel API is ready to use
        </div>

      </div>

      <Button
        label="Disconnect"
        icon="pi pi-trash"
        text
        severity="danger"
        :loading="localLoading"
        @click="disconnect"
      />

    </div>

    <div
      style="
        margin-top:22px;
        display:flex;
        flex-direction:column;
        gap:14px;
      "
    >

      <div
        style="
          display:flex;
          align-items:center;
          gap:10px;
          color:#15803d;
        "
      >
        <i class="pi pi-shield"></i>

        <span>{{ account }}</span>

      </div>

      <div
        style="
          display:flex;
          align-items:center;
          gap:10px;
          color:#15803d;
        "
      >
        <i class="pi pi-cloud"></i>

        <span>{{ teams }} team(s) available</span>

      </div>

    </div>

  </div>

  <Message
    severity="success"
    style="margin-top:22px"
  >
    Connected successfully! Account: {{ account }}
  </Message>

</div>
  </ConnectorCard>
</template>
<script setup>
import { ref, computed } from 'vue'

import Button from 'primevue/button'
import Password from 'primevue/password'
import Panel from 'primevue/panel'
import Tag from 'primevue/tag'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

import ConnectorCard from './ConnectorCard.vue'
import VercelIcon from '../icons/VercelIcon.vue'

import { useConnectorStore } from '../../stores/connector'

import { useToast } from 'primevue/usetoast'
import Message from 'primevue/message'
const token = ref('')

const connectorStore = useConnectorStore()

const toast = useToast()

const localLoading = ref(false)

const isConnected = computed(() => {
  return connectorStore.connectors.vercel.connected
})

const account = computed(() => {
  return connectorStore.connectors.vercel.account
})

const teams = computed(() => {
  return connectorStore.connectors.vercel.teams
})

async function connect() {

  // Empty validation
  if (!token.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Token Required',
      detail: 'Please enter your Vercel Access Token.',
      life: 3000
    })

    return
  }

  localLoading.value = true

  try {
    await connectorStore.connectConnector({
      provider: 'vercel',
      token: token.value
    })

    toast.add({
      severity: 'success',
      summary: 'Connected',
      detail: 'Vercel connected successfully.',
      life: 3000
    })
  }
  catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Connection failed',
      detail: error?.response?.data?.detail || error?.message || 'Unable to connect Vercel.',
      life: 4000
    })
  }
  finally {
    localLoading.value = false
  }
}

async function disconnect() {

  await connectorStore.disconnectConnector('vercel')

  token.value = ''

  toast.add({
    severity: 'success',
    summary: 'Disconnected',
    detail: 'Vercel disconnected successfully.',
    life: 3000
  })
}
</script>