<template>
  <AdminPage title="排队管理" description="查看锁仓账户、解锁进度、下次释放预估和队列校准状态。">
    <KpiGrid :items="kpis" />

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>排队账户</template>
      <el-table v-loading="loading" class="desktop-table" :data="accounts">
        <el-table-column prop="id" label="账户编号" width="140" />
        <el-table-column prop="memberName" label="会员" />
        <el-table-column prop="lockedAmount" label="锁定金额"><template #default="{ row }">{{ money(row.lockedAmount) }}</template></el-table-column>
        <el-table-column prop="unlockedAmount" label="已解锁"><template #default="{ row }">{{ money(row.unlockedAmount) }}</template></el-table-column>
        <el-table-column label="解锁进度" min-width="220"><template #default="{ row }"><el-progress :percentage="Math.round(row.unlockProgress * 100)" /></template></el-table-column>
        <el-table-column prop="nextUnlockEstimate" label="下次预估"><template #default="{ row }">{{ money(row.nextUnlockEstimate) }}</template></el-table-column>
        <el-table-column label="操作" width="100"><template #default="{ row }"><el-button link type="primary" @click="openDetail(row)">详情</el-button></template></el-table-column>
      </el-table>
      <DataCardList :rows="accounts" :fields="accountFields" :title="(row) => row.memberName" :subtitle="(row) => row.id">
        <template #actions="{ row }"><el-button size="small" type="primary" @click="openDetail(row)">详情</el-button></template>
      </DataCardList>
    </el-card>

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>解锁记录</template>
      <el-table :data="unlockRecords" height="260">
        <el-table-column prop="id" label="记录号" width="130" />
        <el-table-column prop="memberName" label="会员" />
        <el-table-column prop="sourceOrderId" label="来源订单" />
        <el-table-column prop="amount" label="金额"><template #default="{ row }">{{ money(row.amount) }}</template></el-table-column>
        <el-table-column label="状态"><template #default="{ row }"><el-tag :type="row.status === 'settled' ? 'success' : 'warning'">{{ row.status === 'settled' ? '已解锁' : '待解锁' }}</el-tag></template></el-table-column>
      </el-table>
    </el-card>

    <el-drawer v-model="drawerVisible" class="admin-drawer" title="排队账户详情" size="min(480px, 92vw)">
      <el-descriptions v-if="detail" :column="1" border>
        <el-descriptions-item label="账户编号">{{ detail.id }}</el-descriptions-item>
        <el-descriptions-item label="会员">{{ detail.memberName }}</el-descriptions-item>
        <el-descriptions-item label="锁定金额">{{ money(detail.lockedAmount) }}</el-descriptions-item>
        <el-descriptions-item label="已解锁">{{ money(detail.unlockedAmount) }}</el-descriptions-item>
        <el-descriptions-item label="下次预估">{{ money(detail.nextUnlockEstimate) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </AdminPage>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { getAdminQueueAccount, getAdminQueueAccounts, getAdminQueueLockedAmount, getAdminQueueUnlockRecords } from '../../api/services';
import AdminPage from '../shared/AdminPage.vue';
import DataCardList from '../shared/DataCardList.vue';
import KpiGrid from '../shared/KpiGrid.vue';

const loading = ref(false);
const drawerVisible = ref(false);
const accounts = ref([]);
const unlockRecords = ref([]);
const locked = ref({});
const detail = ref(null);
const money = (value) => `${Number(value || 0).toLocaleString()} USDT`;
const averageProgress = computed(() => {
  if (!accounts.value.length) return 0;
  return Math.round((accounts.value.reduce((sum, item) => sum + item.unlockProgress, 0) / accounts.value.length) * 100);
});

const kpis = computed(() => [
  { label: '锁仓总额', value: money(locked.value.lockedAmount), sub: `${locked.value.accountCount || 0} 个账户`, tone: 'is-amber' },
  { label: '平均解锁进度', value: `${averageProgress.value}%`, sub: '按账户进度估算', tone: 'is-purple' },
  { label: '待解锁记录', value: unlockRecords.value.filter((item) => item.status !== 'settled').length, sub: '需要结算确认' },
]);

const accountFields = [
  { label: '锁定', format: (row) => money(row.lockedAmount) },
  { label: '已解锁', format: (row) => money(row.unlockedAmount) },
  { label: '进度', format: (row) => `${Math.round(row.unlockProgress * 100)}%` },
  { label: '下次预估', format: (row) => money(row.nextUnlockEstimate) },
];

async function loadQueue() {
  loading.value = true;
  try {
    const [accountsRes, lockedRes, recordsRes] = await Promise.all([
      getAdminQueueAccounts({ pageSize: 100 }),
      getAdminQueueLockedAmount(),
      getAdminQueueUnlockRecords({ pageSize: 100 }),
    ]);
    accounts.value = accountsRes.data.items;
    locked.value = lockedRes.data;
    unlockRecords.value = recordsRes.data.items;
  } finally {
    loading.value = false;
  }
}

async function openDetail(row) {
  drawerVisible.value = true;
  const res = await getAdminQueueAccount(row.id);
  detail.value = res.data;
}

onMounted(loadQueue);
</script>
