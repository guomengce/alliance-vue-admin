<template>
  <div class="mobile-card-list">
    <article v-for="(row, index) in rows" :key="row[rowKey] || index" class="mobile-data-card">
      <h3>{{ title(row) }}</h3>
      <p v-if="subtitle">{{ subtitle(row) }}</p>
      <div class="mobile-data-card__grid">
        <div v-for="field in fields" :key="field.label">
          <span>{{ field.label }}</span>
          <strong>{{ getFieldValue(row, field) }}</strong>
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
withDefaults(defineProps<{
  rows: any[];
  fields: Field[];
  rowKey?: string;
  title: (row: any) => string;
  subtitle?: (row: any) => string;
}>(), {
  rowKey: 'id',
  subtitle: undefined,
});

function getFieldValue(row: Record<string, any>, field: Field) {
  if (field.format) return field.format(row);
  if (!field.prop) return '';
  return row[field.prop] ?? '';
}
</script>

<style scoped lang="scss">
.mobile-data-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}
</style>
