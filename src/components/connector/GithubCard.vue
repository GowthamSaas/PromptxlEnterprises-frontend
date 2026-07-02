<template>
  <ConnectorCard
    title="GitHub"
    description="Connect your GitHub account"
    icon="pi pi-github"
    iconBackground="#111827"
  >
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
        GitHub Personal Access Token
      </div>

      <!-- Token -->
      <IconField
        iconPosition="left"
        style="margin-bottom:18px"
      >
        <InputIcon class="pi pi-key" />

        <Password
          v-model="token"
          placeholder="Enter your GitHub token..."
          toggleMask
          :feedback="false"
          fluid
          :disabled="loading"
        />
      </IconField>

      <!-- Connect Button -->
      <Button
        :label="loading ? 'Validating...' : 'Connect GitHub'"
        :icon="loading ? '' : 'pi pi-github'"
        :loading="loading"
        :disabled="loading"
        fluid
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
          <li>Open GitHub Settings</li>
          <li>Go to Developer Settings</li>
          <li>Select Personal Access Tokens</li>
          <li>Generate a new token</li>
          <li>Copy & paste it here</li>
        </ol>

        <Button
          label="Get API Key"
          icon="pi pi-external-link"
          link
          style="margin-top:12px"
        />

      </Panel>

    </div>

    <!-- ============================= -->
    <!-- CONNECTED UI -->
    <!-- ============================= -->

    <div v-else>

      <div
        style="
          background:#ECFDF5;
          border:1px solid #BBF7D0;
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
                color:#166534;
                font-size:20px;
                font-weight:700;
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
              Your GitHub API is ready to use
            </div>

          </div>

          <Button
            label="Disconnect"
            icon="pi pi-trash"
            text
            severity="danger"
            :loading="loading"
            @click="disconnect"
          />

        </div>

        <!-- Details -->

        <div
          style="
            display:flex;
            flex-direction:column;
            gap:14px;
            margin-top:22px;
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
            <i class="pi pi-user"></i>

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
            <i class="pi pi-github"></i>

            <span>{{ repositories }} repositories available</span>

          </div>

        </div>

      </div>

      <!-- Success Message -->

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
import Message from 'primevue/message'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

import ConnectorCard from './ConnectorCard.vue'

import { useConnectorStore } from '../../stores/connector'
import { useToast } from 'primevue/usetoast'

const token = ref('')

const connectorStore = useConnectorStore()
const toast = useToast()

const loading = computed(() => connectorStore.loading)

const isConnected = computed(() => {
  return connectorStore.connectors.github.connected
})

const account = computed(() => {
  return connectorStore.connectors.github.account
})

const repositories = computed(() => {
  return connectorStore.connectors.github.repositories
})

async function connect() {

  // Empty Validation
  if (!token.value.trim()) {

    toast.add({
      severity: 'warn',
      summary: 'Token Required',
      detail: 'Please enter your GitHub Personal Access Token.',
      life: 3000
    })

    return
  }

  await connectorStore.connectConnector({
    provider: 'github'
  })

  toast.add({
    severity: 'success',
    summary: 'Connected',
    detail: 'GitHub connected successfully.',
    life: 3000
  })
}

async function disconnect() {

  await connectorStore.disconnectConnector('github')

  token.value = ''

  toast.add({
    severity: 'success',
    summary: 'Disconnected',
    detail: 'GitHub disconnected successfully.',
    life: 3000
  })
}
</script>