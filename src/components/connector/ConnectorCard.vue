<template>
  <Card
    :pt="{
      content: {
        style: {
          padding: '28px'
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
            gap:16px;
            flex:1;
          "
        >
          <!-- Icon -->
          <div
            :style="{
              width: '72px',
              height: '72px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: iconBackground,
              color: '#fff',
              fontSize: '30px',
              boxShadow: '0 10px 25px rgba(0,0,0,.15)'
            }"
          >
            <i :class="icon"></i>
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
                  font-size:24px;
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
                color:#64748b;
                font-size:16px;
              "
            >
              {{ description }}
            </div>
          </div>
        </div>

        <!-- New Actions Slot -->
        <div style="margin-left:16px">
          <slot name="actions"></slot>
        </div>
      </div>

      <!-- Body -->
      <slot />

    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'

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