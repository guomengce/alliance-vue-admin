<template>
  <AdminPage title="订单列表" description="追踪与管理所有会员认购理财订单存量、交易校对凭证及上游佣金分拨记录">
    <template #actions>
      <el-button type="primary" :icon="Download" @click="handleExport">导出</el-button>
    </template>

    <div v-if="!selectedOrder">
      <el-card class="alliance-card admin-table-card" shadow="never">
        <ListHeader :filters="filters" @refresh="loadOrders" />

        <Table
          :loading="loading"
          :orders="filteredOrders"
          :format-number="formatNumber"
          :get-status-text="getStatusText"
          :get-status-tone="getStatusTone"
          @view="selectOrder"
          @confirm="confirmOrder"
          @reject="rejectOrder"
        />

        <MobileList
          :orders="filteredOrders"
          :format-money="formatMoney"
          :format-number="formatNumber"
          :get-status-text="getStatusText"
          :get-status-tone="getStatusTone"
          @view="selectOrder"
        />
      </el-card>
    </div>

    <DetailView
      v-else
      :order="selectedOrder"
      :format-number="formatNumber"
      :get-status-text="getStatusText"
      :get-status-tone="getStatusTone"
      @back="closeDetail"
      @confirm="confirmOrder(selectedOrder.id)"
      @reject="rejectOrder(selectedOrder.id)"
    />
  </AdminPage>
</template>

<script setup lang="ts">
import { Download } from '@element-plus/icons-vue';
import AdminPage from '../shared/AdminPage.vue';
import DetailView from './components/DetailView.vue';
import ListHeader from './components/ListHeader.vue';
import MobileList from './components/MobileList.vue';
import Table from './components/Table.vue';
import { useOrders } from './composables/useOrders';

const {
  loading,
  filters,
  filteredOrders,
  selectedOrder,
  formatMoney,
  formatNumber,
  getStatusText,
  getStatusTone,
  loadOrders,
  selectOrder,
  closeDetail,
  confirmOrder,
  rejectOrder,
} = useOrders();

function handleExport() {
  alert('导出功能开发中');
}
</script>
