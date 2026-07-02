<template>
  <div class="mobile-card-list">
    <article v-for="(row, index) in rows" :key="row[rowKey] || index" class="mobile-data-card">
      <h3>{{ title(row) }}</h3>
      <p>{{ subtitle(row) }}</p>
      <div class="mobile-data-card__grid">
        <div v-for="field in fields" :key="field.label">
          <span>{{ field.label }}</span>
          <strong>{{ field.format ? field.format(row) : row[field.prop] }}</strong>
        </div>
      </div>
      <div v-if="$slots.actions" class="mobile-data-card__actions">
        <slot name="actions" :row="row" />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
interface Field {
  label: string;
  prop?: string;
  format?: (row: any) => string;
}
defineProps<{
  rows: any[];
  fields: Field[];
  rowKey?: string;
  title: (row: any) => string;
  subtitle?: (row: any) => string;
}>();
</script>

<style scoped lang="scss">
.mobile-data-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}
</style>
