<template>
  <AdminPage
    title="佣金明细名册"
    description="浏览、检索并管理会员五代分销佣金明细，包括正常划账、额度池阻塞与系统拦截回笼记录。"
  >
    <section class="commissions-view">
      <SummaryGrid :kpis="kpis" />

      <el-card class="alliance-card commissions-list-card" shadow="never">
        <div class="commissions-list-card__header">
          <div>
            <h3>
              <Coin />
              <span>佣金明细名册</span>
            </h3>
            <p>浏览与检索会员五代分销分成明细，包括正常应答与受阻拦截回笼公积对账条目。</p>
          </div>
          <el-button type="primary" :icon="Coin" :loading="loading" @click="manualSettle">手动结算</el-button>
        </div>

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
    </section>

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
