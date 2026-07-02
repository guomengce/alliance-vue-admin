<template>
  <div class="metric-grid">
    <MetricCard v-for="card in cards" :key="card.key" v-bind="card" />
  </div>
</template>

<script setup lang="ts">
import MetricCard from './MetricCard.vue';

defineProps<{ cards: any[] }>();
</script>

<style scoped>
.metric-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 1280px) {
  .metric-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .metric-grid {
    grid-template-columns: 1fr;
  }
}
</style>
