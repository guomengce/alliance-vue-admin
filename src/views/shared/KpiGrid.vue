<template>
  <div class="admin-kpi-grid">
    <article v-for="item in items" :key="item.label" class="admin-kpi" :class="item.tone">
      <span>{{ item.label }}</span>
      <strong>{{ item.value }}</strong>
      <small>{{ item.sub }}</small>
    </article>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
});
</script>
