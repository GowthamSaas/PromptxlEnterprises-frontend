<template>
  <ConnectorCard
    title="Supabase"
    description="Connect your Supabase account"
    icon="pi pi-supabase"
    iconBackground="#22C55E"
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
    <!-- ADMIN VIEW (Read Only) -->
    <!-- ============================= -->
    <div v-if="isAdminView">
      <Message v-if="isConnected" severity="info" :closable="false">
        <div class="row row-between">
          <div>
            <strong>API Key Connected</strong>
            <small class="row">Supabase API is ready to use by the owner</small>
          </div>
          <i class="pi pi-check-circle" style="font-size: 1.5rem; color: #22c55e;"></i>
        </div>
      </Message>
      <Message v-else severity="secondary" :closable="false">
        <div class="row row-between">
          <div>
            <strong>Not Connected</strong>
            <small class="row">Owner has not connected a Supabase API key yet</small>
          </div>
          <i class="pi pi-info-circle" style="font-size: 1.5rem;"></i>
        </div>
      </Message>
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
          Supabase Access Token
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
          :label="localLoading ? 'Validating...' : 'Connect Supabase'"
          :icon="localLoading ? '' : 'pi pi-supabase'"
          :loading="localLoading"
          :disabled="localLoading"
          fluid
          @click="connect"
        />

        <!-- Help -->
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
            <li>Open Supabase Dashboard</li>
            <li>Select your project</li>
            <li>Go to Settings → API</li>
            <li>Copy your Access Token</li>
          </ol>

          <Button
            label="Get API Key"
            icon="pi pi-external-link"
            link
            as="a"
            href="https://supabase.com/dashboard/sign-in?returnTo=%2Faccount%2Ftokens"
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
                Your Supabase API is ready to use
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
              <i class="pi pi-supabase"></i>

              <span>{{ project }}</span>

            </div>

            <div
              style="
                display:flex;
                align-items:center;
                gap:10px;
                color:#15803d;
              "
            >
              <i class="pi pi-server"></i>

              <span>{{ tables }} table(s) available</span>

            </div>

          </div>

        </div>

      

      <!-- Bottom Success Message -->

      <Message
        severity="success"
        style="margin-top:22px"
      >
        Connected successfully! Project: {{ project }}
      </Message>
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
import SupabaseIcon from '../icons/SupabaseIcon.vue'
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
  return connectorStore.connectors.supabase.connected
})

const project = computed(() => {
  return connectorStore.connectors.supabase.project
})

const tables = computed(() => {
  return connectorStore.connectors.supabase.tables
})

async function connect() {

  // Empty Validation
  if (!token.value.trim()) {

    toast.add({
      severity: 'warn',
      summary: 'Token Required',
      detail: 'Please enter your Supabase Access Token.',
      life: 3000
    })

    return
  }

  localLoading.value = true

  try {
    await connectorStore.connectConnector({
      provider: 'supabase',
      token: token.value
    })

    toast.add({
      severity: 'success',
      summary: 'Connected',
      detail: 'Supabase connected successfully.',
      life: 3000
    })
  }
  catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Connection failed',
      detail: error?.response?.data?.detail || error?.message || 'Unable to connect Supabase.',
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
    await connectorStore.disconnectConnector('supabase')

    token.value = ''

    toast.add({
      severity: 'success',
      summary: 'Disconnected',
      detail: 'Supabase disconnected successfully.',
      life: 3000
    })
  }
  finally {
    localLoading.value = false
  }
}
</script>