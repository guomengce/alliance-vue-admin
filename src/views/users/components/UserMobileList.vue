<template>
  <div class="users-mobile-list">
    <article v-for="member in members" :key="member.id" class="users-mobile-card">
      <div class="users-mobile-card__head">
        <div class="users-identity-cell">
          <div class="users-avatar">{{ getAvatar(member) }}</div>
          <div>
            <strong>{{ member.nickname || '未设置昵称' }}</strong>
            <span>UID: {{ member.id }}</span>
          </div>
        </div>
        <span class="users-sponsor-pill">Sponsor: {{ member.inviterId || '999001' }}</span>
      </div>

      <div class="users-mobile-card__grid">
        <div>
          <span>联系方式</span>
          <strong>{{ member.phone || '暂无绑定手机' }}</strong>
          <small>{{ member.email || `${member.id}@alliance.com` }}</small>
        </div>
        <div>
          <span>下级/业绩</span>
          <strong>{{ member.teamSize }} 个下线</strong>
          <small>USDT {{ formatNumber(member.totalOrderAmount) }}</small>
        </div>
      </div>

      <div class="users-mobile-card__foot">
        <StatusPill :text="getKycText(member)" :tone="getKycTone(member)" :pulse="member.kyc?.l2 === 'pending'" />
        <div>
          <el-button v-if="member.kyc?.l2 === 'pending'" size="small" @click="$emit('approve-kyc', member)">批准</el-button>
          <el-button size="small" type="primary" @click="$emit('view', member)">查看</el-button>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';
import type { AdminMember } from '../composables/useUsers';

defineProps<{
  members: AdminMember[];
  formatNumber: (value: unknown) => string;
  getKycText: (member: AdminMember) => string;
  getKycTone: (member: AdminMember) => string;
}>();

defineEmits<{
  view: [member: AdminMember];
  'approve-kyc': [member: AdminMember];
}>();

function getAvatar(member: AdminMember) {
  return (member.nickname || member.id || 'U').slice(0, 1).toUpperCase();
}
</script>
