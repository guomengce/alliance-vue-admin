<template>
  <div class="settlement-mobile-list">
    <MobileDataCard
      v-for="settlement in settlements"
      :key="settlement.id"
      :title="settlement.id"
      :subtitle="settlement.date"
      :status-text="getStatusText(settlement.status)"
      :status-tone="getStatusTone(settlement.status)"
      :fields="getSettlementFields(settlement)"
    >
      <template #actions>
        <el-button size="small" type="primary" @click="$emit('view', settlement)">详情</el-button>
      </template>
    </MobileDataCard>
  </div>
</template>

<script setup lang="ts">
import MobileDataCard from '../../shared/MobileDataCard.vue';

const props = defineProps<{
  settlements: any[];
  formatNumber: (v: any) => string;
  getStatusText: (s: string) => string;
  getStatusTone: (s: string) => string;
}>();

defineEmits<{ view: [settlement: any] }>();

function getSettlementFields(settlement: any) {
  return [
    { label: '订单数', value: settlement.orderCount },
    { label: '订单金额', value: `USDT ${props.formatNumber(settlement.orderAmount)}`, tone: 'purple' },
    { label: '佣金', value: `USDT ${props.formatNumber(settlement.commissionAmount)}` },
    { label: '解锁', value: `USDT ${props.formatNumber(settlement.queueUnlockAmount)}` },
  ];
}
</script>