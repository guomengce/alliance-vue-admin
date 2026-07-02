<template>
  <div class="mobile-data-card">
    <div class="mobile-data-card__header">
      <h3 class="mobile-data-card__title">{{ title }}</h3>
      <span class="mobile-data-card__subtitle">{{ subtitle }}</span>
      <StatusPill v-if="statusText" :text="statusText" :tone="statusTone" />
    </div>
    <div class="mobile-data-card__fields">
      <div v-for="(field, index) in fields" :key="index" class="mobile-data-card__field">
        <span class="mobile-data-card__field-label">{{ field.label }}</span>
        <span class="mobile-data-card__field-value" :class="`mobile-data-card__field-value--${field.tone || ''}`">
          {{ field.value }}
        </span>
      </div>
    </div>
    <div v-if="$slots.actions" class="mobile-data-card__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusPill from './StatusPill.vue';

interface Field {
  label: string;
  value?: string;
  tone?: string;
}
defineProps<{
  title: string;
  subtitle?: string;
  statusText?: string;
  statusTone?: string;
  fields?: Field[];
}>();
</script>