<template>
  <AuditOverlay :model-value="visible" @update:model-value="$emit('update:visible', $event)" :title="title" :subtitle="subtitle">
    <div class="settlement-detail-overlay">
      <CapacityWarning v-if="hasCapacityWarning" :count="overflowCount" />

      <div class="settlement-detail-overlay__facts">
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">结算批次编号:</span>
          <span class="settlement-detail-overlay__fact-value">{{ settlement.id }}</span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">业务日期:</span>
          <span class="settlement-detail-overlay__fact-value">{{ settlement.date }}</span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">订单数量:</span>
          <span class="settlement-detail-overlay__fact-value">{{ settlement.orderCount }} �?/span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">订单总额:</span>
          <span class="settlement-detail-overlay__fact-value settlement-detail-overlay__fact-value--purple">USDT {{ formatNumber(settlement.orderAmount) }}</span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">预拨虚增应得:</span>
          <span class="settlement-detail-overlay__fact-value settlement-detail-overlay__fact-value--amber">USDT {{ formatNumber(settlement.commissionAmount) }}</span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">可用佣金池限�?</span>
          <span class="settlement-detail-overlay__fact-value">USDT {{ formatNumber(settlement.poolCapacity || settlement.commissionAmount) }}</span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">实派到账:</span>
          <span class="settlement-detail-overlay__fact-value settlement-detail-overlay__fact-value--green">USDT {{ formatNumber(settlement.actualAmount || settlement.commissionAmount) }}</span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">溢扣平台准备�?</span>
          <span class="settlement-detail-overlay__fact-value" :class="{ 'settlement-detail-overlay__fact-value--red': settlement.overflowAmount > 0 }">USDT {{ formatNumber(settlement.overflowAmount) }}</span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">排队解锁金额:</span>
          <span class="settlement-detail-overlay__fact-value">USDT {{ formatNumber(settlement.queueUnlockAmount) }}</span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">结算状�?</span>
          <span class="settlement-detail-overlay__fact-value">
            <StatusPill :text="getStatusText(settlement.status)" :tone="getStatusTone(settlement.status)" />
          </span>
        </div>
        <div class="settlement-detail-overlay__fact-row">
          <span class="settlement-detail-overlay__fact-label">运行时间:</span>
          <span class="settlement-detail-overlay__fact-value">{{ settlement.runAt || '未运�? }}</span>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button @click="$emit('close')">关闭详情</el-button>
      <el-button v-if="hasCapacityWarning" type="warning" @click="$emit('notify')">通知会员佣金额池枯竭</el-button>
      <el-button v-if="hasCapacityWarning" type="primary" @click="$emit('force-settle')">人工补发并强制轧�?/el-button>
    </template>
  </AuditOverlay>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AuditOverlay from '../../shared/AuditOverlay.vue';
import StatusPill from '../../shared/StatusPill.vue';
import CapacityWarning from './CapacityWarning.vue';

const props = defineProps({
  visible: { type: Boolean, required: true },
  settlement: { type: Object, required: true },
  formatNumber: { type: Function, required: true },
  getStatusText: { type: Function, required: true },
  getStatusTone: { type: Function, required: true },
});

defineEmits(['close', 'update:visible', 'notify', 'force-settle']);

const title = computed(() => '结算批次详情');
const subtitle = computed(() => `日期: ${props.settlement.date}`);

const hasCapacityWarning = computed(() => {
  return props.settlement.overflowAmount > 0 || props.settlement.status === 'clipped' || props.settlement.status === 'stalled_exception';
});

const overflowCount = computed(() => {
  return props.settlement.overflowCount || 1;
});
</script>
