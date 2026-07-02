<template>
  <AdminPage title="佣金管理" description="监控与核实会员层级分销佣金明细，包括正常派发与系统拦截回笼两类记录">
    <template #actions>
      <el-button type="primary" :icon="Coin" @click="manualSettle">手动结算</el-button>
    </template>

    <SummaryGrid :kpis="kpis" />

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>佣金列表</template>
      <FilterTabs :filters="filters" />

      <Table
        :loading="loading"
        :commissions="filteredCommissions"
        :format-number="formatNumber"
        :get-status-text="getStatusText"
        :get-status-tone="getStatusTone"
        :get-status-pulse="getStatusPulse"
        @view="selectCommission"
      />

      <MobileList
        :commissions="filteredCommissions"
        :format-number="formatNumber"
        :get-status-text="getStatusText"
        :get-status-tone="getStatusTone"
        @view="selectCommission"
      />
    </el-card>

    <DetailOverlay
      :visible="!!selectedCommission"
      :commission="selectedCommission || {}"
      :format-number="formatNumber"
      :get-status-text="getStatusText"
      :get-status-tone="getStatusTone"
      :get-status-pulse="getStatusPulse"
      @close="closeDetail"
      @update:visible="(val) => { if (!val) closeDetail(); }"
    />
  </AdminPage>
</template>

<script setup lang="ts">
import { Coin } from '@element-plus/icons-vue';
import AdminPage from '../shared/AdminPage.vue';
import DetailOverlay from './components/DetailOverlay.vue';
import FilterTabs from './components/FilterTabs.vue';
import MobileList from './components/MobileList.vue';
import SummaryGrid from './components/SummaryGrid.vue';
import Table from './components/Table.vue';
import { useCommissions } from './composables/useCommissions';

const {
  loading,
  filters,
  filteredCommissions,
  selectedCommission,
  kpis,
  formatNumber,
  getStatusText,
  getStatusTone,
  getStatusPulse,
  selectCommission,
  closeDetail,
  manualSettle,
} = useCommissions();
</script>