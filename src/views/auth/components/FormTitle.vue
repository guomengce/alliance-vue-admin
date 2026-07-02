<template>
  <div class="auth-form-title">
    <el-button :icon="ArrowLeft" text circle @click="$emit('back')" />
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
import { ArrowLeft } from '@element-plus/icons-vue';

defineEmits(['back']);
defineProps({ title: { type: String, required: true } });
</script>
