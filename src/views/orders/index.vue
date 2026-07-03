<template>
  <AdminPage title="理财认购订单名册" description="精算追踪会员理财认购、链上支付状态、USDT 资产交割存根及上游同盟佣金穿透分拨数据。">
    <section v-if="!selectedOrder" class="orders-list-view">
      <el-card class="alliance-card admin-table-card orders-list-card" shadow="never">
        <ListHeader :filters="filters" @refresh="loadOrders" @export="handleExport" />

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
    </section>

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
