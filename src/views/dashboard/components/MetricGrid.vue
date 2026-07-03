<template>
  <div class="metric-grid">
    <MetricCard v-for="card in cards" :key="card.key" v-bind="card" />
  </div>
</template>

<script setup lang="ts">
import MetricCard from './MetricCard.vue';

defineProps<{ cards: any[] }>();
</script>
