<template>
  <div class="admin-toolbar logs-toolbar">
    <el-form :model="filters" inline>
      <el-form-item>
        <el-input
          v-model="filters.keyword"
          :prefix-icon="Search"
          clearable
          placeholder="操作人 / 模块 / 内容"
        />
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.level" clearable placeholder="级别" style="width: 120px">
          <el-option label="INFO" value="info" />
          <el-option label="WARN" value="warn" />
          <el-option label="RISK" value="risk" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import type { LogLevel } from '../composables/useLogs';

defineProps<{
  filters: {
    keyword: string;
    level: LogLevel | '';
  };
}>();
</script>
