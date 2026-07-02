<template>
  <div class="commission-mobile-list">
    <MobileDataCard
      v-for="commission in commissions"
      :key="commission.id"
      :title="commission.id"
      :subtitle="`${commission.memberId} · ${commission.memberName}`"
      :status-text="getStatusText(commission.status)"
      :status-tone="getStatusTone(commission.status)"
      :fields="getCommissionFields(commission)"
    >
      <template #actions>
        <el-button size="small" type="primary" @click="$emit('view', commission)">查看详情</el-button>
      </template>
    </MobileDataCard>
  </div>
</template>

<script setup lang="ts">
import MobileDataCard from '../../shared/MobileDataCard.vue';

const props = defineProps<{
  commissions: any[];
  formatNumber: (value: any) => string;
  getStatusText: (status: string) => string;
  getStatusTone: (status: string) => string;
}>();

defineEmits<{ view: [commission: any] }>();

function getCommissionFields(commission: any) {
  return [
    { label: '订单', value: commission.orderId || '-' },
    { label: '会员', value: commission.memberName || commission.memberId || '-' },
    { label: '金额', value: `USDT ${props.formatNumber(commission.amount)}`, tone: 'purple' },
    { label: '时间', value: commission.createdAt || '-' },
  ];
}
</script>
