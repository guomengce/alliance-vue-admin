<template>
  <el-dialog
    :model-value="modelValue"
    class="admin-dialog audit-overlay"
    :title="title"
    width="min(640px, 92vw)"
    :close-on-click-modal="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="audit-overlay__header">
      <h3>{{ title }}</h3>
      <span v-if="subtitle" class="audit-overlay__subtitle">{{ subtitle }}</span>
    </div>
    <div class="audit-overlay__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="audit-overlay__footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
});

defineEmits(['update:modelValue']);
</script>