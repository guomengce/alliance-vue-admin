<template>
  <div class="commission-summary-grid">
    <MetricSummaryCard
      v-for="(kpi, index) in kpis"
      :key="index"
      :label="kpi.label"
      :value="kpi.value"
      :sub="kpi.sub"
      :tone="kpi.tone"
    />
  </div>
</template>

<script setup lang="ts">
import MetricSummaryCard from '../../shared/MetricSummaryCard.vue';

defineProps<{ kpis: any[] }>();
</script>