<template>
  <div class="admin-toolbar reports-toolbar">
    <el-form :model="filters" inline>
      <el-form-item>
        <el-date-picker v-model="filters.date" value-format="YYYY-MM-DD" type="date" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.format" style="width: 120px">
          <el-option label="XLSX" value="xlsx" />
          <el-option label="CSV" value="csv" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-button :icon="Refresh" @click="$emit('refresh')">刷新</el-button>
  </div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue';
import type { ExportFormat } from '../composables/useReports';

defineProps<{
  filters: {
    date: string;
    format: ExportFormat;
  };
}>();

defineEmits<{
  refresh: [];
}>();
</script>
