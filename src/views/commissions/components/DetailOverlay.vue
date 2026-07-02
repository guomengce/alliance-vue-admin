<template>
  <AuditOverlay :model-value="visible" @update:model-value="$emit('update:visible', $event)" :title="title" :subtitle="subtitle">
    <div class="commission-detail-overlay">
      <div class="commission-detail-overlay__facts">
        <div class="commission-detail-overlay__fact-row">
          <span class="commission-detail-overlay__fact-label">拟发放代�?UID:</span>
          <span class="commission-detail-overlay__fact-value">{{ commission.memberName }} ({{ commission.memberId }})</span>
        </div>
        <div class="commission-detail-overlay__fact-row">
          <span class="commission-detail-overlay__fact-label">分销推荐代数层级:</span>
          <span class="commission-detail-overlay__fact-value">L{{ commission.level }} (直属级下线裂变推�?</span>
        </div>
        <div class="commission-detail-overlay__fact-row">
          <span class="commission-detail-overlay__fact-label">认购代收关联源订�?</span>
          <span class="commission-detail-overlay__fact-value">{{ commission.sourceOrderId || '-' }}</span>
        </div>
        <div class="commission-detail-overlay__fact-row">
          <span class="commission-detail-overlay__fact-label">预估分拨金额:</span>
          <span class="commission-detail-overlay__fact-value commission-detail-overlay__fact-value--green">USDT {{ formatNumber(commission.amount) }}</span>
        </div>
        <div class="commission-detail-overlay__fact-row">
          <span class="commission-detail-overlay__fact-label">交割目标接收账户:</span>
          <span class="commission-detail-overlay__fact-value">平台用户内置钱包余额</span>
        </div>
        <div class="commission-detail-overlay__fact-row">
          <span class="commission-detail-overlay__fact-label">交易计入时间�?</span>
          <span class="commission-detail-overlay__fact-value">{{ commission.createdAt || '-' }}</span>
        </div>
        <div class="commission-detail-overlay__fact-row">
          <span class="commission-detail-overlay__fact-label">精算派发终审状�?</span>
          <span class="commission-detail-overlay__fact-value">
            <StatusPill :text="getStatusText(commission.status)" :tone="getStatusTone(commission.status)" :pulse="getStatusPulse(commission.status)" />
          </span>
        </div>
      </div>

      <OriginPanel v-if="commission.originDetail" :commission="commission" :format-number="formatNumber" />

      <ExceptionPanel :commission="commission" />
    </div>
    <template #footer>
      <el-button @click="$emit('close')">关闭详情</el-button>
    </template>
  </AuditOverlay>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AuditOverlay from '../../shared/AuditOverlay.vue';
import StatusPill from '../../shared/StatusPill.vue';
import ExceptionPanel from './ExceptionPanel.vue';
import OriginPanel from './OriginPanel.vue';

const props = defineProps({
  visible: { type: Boolean, required: true },
  commission: { type: Object, required: true },
  formatNumber: { type: Function, required: true },
  getStatusText: { type: Function, required: true },
  getStatusTone: { type: Function, required: true },
  getStatusPulse: { type: Function, required: true },
});

defineEmits(['close', 'update:visible']);

const title = computed(() => '分销佣金精算派发审计日志详情');
const subtitle = computed(() => `TRANSACTION ID: ${props.commission.id}`);
</script>