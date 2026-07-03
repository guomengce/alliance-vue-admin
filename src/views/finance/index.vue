<template>
  <AdminPage
    title="财务管理"
    description="集中查看会员钱包、平台储备、TROO 资产与财务流水，并支持人工资金调整"
  >
    <template #actions>
      <el-button type="primary" :icon="Money" @click="adjustVisible = true">资金调整</el-button>
    </template>

    <section class="finance-view">
      <KpiGrid :items="kpis" />

      <el-card class="alliance-card admin-table-card finance-panel" shadow="never">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="会员钱包" name="wallets">
            <FinanceWalletTable
              :loading="loading"
              :wallets="wallets"
              :wallet-fields="walletFields"
              :money="money"
              :number="number"
            />
          </el-tab-pane>

          <el-tab-pane label="财务流水" name="records">
            <FinanceRecordTable :records="records" :money="money" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </section>

    <FinanceAdjustDialog
      v-model="adjustVisible"
      :form="adjustForm"
      @submit="submitAdjustment"
    />
  </AdminPage>
</template>

<script setup lang="ts">
import { Money } from '@element-plus/icons-vue';
import AdminPage from '../shared/AdminPage.vue';
import KpiGrid from '../shared/KpiGrid.vue';
import FinanceAdjustDialog from './components/FinanceAdjustDialog.vue';
import FinanceRecordTable from './components/FinanceRecordTable.vue';
import FinanceWalletTable from './components/FinanceWalletTable.vue';
import { useFinance } from './composables/useFinance';

const {
  loading,
  activeTab,
  adjustVisible,
  wallets,
  records,
  adjustForm,
  kpis,
  walletFields,
  money,
  number,
  submitAdjustment,
} = useFinance();
</script>
