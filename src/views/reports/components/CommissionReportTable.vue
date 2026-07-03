<template>
  <el-table v-loading="loading" :data="rows" height="400">
    <el-table-column prop="date" label="日期" />
    <el-table-column prop="level" label="层级">
      <template #default="{ row }">L{{ row.level }}</template>
    </el-table-column>
    <el-table-column prop="amount" label="佣金金额">
      <template #default="{ row }">{{ money(row.amount) }}</template>
    </el-table-column>
    <el-table-column prop="count" label="笔数" />
  </el-table>
</template>

<script setup lang="ts">
import type { CommissionReportRow } from '../composables/useReports';

defineProps<{
  loading: boolean;
  rows: CommissionReportRow[];
  money: (value: unknown) => string;
}>();
</script>
