<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <div>
        <p>{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
        <span>{{ description }}</span>
      </div>
      <div v-if="$slots.actions" class="admin-page__actions">
        <slot name="actions" />
      </div>
    </header>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps({
  eyebrow: { type: String, default: 'Admin Console' },
  title: { type: String, required: true },
  description: { type: String, required: true },
});
</script>

<style scoped lang="scss">
.admin-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
