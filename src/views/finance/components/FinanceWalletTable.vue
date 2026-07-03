<template>
  <div class="finance-table-section">
    <el-table v-loading="loading" class="desktop-table" :data="wallets" height="360">
      <el-table-column prop="memberId" label="会员 ID" width="120" />
      <el-table-column prop="memberName" label="会员" />
      <el-table-column prop="usdtBalance" label="USDT">
        <template #default="{ row }">{{ money(row.usdtBalance) }}</template>
      </el-table-column>
      <el-table-column prop="trooBalance" label="TROO">
        <template #default="{ row }">{{ number(row.trooBalance) }}</template>
      </el-table-column>
      <el-table-column prop="queueBalance" label="排队余额">
        <template #default="{ row }">{{ money(row.queueBalance) }}</template>
      </el-table-column>
    </el-table>

    <DataCardList
      :rows="wallets"
      :fields="walletFields"
      :title="(row) => row.memberName"
      :subtitle="(row) => row.memberId"
    />
  </div>
</template>

<script setup lang="ts">
import DataCardList from '../../shared/DataCardList.vue';
import type { WalletRow } from '../composables/useFinance';

defineProps<{
  loading: boolean;
  wallets: WalletRow[];
  walletFields: Array<{ label: string; format: (row: WalletRow) => string }>;
  money: (value: unknown) => string;
  number: (value: unknown) => string;
}>();
</script>
