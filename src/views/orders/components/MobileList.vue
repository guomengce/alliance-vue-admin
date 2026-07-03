<template>
  <div class="order-mobile-list">
    <MobileDataCard
      v-for="order in orders"
      :key="order.id"
      :title="order.id"
      :subtitle="`${order.memberId} · ${order.packageName}`"
      :status-text="getStatusText(order.status)"
      :status-tone="getStatusTone(order.status)"
      :fields="getOrderFields(order)"
    >
      <template #actions>
        <el-button size="small" type="primary" @click="$emit('view', order)">查看详情</el-button>
      </template>
    </MobileDataCard>
  </div>
</template>

<script setup lang="ts">
import MobileDataCard from '../../shared/MobileDataCard.vue';

const props = defineProps<{
  orders: any[];
  formatMoney: (v: any) => string;
  formatNumber: (v: any) => string;
  getStatusText: (s: string) => string;
  getStatusTone: (s: string) => string;
}>();

defineEmits<{ view: [order: any] }>();

function getOrderFields(order: any) {
  return [
    { label: '会员', value: order.memberName },
    { label: '金额', value: `USDT ${props.formatNumber(order.amount)}`, tone: 'purple' },
    { label: 'TROO', value: props.formatNumber(order.instantTroo) },
    { label: '锁仓', value: `USDT ${props.formatNumber(order.queueLocked)}` },
  ];
}
</script>
