<template>
  <article class="dashboard-card metric-card">
    <div class="kpi-mark">KPI</div>
    <p>{{ title }}</p>
    <strong :class="colorClass">{{ value }}</strong>
    <span>{{ sub }}</span>
  </article>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
  sub: { type: String, required: true },
  colorClass: { type: String, default: 'is-white' },
});
</script>
