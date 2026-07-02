<template>
  <AdminPage title="数据报表" description="汇总团队、佣金和运营报表，支持按日期生成导出任务。">
    <template #actions><el-button type="primary" :icon="Download" @click="exportReport">导出当前报表</el-button></template>
    <el-card class="alliance-card admin-table-card" shadow="never">
      <div class="admin-toolbar">
        <el-form :model="filters" inline>
          <el-form-item><el-date-picker v-model="filters.date" value-format="YYYY-MM-DD" type="date" /></el-form-item>
          <el-form-item><el-select v-model="filters.format" style="width: 120px"><el-option label="XLSX" value="xlsx" /><el-option label="CSV" value="csv" /></el-select></el-form-item>
        </el-form>
        <el-button :icon="Refresh" @click="loadReports">刷新</el-button>
      </div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="团队报表" name="team">
          <el-table v-loading="loading" :data="team" height="400">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="rootMemberId" label="根会员" />
            <el-table-column prop="levels" label="层级数" />
            <el-table-column prop="totalMembers" label="总人数" />
            <el-table-column prop="activeMembers" label="活跃人数" />
            <el-table-column prop="orderAmount" label="团队订单"><template #default="{ row }">{{ money(row.orderAmount) }}</template></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="佣金报表" name="commission">
          <el-table v-loading="loading" :data="commission" height="400">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="level" label="层级"><template #default="{ row }">L{{ row.level }}</template></el-table-column>
            <el-table-column prop="amount" label="佣金金额"><template #default="{ row }">{{ money(row.amount) }}</template></el-table-column>
            <el-table-column prop="count" label="笔数" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="运营报表" name="operations">
          <el-table v-loading="loading" :data="operations" height="400">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="deposits" label="充值"><template #default="{ row }">{{ money(row.deposits) }}</template></el-table-column>
            <el-table-column prop="withdrawals" label="提现"><template #default="{ row }">{{ money(row.withdrawals) }}</template></el-table-column>
            <el-table-column prop="orderAmount" label="订单额"><template #default="{ row }">{{ money(row.orderAmount) }}</template></el-table-column>
            <el-table-column prop="settlementStatus" label="结算状态"><template #default="{ row }"><el-tag>{{ row.settlementStatus }}</el-tag></template></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </AdminPage>
</template>

<script setup lang="ts">
import { Download, Refresh } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { exportAdminReport, getAdminCommissionReport, getAdminOperationsReport, getAdminTeamReport } from '../../api/services';
import AdminPage from '../shared/AdminPage.vue';

const loading = ref(false);
const activeTab = ref('team');
const filters = reactive({ date: '2026-05-28', format: 'xlsx' });
const team = ref([]);
const commission = ref([]);
const operations = ref([]);
const money = (value) => `${Number(value || 0).toLocaleString()} USDT`;

async function loadReports() {
  loading.value = true;
  try {
    const [teamRes, commissionRes, operationsRes] = await Promise.all([
      getAdminTeamReport({ pageSize: 100, date: filters.date }),
      getAdminCommissionReport({ pageSize: 100, date: filters.date }),
      getAdminOperationsReport({ pageSize: 100, date: filters.date }),
    ]);
    team.value = teamRes.data.items;
    commission.value = commissionRes.data.items;
    operations.value = operationsRes.data.items;
  } finally {
    loading.value = false;
  }
}

async function exportReport() {
  const res = await exportAdminReport({ reportType: activeTab.value, format: filters.format, date: filters.date });
  ElMessage.success(`导出已生成：${res.data.exportId}`);
}

onMounted(loadReports);
</script>
