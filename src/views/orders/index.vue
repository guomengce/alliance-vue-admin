<template>
  <AdminPage title="订单管理" description="追踪认购订单、支付状态、TROO 发放、排队锁仓和佣金池额度。">
    <KpiGrid :items="kpis" />

    <el-card class="alliance-card admin-table-card" shadow="never">
      <div class="admin-toolbar">
        <el-form :model="filters" inline>
          <el-form-item><el-input v-model="filters.keyword" :prefix-icon="Search" clearable placeholder="订单号 / 会员" /></el-form-item>
          <el-form-item>
            <el-select v-model="filters.status" clearable placeholder="状态" style="width: 130px">
              <el-option label="已支付" value="paid" />
              <el-option label="超时" value="timeout" />
              <el-option label="失败" value="failed" />
              <el-option label="退款" value="refunded" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" :icon="Refresh" @click="loadOrders">刷新订单</el-button>
      </div>

      <el-table v-loading="loading" class="desktop-table" :data="filteredOrders" height="520">
        <el-table-column prop="id" label="订单号" width="130" />
        <el-table-column prop="memberName" label="会员" width="130" />
        <el-table-column prop="packageName" label="套餐" width="120" />
        <el-table-column prop="amount" label="金额" width="130"><template #default="{ row }">{{ money(row.amount) }}</template></el-table-column>
        <el-table-column label="资金流" min-width="260">
          <template #default="{ row }">
            <span class="flow-line">TROO {{ number(row.instantTroo) }} / 锁仓 {{ money(row.queueLocked) }} / 池 {{ money(row.commissionCapacity) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="110">
          <template #default="{ row }"><el-tag :type="statusType(row.status)">{{ statusText(row.status) }}</el-tag></template>
        </el-table-column>
        <el-table-column label="异常" width="90">
          <template #default="{ row }"><el-tag v-if="row.abnormal" type="danger">异常</el-tag><span v-else>-</span></template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }"><el-button link type="primary" @click="openDetail(row)">详情</el-button></template>
        </el-table-column>
      </el-table>

      <DataCardList :rows="filteredOrders" :fields="mobileFields" :title="(row) => row.id" :subtitle="(row) => `${row.memberName} · ${row.packageName}`">
        <template #actions="{ row }">
          <el-button size="small" type="primary" @click="openDetail(row)">详情</el-button>
        </template>
      </DataCardList>
    </el-card>

    <el-drawer v-model="drawerVisible" class="admin-drawer" title="订单详情" size="min(560px, 92vw)">
      <el-descriptions v-if="orderDetail" :column="2" border>
        <el-descriptions-item label="订单号">{{ orderDetail.id }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ statusText(orderDetail.status) }}</el-descriptions-item>
        <el-descriptions-item label="会员">{{ orderDetail.memberName }}</el-descriptions-item>
        <el-descriptions-item label="套餐">{{ orderDetail.packageName }}</el-descriptions-item>
        <el-descriptions-item label="支付金额">{{ money(orderDetail.amount) }}</el-descriptions-item>
        <el-descriptions-item label="支付时间">{{ orderDetail.paidAt || '未支付' }}</el-descriptions-item>
        <el-descriptions-item label="即时 TROO">{{ number(orderDetail.instantTroo) }}</el-descriptions-item>
        <el-descriptions-item label="排队锁仓">{{ money(orderDetail.queueLocked) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </AdminPage>
</template>

<script setup>
import { Refresh, Search } from '@element-plus/icons-vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { getAdminOrder, getAdminOrders, getAdminOrderStatistics } from '../../api/services';
import AdminPage from '../shared/AdminPage.vue';
import DataCardList from '../shared/DataCardList.vue';
import KpiGrid from '../shared/KpiGrid.vue';

const loading = ref(false);
const drawerVisible = ref(false);
const orders = ref([]);
const stats = ref({});
const orderDetail = ref(null);
const filters = reactive({ keyword: '', status: '' });

const money = (value) => `${Number(value || 0).toLocaleString()} USDT`;
const number = (value) => Number(value || 0).toLocaleString();
const statusText = (status) => ({ paid: '已支付', timeout: '超时', failed: '失败', refunded: '已退款' }[status] || status);
const statusType = (status) => ({ paid: 'success', timeout: 'warning', failed: 'danger', refunded: 'info' }[status] || 'info');

const filteredOrders = computed(() => orders.value.filter((item) => {
  const keyword = filters.keyword.toLowerCase();
  const keywordMatch = !keyword || [item.id, item.memberName].some((field) => String(field).toLowerCase().includes(keyword));
  return keywordMatch && (!filters.status || item.status === filters.status);
}));

const kpis = computed(() => [
  { label: '今日订单', value: stats.value.today?.count || 0, sub: money(stats.value.today?.amount), tone: 'is-purple' },
  { label: '本周订单', value: stats.value.week?.count || 0, sub: money(stats.value.week?.amount), tone: 'is-green' },
  { label: '本月订单', value: stats.value.month?.count || 0, sub: money(stats.value.month?.amount) },
  { label: '异常订单', value: stats.value.abnormalCount || 0, sub: '需运营复核', tone: 'is-danger' },
]);

const mobileFields = [
  { label: '金额', format: (row) => money(row.amount) },
  { label: 'TROO', format: (row) => number(row.instantTroo) },
  { label: '锁仓', format: (row) => money(row.queueLocked) },
  { label: '状态', format: (row) => statusText(row.status) },
];

async function loadOrders() {
  loading.value = true;
  try {
    const [ordersRes, statsRes] = await Promise.all([getAdminOrders({ pageSize: 100 }), getAdminOrderStatistics()]);
    orders.value = ordersRes.data.items;
    stats.value = statsRes.data;
  } finally {
    loading.value = false;
  }
}

async function openDetail(row) {
  drawerVisible.value = true;
  const res = await getAdminOrder(row.id);
  orderDetail.value = res.data;
}

onMounted(loadOrders);
</script>

<style scoped lang="scss">
.flow-line {
  color: var(--alliance-muted);
  white-space: nowrap;
}
</style>
