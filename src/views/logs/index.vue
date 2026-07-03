<template>
  <AdminPage
    title="日志管理"
    description="审计后台敏感操作、登录事件、资金调整和结算任务执行记录"
  >
    <section class="logs-view">
      <KpiGrid :items="kpis" />

      <el-card class="alliance-card admin-table-card logs-panel" shadow="never">
        <LogsToolbar :filters="filters" />
        <LogsTable :logs="filteredLogs" :fields="mobileFields" :level-type="levelType" />
      </el-card>
    </section>
  </AdminPage>
</template>

<script setup lang="ts">
import AdminPage from '../shared/AdminPage.vue';
import KpiGrid from '../shared/KpiGrid.vue';
import LogsTable from './components/LogsTable.vue';
import LogsToolbar from './components/LogsToolbar.vue';
import { useLogs } from './composables/useLogs';

const {
  filters,
  filteredLogs,
  kpis,
  mobileFields,
  levelType,
} = useLogs();
</script>
