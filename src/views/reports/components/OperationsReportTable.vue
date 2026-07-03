<template>
  <el-table v-loading="loading" :data="rows" height="400">
    <el-table-column prop="date" label="日期" />
    <el-table-column prop="deposits" label="充值">
      <template #default="{ row }">{{ money(row.deposits) }}</template>
    </el-table-column>
    <el-table-column prop="withdrawals" label="提现">
      <template #default="{ row }">{{ money(row.withdrawals) }}</template>
    </el-table-column>
    <el-table-column prop="orderAmount" label="订单额">
      <template #default="{ row }">{{ money(row.orderAmount) }}</template>
    </el-table-column>
    <el-table-column prop="settlementStatus" label="结算状态">
      <template #default="{ row }"><el-tag>{{ row.settlementStatus }}</el-tag></template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { OperationsReportRow } from '../composables/useReports';

defineProps<{
  loading: boolean;
  rows: OperationsReportRow[];
  money: (value: unknown) => string;
}>();
</script>
