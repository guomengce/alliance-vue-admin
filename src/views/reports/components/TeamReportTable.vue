<template>
  <el-table v-loading="loading" :data="rows" height="400">
    <el-table-column prop="date" label="日期" />
    <el-table-column prop="rootMemberId" label="根会员" />
    <el-table-column prop="levels" label="层级数" />
    <el-table-column prop="totalMembers" label="总人数" />
    <el-table-column prop="activeMembers" label="活跃人数" />
    <el-table-column prop="orderAmount" label="团队订单">
      <template #default="{ row }">{{ money(row.orderAmount) }}</template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { TeamReportRow } from '../composables/useReports';

defineProps<{
  loading: boolean;
  rows: TeamReportRow[];
  money: (value: unknown) => string;
}>();
</script>
