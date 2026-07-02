<template>
  <div class="queue-roster-mobile-list">
    <MobileDataCard
      v-for="account in accounts"
      :key="account.id"
      :title="account.memberName"
      :subtitle="account.memberId"
      :fields="getAccountFields(account)"
    >
      <template #actions>
        <el-button size="small" type="primary" @click="$emit('view', account)">记录详情</el-button>
      </template>
    </MobileDataCard>
  </div>
</template>

<script setup lang="ts">
import MobileDataCard from '../../shared/MobileDataCard.vue';

const props = defineProps<{
  accounts: any[];
  formatNumber: (v: any) => string;
}>();

defineEmits<{ view: [account: any] }>();

function getAccountFields(account: any) {
  return [
    { label: '初始锁定', value: `USDT ${props.formatNumber(account.lockedAmount + account.unlockedAmount)}` },
    { label: '仍锁定', value: `USDT ${props.formatNumber(account.lockedAmount)}`, tone: 'amber' },
    { label: '已解锁', value: `USDT ${props.formatNumber(account.unlockedAmount)}`, tone: 'green' },
    { label: '进度', value: `${Math.round(account.unlockProgress * 100)}%` },
  ];
}
</script>