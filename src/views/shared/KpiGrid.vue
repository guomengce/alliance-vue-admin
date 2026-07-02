<template>
  <div class="admin-kpi-grid">
    <article v-for="item in items" :key="item.label" class="admin-kpi" :class="item.tone">
      <span>{{ item.label }}</span>
      <strong>{{ item.value }}</strong>
      <small>{{ item.sub }}</small>
    </article>
  </div>
</template>

<script setup lang="ts">
interface KpiItem {
  label: string;
  value: string;
  sub?: string;
  tone?: string;
}
defineProps<{ items: KpiItem[] }>();
</script>
