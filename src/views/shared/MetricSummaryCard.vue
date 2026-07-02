<template>
  <div class="metric-summary-card" :class="`metric-summary-card--${tone}`">
    <div class="metric-summary-card__icon" v-if="icon">
      <component :is="icon" />
    </div>
    <div class="metric-summary-card__content">
      <span class="metric-summary-card__label">{{ label }}</span>
      <strong class="metric-summary-card__value">{{ value }}</strong>
      <span v-if="sub" class="metric-summary-card__sub">{{ sub }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
  tone?: string;
  icon?: any;
  sub?: string;
}>();
</script>