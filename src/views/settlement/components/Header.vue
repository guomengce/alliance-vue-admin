<template>
  <div class="settlement-header">
    <el-button :icon="Back" @click="$emit('back')">返回结算列表</el-button>
    <div class="settlement-header__title">
      <h2>结算批次审计详情</h2>
      <span class="settlement-header__date">业务日期: {{ settlement.date }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Back } from '@element-plus/icons-vue';

defineProps({
  settlement: { type: Object, required: true },
});

defineEmits(['back']);
</script>
