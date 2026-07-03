<template>
  <div class="users-table-wrap">
    <el-table class="users-table desktop-table" :data="members" height="560">
      <el-table-column label="用户昵称 / UID 账号" min-width="210">
        <template #default="{ row }">
          <div class="users-identity-cell">
            <div class="users-avatar">{{ getAvatar(row) }}</div>
            <div>
              <strong>{{ row.nickname || '未设置昵称' }}</strong>
              <span>UID: {{ row.id }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="联系方式 (手机 / 邮箱)" min-width="220">
        <template #default="{ row }">
          <div class="users-contact-cell">
            <strong>{{ row.phone || '暂无绑定手机' }}</strong>
            <span>{{ row.email || `${row.id}@alliance.com` }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="直属推荐关系" width="150">
        <template #default="{ row }">
          <span class="users-sponsor-pill">{{ row.inviterId || '999001 (SYS)' }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="joinedAt" label="注册并激活日期" width="170" />

      <el-table-column label="下级/业绩" width="150">
        <template #default="{ row }">
          <div class="users-metric-cell">
            <strong>{{ row.teamSize }} 个下线</strong>
            <span>USDT {{ formatNumber(row.totalOrderAmount) }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="KYC状态" width="170">
        <template #default="{ row }">
          <div class="users-kyc-cell">
            <StatusPill :text="getKycText(row)" :tone="getKycTone(row)" :pulse="row.kyc?.l2 === 'pending'" />
            <el-button v-if="row.kyc?.l2 === 'pending'" class="users-mini-approve" size="small" @click="$emit('approve-kyc', row)">
              审核
            </el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <span :class="['users-state-text', `users-state-text--${row.status}`]">{{ getStatusText(row.status) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="120">
        <template #default="{ row }">
          <el-button class="users-view-button" @click="$emit('view', row)">
            <el-icon><EditPen /></el-icon>
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { EditPen } from '@element-plus/icons-vue';
import StatusPill from '../../shared/StatusPill.vue';
import type { AdminMember } from '../composables/useUsers';

defineProps<{
  members: AdminMember[];
  formatNumber: (value: unknown) => string;
  getKycText: (member: AdminMember) => string;
  getKycTone: (member: AdminMember) => string;
  getStatusText: (status: string) => string;
}>();

defineEmits<{
  view: [member: AdminMember];
  'approve-kyc': [member: AdminMember];
}>();

function getAvatar(member: AdminMember) {
  return (member.nickname || member.id || 'U').slice(0, 1).toUpperCase();
}
</script>
