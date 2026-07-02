<template>
  <AdminPage title="结算管理" description="执行 D+1 日结、手动补结、溢出反馈审阅和结算批次追踪。">
    <template #actions>
      <el-button :icon="Refresh" @click="triggerDaily">触发日结</el-button>
      <el-button type="primary" :icon="Calendar" @click="manualVisible = true">手动结算</el-button>
    </template>

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>D+1 结算记录</template>
      <el-table v-loading="loading" class="desktop-table" :data="settlements">
        <el-table-column prop="id" label="结算批次" width="170" />
        <el-table-column prop="date" label="业务日期" width="120" />
        <el-table-column prop="orderCount" label="订单数" width="90" />
        <el-table-column prop="orderAmount" label="订单金额"><template #default="{ row }">{{ money(row.orderAmount) }}</template></el-table-column>
        <el-table-column prop="commissionAmount" label="佣金"><template #default="{ row }">{{ money(row.commissionAmount) }}</template></el-table-column>
        <el-table-column prop="queueUnlockAmount" label="解锁"><template #default="{ row }">{{ money(row.queueUnlockAmount) }}</template></el-table-column>
        <el-table-column label="状态" width="120"><template #default="{ row }"><el-tag :type="settlementType(row.status)">{{ settlementText(row.status) }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="100"><template #default="{ row }"><el-button link type="primary" @click="openDetail(row)">详情</el-button></template></el-table-column>
      </el-table>
      <DataCardList :rows="settlements" :fields="settlementFields" :title="(row) => row.id" :subtitle="(row) => row.date">
        <template #actions="{ row }"><el-button size="small" type="primary" @click="openDetail(row)">详情</el-button></template>
      </DataCardList>
    </el-card>

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>溢出反馈</template>
      <el-table :data="overflows" height="240">
        <el-table-column prop="id" label="编号" width="120" />
        <el-table-column prop="memberName" label="会员" />
        <el-table-column prop="overflowAmount" label="溢出金额"><template #default="{ row }">{{ money(row.overflowAmount) }}</template></el-table-column>
        <el-table-column prop="settlementStatus" label="处理状态"><template #default="{ row }"><el-tag type="warning">{{ row.settlementStatus }}</el-tag></template></el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="manualVisible" class="admin-dialog" title="手动结算" width="min(430px, 92vw)">
      <el-form :model="manualForm" label-width="90px">
        <el-form-item label="业务日期"><el-date-picker v-model="manualForm.date" value-format="YYYY-MM-DD" type="date" /></el-form-item>
        <el-form-item label="备注"><el-input v-model="manualForm.remark" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="manualVisible = false">取消</el-button><el-button type="primary" @click="triggerManual">执行</el-button></template>
    </el-dialog>

    <el-drawer v-model="drawerVisible" class="admin-drawer" title="结算详情" size="min(480px, 92vw)">
      <el-descriptions v-if="detail" :column="1" border>
        <el-descriptions-item label="批次">{{ detail.id }}</el-descriptions-item>
        <el-descriptions-item label="业务日期">{{ detail.date }}</el-descriptions-item>
        <el-descriptions-item label="订单金额">{{ money(detail.orderAmount) }}</el-descriptions-item>
        <el-descriptions-item label="佣金金额">{{ money(detail.commissionAmount) }}</el-descriptions-item>
        <el-descriptions-item label="溢出金额">{{ money(detail.overflowAmount) }}</el-descriptions-item>
        <el-descriptions-item label="运行时间">{{ detail.runAt || '未运行' }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </AdminPage>
</template>

<script setup>
import { Calendar, Refresh } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import {
  getAdminSettlement,
  getAdminSettlementOverflow,
  getAdminSettlements,
  triggerAdminDailySettlement,
  triggerAdminManualSettlement,
} from '../../api/services';
import AdminPage from '../shared/AdminPage.vue';
import DataCardList from '../shared/DataCardList.vue';

const loading = ref(false);
const manualVisible = ref(false);
const drawerVisible = ref(false);
const settlements = ref([]);
const overflows = ref([]);
const detail = ref(null);
const manualForm = reactive({ date: '2026-05-28', remark: '' });
const money = (value) => `${Number(value || 0).toLocaleString()} USDT`;
const settlementText = (status) => ({ completed: '已完成', pending: '待执行', running: '运行中', failed: '失败' }[status] || status);
const settlementType = (status) => ({ completed: 'success', pending: 'info', running: 'warning', failed: 'danger' }[status] || 'info');

const settlementFields = [
  { label: '订单数', prop: 'orderCount' },
  { label: '订单金额', format: (row) => money(row.orderAmount) },
  { label: '佣金', format: (row) => money(row.commissionAmount) },
  { label: '状态', format: (row) => settlementText(row.status) },
];

async function loadSettlements() {
  loading.value = true;
  try {
    const [settlementRes, overflowRes] = await Promise.all([
      getAdminSettlements({ pageSize: 100 }),
      getAdminSettlementOverflow({ pageSize: 100 }),
    ]);
    settlements.value = settlementRes.data.items;
    overflows.value = overflowRes.data.items;
  } finally {
    loading.value = false;
  }
}

async function triggerDaily() {
  await triggerAdminDailySettlement({ date: '2026-05-28' });
  ElMessage.success('日结任务已触发');
  loadSettlements();
}

async function triggerManual() {
  await triggerAdminManualSettlement({ ...manualForm });
  ElMessage.success('手动结算已触发');
  manualVisible.value = false;
  loadSettlements();
}

async function openDetail(row) {
  drawerVisible.value = true;
  const res = await getAdminSettlement(row.id);
  detail.value = res.data;
}

onMounted(loadSettlements);
</script>
