<template>
  <el-table v-loading="loading" class="desktop-table settlement-table" :data="settlements" height="520">
    <el-table-column prop="id" label="结算批次" width="170" />
    <el-table-column prop="date" label="业务日期" width="120" />
    <el-table-column prop="orderCount" label="订单�? width="90" />
    <el-table-column prop="orderAmount" label="订单金额" width="140">
      <template #default="{ row }">USDT {{ formatNumber(row.orderAmount) }}</template>
    </el-table-column>
    <el-table-column prop="commissionAmount" label="佣金" width="120">
      <template #default="{ row }">USDT {{ formatNumber(row.commissionAmount) }}</template>
    </el-table-column>
    <el-table-column prop="queueUnlockAmount" label="解锁" width="120">
      <template #default="{ row }">USDT {{ formatNumber(row.queueUnlockAmount) }}</template>
    </el-table-column>
    <el-table-column label="状�? width="120">
      <template #default="{ row }">
        <StatusPill :text="getStatusText(row.status)" :tone="getStatusTone(row.status)" />
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template #default="{ row }">
        <el-button link type="primary" @click="$emit('view', row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';

defineProps({
  loading: { type: Boolean, default: false },
  settlements: { type: Array, default: () => [] },
  formatNumber: { type: Function, required: true },
  getStatusText: { type: Function, required: true },
  getStatusTone: { type: Function, required: true },
});

defineEmits(['view']);
</script>