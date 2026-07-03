<template>
  <el-card class="alliance-card admin-table-card rbac-account-card" shadow="never">
    <template #header>
      <div class="rbac-card-header">
        <span>管理账号</span>
        <small>SECURITY ACCOUNTS</small>
      </div>
    </template>

    <el-table :data="accounts" height="480">
      <el-table-column label="账号身份" min-width="210">
        <template #default="{ row }">
          <div class="rbac-account">
            <div class="rbac-account__avatar">{{ row.nickname.slice(0, 1).toUpperCase() }}</div>
            <div>
              <strong>{{ row.nickname }}</strong>
              <span>{{ row.username }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="安全邮箱" min-width="210" />
      <el-table-column label="角色" width="160">
        <template #default="{ row }">
          <span class="rbac-role-pill">{{ row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lastLoginTime" label="最近登录" width="170" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <StatusPill :text="getStatusText(row.status)" :tone="getStatusTone(row.status)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="right">
        <template #default="{ row }">
          <el-button class="rbac-action-button" @click="$emit('edit', row)">编辑</el-button>
          <el-button class="rbac-action-button rbac-action-button--danger" @click="$emit('toggle', row)">
            {{ row.status === 'active' ? '停用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';
import type { AdminAccount } from '../composables/useRbac';

defineProps<{
  accounts: AdminAccount[];
  getStatusText: (status: AdminAccount['status']) => string;
  getStatusTone: (status: AdminAccount['status']) => string;
}>();

defineEmits<{
  edit: [account: AdminAccount];
  toggle: [account: AdminAccount];
}>();
</script>
