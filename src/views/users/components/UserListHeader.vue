<template>
  <div class="users-list-header">
    <div>
      <h3>
        <el-icon><User /></el-icon>
        <span>用户管理列表</span>
      </h3>
      <p>Supervise and audit registered affiliate members. Click "查看" to verify credentials and execute adjustments.</p>
    </div>

    <div class="users-list-header__tools">
      <el-input
        :model-value="keyword"
        class="users-search-input"
        :prefix-icon="Search"
        clearable
        placeholder="搜索昵称 / 邮箱 / UID..."
        @update:model-value="$emit('update:keyword', String($event))"
      />
      <el-select
        :model-value="kyc"
        class="users-kyc-select"
        placeholder="全部 KYC 状态"
        @update:model-value="$emit('update:kyc', String($event))"
      >
        <el-option label="全部 KYC 状态" value="all" />
        <el-option label="仅待 L2 终审" value="pending" />
        <el-option label="L2 审核通过" value="approved" />
      </el-select>
      <el-button :icon="Refresh" :loading="loading" @click="$emit('refresh')">刷新</el-button>
      <span class="users-list-header__count">{{ total }} MEMBERS</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Refresh, Search, User } from '@element-plus/icons-vue';

defineProps<{
  keyword: string;
  kyc: string;
  total: number;
  loading: boolean;
}>();

defineEmits<{
  'update:keyword': [value: string];
  'update:kyc': [value: string];
  refresh: [];
}>();
</script>
