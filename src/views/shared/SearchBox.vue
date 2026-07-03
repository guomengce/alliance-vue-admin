<template>
  <el-input
    :model-value="modelValue"
    :placeholder="placeholder"
    :prefix-icon="Search"
    clearable
    class="search-box"
    @update:model-value="$emit('update:modelValue', $event)"
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
