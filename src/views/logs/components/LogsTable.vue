<template>
  <el-table class="desktop-table logs-table" :data="logs" height="520">
    <el-table-column prop="time" label="时间" width="170" />
    <el-table-column prop="operator" label="操作人" width="130" />
    <el-table-column prop="module" label="模块" width="120" />
    <el-table-column prop="action" label="动作" min-width="180" />
    <el-table-column label="级别" width="110">
      <template #default="{ row }">
        <el-tag :type="levelType(row.level)">{{ row.level.toUpperCase() }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="ip" label="IP" width="140" />
  </el-table>

  <DataCardList
    :rows="logs"
    :fields="fields"
    :title="(row) => row.action"
    :subtitle="(row) => `${row.operator} / ${row.time}`"
  />
</template>

<script setup lang="ts">
import DataCardList from '../../shared/DataCardList.vue';
import type { LogLevel, LogRow } from '../composables/useLogs';

defineProps<{
  logs: LogRow[];
  fields: Array<{ label: string; prop?: string; format?: (row: LogRow) => string }>;
  levelType: (level: LogLevel) => string;
}>();
</script>
