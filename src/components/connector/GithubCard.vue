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
    rounded
    icon="pi pi-check"
    value="Connected"
    :pt="{
      root:{
        style:{
          background:'#DCFCE7',
          color:'#16A34A',
          border:'none',
          padding:'8px 16px',
          fontWeight:'600',
          fontSize:'15px',
          borderRadius:'999px'
        }
      },
      icon:{
        style:{
          fontSize:'13px',
          marginRight:'6px'
        }
      }
    }"
  />

  <Tag
    v-else-if="isAdminView"
    rounded
    icon="pi pi-circle-fill"
    value="Not Available"
    :pt="{
      root:{
        style:{
          background:'#FEE2E2',
          color:'#DC2626',
          border:'none',
          padding:'8px 16px',
          fontWeight:'600',
          fontSize:'15px',
          borderRadius:'999px'
        }
      },
      icon:{
        style:{
          fontSize:'8px',
          marginRight:'8px'
        }
      }
    }"
  />

</template>

    <!-- ============================= -->
    <!-- ADMIN VIEW (Read Only) -->
    <!-- ============================= -->
<div v-if="isAdminView">
  <ConnectorStatus
    :connected="isConnected"
    provider="GitHub"
    :connectedBy="connectedBy"
    :connectedOn="connectedOn"
    :lastUsed="lastUsed"
  />
</div>

    <!-- ============================= -->
    <!-- OWNER VIEW (Full Configuration) -->
    <!-- ============================= -->
    <template v-else>
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
          GitHub Access Token
        </div>

        <!-- Token -->
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

        <!-- Connect Button -->
        <Button
          :label="localLoading ? 'Validating...' : 'Connect GitHub'"
          :icon="localLoading ? '' : 'pi pi-check-circle'"
          :loading="localLoading"
          :disabled="localLoading"
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
  as="a"
  href="https://github.com/settings/tokens"
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
            background:#ECFDF5;
            border:1px solid #BBF7D0;
            border-radius:16px;
            padding:24px;
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
                  font-size:22px;
                  font-weight:700;
                "
              >
                <i class="pi pi-check-circle"></i>

                GitHub Connected
              </div>

              <div
                style="
                  margin-top:8px;
                  color:#166534;
                "
              >
                Your GitHub account is connected and ready to use
              </div>

            </div>

            <Button
  label="Disconnect"
  icon="pi pi-trash"
  text
  severity="danger"
  :loading="loading"
  @click="disconnect"
  :pt="{
    label:{
      style:{
        fontWeight:'600'
      }
    }
  }"
/>

          </div>

          <!-- Details -->

          <div
            style="
              display:flex;
              flex-direction:column;
              gap:16px;
              margin-top:24px;
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
              <i class="pi pi-folder"></i>

               <span>{{ repositories }} repository(s) available</span>

            </div>

          </div>

        </div>

        <!-- Success Message -->

        <!-- <Message
          severity="success"
          style="margin-top:22px"
        >
          Connected successfully! Account: {{ account }}
        </Message> -->

      </div>
    </template>
    <!-- End Owner View -->

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
import ConnectorStatus from './ConnectorStatus.vue'
import ConnectorCard from './ConnectorCard.vue'

import { useConnectorStore } from '../../stores/connector'
import { useAuthStore } from '../../stores/auth'
import { useToast } from 'primevue/usetoast'

const token = ref('')

const connectorStore = useConnectorStore()
const authStore = useAuthStore()
const toast = useToast()

const localLoading = ref(false)

// Role-based view control
const isAdminView = computed(() => authStore.isAdmin && !authStore.isOwner)
const canConfigure = computed(() => authStore.isOwner)

const isConnected = computed(() => {
  return connectorStore.connectors.github.connected
})

const account = computed(() => {
  return connectorStore.connectors.github.account
})

const repositories = computed(() => {
  return connectorStore.connectors.github.repositories
})

const connectedBy = computed(() => {
  return connectorStore.connectors.github.connectedBy
})

const connectedOn = computed(() => {
  return connectorStore.connectors.github.connectedOn
})

const lastUsed = computed(() => {
  return connectorStore.connectors.github.lastUsed
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

  localLoading.value = true

  try {
    await connectorStore.connectConnector({
      provider: 'github',
      token: token.value
    })

    toast.add({
      severity: 'success',
      summary: 'Connected',
      detail: 'GitHub connected successfully.',
      life: 3000
    })
  }
  catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Connection failed',
      detail: error?.response?.data?.detail || error?.message || 'Unable to connect GitHub.',
      life: 4000
    })
  }
  finally {
    localLoading.value = false
  }
}

async function disconnect() {
  localLoading.value = true

  try {
    await connectorStore.disconnectConnector('github')

    token.value = ''

    toast.add({
      severity: 'success',
      summary: 'Disconnected',
      detail: 'GitHub disconnected successfully.',
      life: 3000
    })
  }
  finally {
    localLoading.value = false
  }
}
</script>