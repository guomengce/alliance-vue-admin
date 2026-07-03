<template>
  <el-table :data="records" height="360">
    <el-table-column prop="id" label="流水号" width="130" />
    <el-table-column prop="memberName" label="会员" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="asset" label="资产" width="90" />
    <el-table-column prop="amount" label="金额">
      <template #default="{ row }">{{ money(row.amount) }}</template>
    </el-table-column>
    <el-table-column prop="fee" label="手续费">
      <template #default="{ row }">{{ money(row.fee) }}</template>
    </el-table-column>
    <el-table-column label="状态">
      <template #default="{ row }">
        <el-tag :type="row.status === 'confirmed' || row.status === 'settled' ? 'success' : 'warning'">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { FinanceRecord } from '../composables/useFinance';

defineProps<{
  records: FinanceRecord[];
  money: (value: unknown) => string;
}>();
</script>
