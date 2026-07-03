<template>
  <AdminPage
    title="数据报表"
    description="汇总团队、佣金和运营报表，支持按日期生成导出任务"
  >
    <template #actions>
      <el-button type="primary" :icon="Download" @click="exportReport">导出当前报表</el-button>
    </template>

    <section class="reports-view">
      <el-card class="alliance-card admin-table-card reports-panel" shadow="never">
        <ReportsToolbar :filters="filters" @refresh="loadReports" />

        <el-tabs v-model="activeTab">
          <el-tab-pane label="团队报表" name="team">
            <TeamReportTable :loading="loading" :rows="team" :money="money" />
          </el-tab-pane>
          <el-tab-pane label="佣金报表" name="commission">
            <CommissionReportTable :loading="loading" :rows="commission" :money="money" />
          </el-tab-pane>
          <el-tab-pane label="运营报表" name="operations">
            <OperationsReportTable :loading="loading" :rows="operations" :money="money" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </section>
  </AdminPage>
</template>

<script setup lang="ts">
import { Download } from '@element-plus/icons-vue';
import AdminPage from '../shared/AdminPage.vue';
import CommissionReportTable from './components/CommissionReportTable.vue';
import OperationsReportTable from './components/OperationsReportTable.vue';
import ReportsToolbar from './components/ReportsToolbar.vue';
import TeamReportTable from './components/TeamReportTable.vue';
import { useReports } from './composables/useReports';

const {
  loading,
  activeTab,
  filters,
  team,
  commission,
  operations,
  money,
  loadReports,
  exportReport,
} = useReports();
</script>
