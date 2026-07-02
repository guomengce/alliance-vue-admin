<template>
  <span class="status-pill" :class="[`status-pill--${tone}`, { 'status-pill--pulse': pulse }]">
    <span class="status-pill__dot"></span>
    <span class="status-pill__text">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  status?: string;
  text: string;
  tone?: string;
  pulse?: boolean;
}>();
</script>