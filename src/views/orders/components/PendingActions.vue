<template>
  <div class="order-pending-actions">
    <div class="order-pending-actions__icon">
      <WarningFilled />
    </div>
    <div class="order-pending-actions__content">
      <h4>待审核入账</h4>
      <p>此订单尚未确认到账，请核实资金流水后进行操作。</p>
    </div>
    <div class="order-pending-actions__buttons">
      <el-button type="success" @click="$emit('confirm')">确认到账</el-button>
      <el-button type="danger" @click="$emit('reject')">驳回订单</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue';

defineEmits(['confirm', 'reject']);
</script>
