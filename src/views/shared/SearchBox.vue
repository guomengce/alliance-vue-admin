<template>
  <el-input
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :placeholder="placeholder"
    :prefix-icon="Search"
    clearable
    class="search-box"
  />
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';

defineProps({
  modelValue: { type: String, required: true },
  placeholder: { type: String, default: '搜索...' },
});

defineEmits(['update:modelValue']);
</script>