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

<script setup>
defineProps({
  rows: { type: Array, required: true },
  fields: { type: Array, required: true },
  rowKey: { type: String, default: 'id' },
  title: { type: Function, required: true },
  subtitle: { type: Function, default: () => '' },
});
</script>

<style scoped lang="scss">
.mobile-data-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}
</style>
