<template>
  <div class="commission-origin-panel">
    <div class="commission-origin-panel__header">
      <Connection />
      <span>分润源头追踪 (ORIGIN COMMISSION FLOW)</span>
    </div>
    <div class="commission-origin-panel__body">
      <p>
        本笔分销收益由团队成员
        <span class="commission-origin-panel__highlight">UID: {{ commission.originDetail?.sourceMemberId || commission.originDetail?.triggerMemberId }}</span>
        的认购操作触发。
      </p>
      <div class="commission-origin-panel__grid">
        <div>
          <span>对应下单实际充值数额</span>
          <strong>USDT {{ formatNumber(commission.originDetail?.orderAmount || commission.originDetail?.tier1Amount) }}</strong>
        </div>
        <div>
          <span>本笔分销收益数额:</span>
          <strong>USDT {{ formatNumber(commission.amount) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Connection } from '@element-plus/icons-vue';

defineProps({
  commission: { type: Object, required: true },
  formatNumber: { type: Function, required: true },
});
</script>
