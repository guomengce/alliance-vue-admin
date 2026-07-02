<template>
  <div class="queue-amount-stats">
    <div class="queue-amount-stats__card">
      <div class="queue-amount-stats__icon">
        <Wallet />
      </div>
      <span class="queue-amount-stats__label">原始锁仓基础本金</span>
      <strong class="queue-amount-stats__value">USDT {{ formatNumber(account.lockedAmount + account.unlockedAmount) }}</strong>
    </div>
    <div class="queue-amount-stats__card queue-amount-stats__card--amber">
      <div class="queue-amount-stats__icon">
        <Clock />
      </div>
      <span class="queue-amount-stats__label">仍锁仓排队中</span>
      <strong class="queue-amount-stats__value">USDT {{ formatNumber(account.lockedAmount) }}</strong>
    </div>
    <div class="queue-amount-stats__card queue-amount-stats__card--green">
      <div class="queue-amount-stats__icon">
        <CircleCheck />
      </div>
      <span class="queue-amount-stats__label">已完成出水转拨可�?/span>
      <strong class="queue-amount-stats__value">USDT {{ formatNumber(account.unlockedAmount) }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleCheck, Clock, Wallet } from '@element-plus/icons-vue';

defineProps({
  account: { type: Object, required: true },
  formatNumber: { type: Function, required: true },
});
</script>
