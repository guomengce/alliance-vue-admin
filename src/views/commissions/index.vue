<template>
  <AdminPage title="佣金管理" description="监控 L1-L5 派发、佣金池额度、溢出转移与手动结算任务。">
    <template #actions>
      <el-button type="primary" :icon="Coin" @click="manualSettle">手动结算</el-button>
    </template>
    <KpiGrid :items="kpis" />

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>佣金池监控</template>
      <el-table v-loading="loading" class="desktop-table" :data="pools">
        <el-table-column prop="memberId" label="会员ID" width="120" />
        <el-table-column prop="memberName" label="会员" />
        <el-table-column prop="capacity" label="池额度"><template #default="{ row }">{{ money(row.capacity) }}</template></el-table-column>
        <el-table-column prop="used" label="已用"><template #default="{ row }">{{ money(row.used) }}</template></el-table-column>
        <el-table-column label="使用进度" min-width="180">
          <template #default="{ row }"><el-progress :percentage="Math.round((row.used / row.capacity) * 100)" /></template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="{ row }"><el-tag :type="row.replenishmentRequired ? 'danger' : 'success'">{{ row.replenishmentRequired ? '需补充' : '正常' }}</el-tag></template>
        </el-table-column>
      </el-table>
      <DataCardList :rows="pools" :fields="poolFields" :title="(row) => row.memberName" :subtitle="(row) => row.memberId" />
    </el-card>

    <div class="commission-grid">
      <el-card class="alliance-card admin-table-card" shadow="never">
        <template #header>派发记录</template>
        <el-table :data="records" height="300">
          <el-table-column prop="id" label="编号" width="120" />
          <el-table-column prop="memberName" label="收款人" />
          <el-table-column prop="level" label="层级" width="80"><template #default="{ row }">L{{ row.level }}</template></el-table-column>
          <el-table-column prop="amount" label="金额"><template #default="{ row }">{{ money(row.amount) }}</template></el-table-column>
          <el-table-column label="状态"><template #default="{ row }"><el-tag :type="row.status === 'settled' ? 'success' : 'warning'">{{ row.status === 'settled' ? '已结算' : '待结算' }}</el-tag></template></el-table-column>
        </el-table>
      </el-card>
      <el-card class="alliance-card admin-table-card" shadow="never">
        <template #header>溢出记录</template>
        <el-table :data="overflows" height="300">
          <el-table-column prop="id" label="编号" width="120" />
          <el-table-column prop="memberName" label="会员" />
          <el-table-column prop="overflowAmount" label="溢出"><template #default="{ row }">{{ money(row.overflowAmount) }}</template></el-table-column>
          <el-table-column prop="reason" label="原因" min-width="160" />
        </el-table>
      </el-card>
    </div>
  </AdminPage>
</template>

<script setup>
import { Coin } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref } from 'vue';
import {
  getAdminCommissionDistribution,
  getAdminCommissionOverflow,
  getAdminCommissionPool,
  getAdminCommissionStatistics,
  settleAdminCommissions,
} from '../../api/services';
import AdminPage from '../shared/AdminPage.vue';
import DataCardList from '../shared/DataCardList.vue';
import KpiGrid from '../shared/KpiGrid.vue';

const loading = ref(false);
const stats = ref({});
const pools = ref([]);
const records = ref([]);
const overflows = ref([]);
const money = (value) => `${Number(value || 0).toLocaleString()} USDT`;

const kpis = computed(() => [
  { label: '待结算佣金', value: money(stats.value.pendingAmount), sub: '等待 D+1 任务', tone: 'is-amber' },
  { label: '已结算佣金', value: money(stats.value.settledAmount), sub: '历史累计', tone: 'is-green' },
  { label: '溢出金额', value: money(stats.value.overflowAmount), sub: '进入兜底池', tone: 'is-danger' },
]);

const poolFields = [
  { label: '池额度', format: (row) => money(row.capacity) },
  { label: '已用', format: (row) => money(row.used) },
  { label: '剩余', format: (row) => money(row.remaining) },
  { label: '状态', format: (row) => (row.replenishmentRequired ? '需补充' : '正常') },
];

async function loadCommissions() {
  loading.value = true;
  try {
    const [poolRes, recordRes, overflowRes, statsRes] = await Promise.all([
      getAdminCommissionPool({ pageSize: 100 }),
      getAdminCommissionDistribution({ pageSize: 100 }),
      getAdminCommissionOverflow({ pageSize: 100 }),
      getAdminCommissionStatistics(),
    ]);
    pools.value = poolRes.data.items;
    records.value = recordRes.data.items;
    overflows.value = overflowRes.data.items;
    stats.value = statsRes.data;
  } finally {
    loading.value = false;
  }
}

async function manualSettle() {
  await settleAdminCommissions({ operator: 'admin' });
  ElMessage.success('佣金结算任务已执行');
  loadCommissions();
}

onMounted(loadCommissions);
</script>

<style scoped lang="scss">
.commission-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 900px) {
  .commission-grid {
    grid-template-columns: 1fr;
  }
}
</style>
