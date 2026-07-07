<script setup>
import { siGithub } from 'simple-icons'
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    width="68"
    height="68"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- rounded square -->
    <rect
      x="0"
      y="0"
      width="24"
      height="24"
      rx="4"
      fill="#111111"
    />

    <!-- github -->
    <g transform="translate(2.5 2.5) scale(0.79)">
      <path
        :d="siGithub.path"
        fill="#FFFFFF"
      />
    </g>
  </svg>
</template>