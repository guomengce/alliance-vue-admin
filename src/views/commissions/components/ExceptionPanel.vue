<template>
  <div v-if="commission.exceptionReport || commission.overflowReason" class="commission-exception-panel">
    <div class="commission-exception-panel__header">
      <WarningFilled />
      <span>资金溢出拦截回笼对账报告 (SYSTEM RECYCLE LOG)</span>
    </div>
    <div class="commission-exception-panel__body">
      <p>因上线代理人代付限额额度已满，未予下级支付的溢款金额已被系统自动拦截、解缴并回笼转入公共 Reserve 准备金库。</p>
      <p class="commission-exception-panel__note">* 本笔分销收益已由系统智能合约机制自动执行拦截并结转归集至平台准备金账户中，实现完整入库。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue';

defineProps({
  commission: { type: Object, required: true },
});
</script>
