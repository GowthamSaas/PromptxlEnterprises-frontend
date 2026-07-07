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

  <!-- Connected -->
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

  <!-- Not Connected -->
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
    <!-- <div v-if="isAdminView">
      <Message v-if="isConnected" severity="info" :closable="false">
        <div class="row row-between">
          <div>
            <strong>API Key Connected</strong>
            <small class="row">Vercel API is ready to use by the owner</small>
          </div>
          <i class="pi pi-check-circle" style="font-size: 1.5rem; color: #22c55e;"></i>
        </div>
      </Message>
      <Message v-else severity="secondary" :closable="false">
        <div class="row row-between">
          <div>
            <strong>Not Connected</strong>
            <small class="row">Owner has not connected a Vercel API key yet</small>
          </div>
          <i class="pi pi-info-circle" style="font-size: 1.5rem;"></i>
        </div>
      </Message>
    </div> -->
    <div v-if="isAdminView">
   <ConnectorStatus
    :connected="isConnected"
    provider="Vercel"
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
                  font-size:18px;
                  font-weight:600;
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
              <i class="pi pi-cloud"></i>
              
              <span>{{ teams }} team(s) available</span>

            </div>
          </div>

        </div>
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
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

import ConnectorCard from './ConnectorCard.vue'
import VercelIcon from '../icons/VercelIcon.vue'
import ConnectorStatus from './ConnectorStatus.vue'

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


const isConnected = computed(() => {
  return connectorStore.connectors.vercel.connected
})



const teams = computed(() => {
  return connectorStore.connectors.vercel.teams
})

const connectedBy = computed(() => {
  return connectorStore.connectors.vercel.connectedBy
})

const connectedOn = computed(() => {
  return connectorStore.connectors.vercel.connectedOn
})

const lastUsed = computed(() => {
  return connectorStore.connectors.vercel.lastUsed
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

  localLoading.value = true

  try {

    await connectorStore.disconnectConnector('vercel')

    token.value = ''

    toast.add({
      severity: 'success',
      summary: 'Disconnected',
      detail: 'Vercel disconnected successfully.',
      life: 3000
    })

  } finally {

    localLoading.value = false

  }

}
</script>