<template>
 <Card
  :pt="{
    root:{
      style:{
        borderRadius:'22px',
        border:'1px solid #E5E7EB',
        boxShadow:'0 8px 24px rgba(15,23,42,0.06)'
      }
    },
    content:{
      style:{
        padding:'30px'
      }
    }
  }"
>
    <template #content>

      <!-- Header -->
      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          margin-bottom:22px;
        "
      >
        <!-- Left Side -->
        <div
          style="
            display:flex;
            align-items:center;
            gap:20px;
            flex:1;
          "
        >
          <!-- Icon -->
          <div
            v-if="icon || $slots.icon"
            style="
              width:56px;
              height:56px;
              border-radius:16px;
              background:iconBackground;
              color:#fff;
              display:flex;
              align-items:center;
              justify-content:center;
              overflow:hidden;
              flex-shrink:0;
            "
          >
            <slot v-if="$slots.icon" name="icon" />
            <i v-else :class="icon" style="font-size:20px" />
          </div>

          <!-- Title & Description -->
          <div style="flex:1">
            <div
              style="
                display:flex;
                align-items:center;
                gap:10px;
                margin-bottom:6px;
              "
            >
              <div
                style="
                  font-size:25px;
                  font-weight:700;
                  color:#111827;
                "
              >
                {{ title }}
              </div>

              <!-- Old Status Slot (Optional) -->
              <slot name="status"></slot>
            </div>

            <div
              style="
                color:#6B7280;
                font-size:15px;
              "
            >
              {{ description }}
            </div>
          </div>
        </div>

        <!-- New Actions Slot -->
        <div
  style="
    margin-left:20px;
    display:flex;
    align-items:center;
  "
>
          <slot name="actions"></slot>
        </div>
      </div>
     <Divider style="margin:24px 0" />
      <!-- Body -->
      <slot />

    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import VercelIcon from '../icons/VercelIcon.vue'
import Divider from 'primevue/divider'

defineProps({
  title: String,
  description: String,
  icon: String,
  iconBackground: {
    type: String,
    default: '#6D28D9'
  }
})
</script>