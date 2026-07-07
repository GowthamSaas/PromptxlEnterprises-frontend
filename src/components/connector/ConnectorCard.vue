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
    margin-bottom:28px;
  "
>
        <!-- Left Side -->
        <div
          style="
            display:flex;
            align-items:center;
            gap:18px;
            flex:1;
          "
        >
          <!-- Icon -->
          <!-- Icon -->
<div
  v-if="icon || $slots.icon"
  :style="{
    width: '68px',
    height: '68px',
    borderRadius: '18px',

    background: $slots.icon ? '#FFFFFF' : iconBackground,

    border: $slots.icon ? '1px solid #E5E7EB' : 'none',

    color: $slots.icon ? '#111827' : '#FFFFFF',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: $slots.icon
      ? '0 2px 8px rgba(15,23,42,0.05)'
      : 'none',

    flexShrink: 0
  }"
>
  <slot v-if="$slots.icon" name="icon" />

  <i
    v-else
    :class="icon"
    style="font-size:22px"
  />
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
                 font-size:22px;
font-weight:700;
line-height:1.2;
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
                color:#64748B;
font-size:16px;
line-height:1.5;
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
     <Divider style="margin:26px 0 30px 0" />
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