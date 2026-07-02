<template>
  <AdminPage title="日志管理" description="审计后台敏感操作、登录事件、资金调整和结算任务执行记录">
    <KpiGrid :items="kpis" />
    <el-card class="alliance-card admin-table-card" shadow="never">
      <div class="admin-toolbar">
        <el-form :model="filters" inline>
          <el-form-item><el-input v-model="filters.keyword" :prefix-icon="Search" clearable placeholder="操作人/ 模块 / 内容" /></el-form-item>
          <el-form-item>
            <el-select v-model="filters.level" clearable placeholder="级别" style="width: 120px">
              <el-option label="INFO" value="info" />
              <el-option label="WARN" value="warn" />
              <el-option label="RISK" value="risk" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-table class="desktop-table" :data="filteredLogs" height="520">
        <el-table-column prop="time" label="时间" width="170" />
        <el-table-column prop="operator" label="操作人" width="130" />
        <el-table-column prop="module" label="模块" width="120" />
        <el-table-column prop="action" label="动作" min-width="180" />
        <el-table-column label="级别" width="110"><template #default="{ row }"><el-tag :type="levelType(row.level)">{{ row.level.toUpperCase() }}</el-tag></template></el-table-column>
        <el-table-column prop="ip" label="IP" width="140" />
      </el-table>
      <DataCardList :rows="filteredLogs" :fields="mobileFields" :title="(row) => row.action" :subtitle="(row) => `${row.operator} · ${row.time}`" />
    </el-card>
  </AdminPage>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { computed, reactive } from 'vue';
import AdminPage from '../shared/AdminPage.vue';
import DataCardList from '../shared/DataCardList.vue';
import KpiGrid from '../shared/KpiGrid.vue';

const filters = reactive({ keyword: '', level: '' });
const logs = [
  { time: '2026-05-28 14:02:11', operator: 'super.admin', module: 'settlement', action: '触发 D+1 日结任务', level: 'info', ip: '10.0.0.12' },
  { time: '2026-05-28 13:44:20', operator: 'finance.director', module: 'finance', action: '提交会员 M10001 资金调整', level: 'warn', ip: '10.0.0.18' },
  { time: '2026-05-28 11:18:03', operator: 'risk.officer', module: 'orders', action: '标记订单 ORD-7004 为异常复核', level: 'risk', ip: '10.0.0.21' },
  { time: '2026-05-28 09:30:43', operator: 'operator.01', module: 'broadcast', action: '发送结算完成通知模板', level: 'info', ip: '10.0.0.35' },
];

const filteredLogs = computed(() => logs.filter((item) => {
  const keyword = filters.keyword.toLowerCase();
  const matchKeyword = !keyword || [item.operator, item.module, item.action].some((field) => field.toLowerCase().includes(keyword));
  return matchKeyword && (!filters.level || item.level === filters.level);
}));

const kpis = [
  { label: '今日日志', value: `${logs.length} 条`, sub: '后台审计事件' },
  { label: '风控事件', value: `${logs.filter((item) => item.level === 'risk').length} 条`, sub: '需要关注', tone: 'is-danger' },
  { label: '警告事件', value: `${logs.filter((item) => item.level === 'warn').length} 条`, sub: '资金或权限动作', tone: 'is-amber' },
];

const mobileFields = [
  { label: '模块', prop: 'module' },
  { label: '级别', format: (row) => row.level.toUpperCase() },
  { label: 'IP', prop: 'ip' },
];

const levelType = (level) => ({ info: 'success', warn: 'warning', risk: 'danger' }[level] || 'info');
</script>
