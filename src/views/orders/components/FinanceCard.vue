<template>
  <el-card class="alliance-card order-finance-card" shadow="never">
    <template #header>
      <div class="order-finance-card__header">
        <el-icon><Wallet /></el-icon>
        <span>资金流向与交易校对</span>
      </div>
    </template>
    <div class="order-finance-card__body">
      <div class="order-finance-card__grid">
        <div class="order-finance-card__row">
          <span class="order-finance-card__label">支付渠道</span>
          <span class="order-finance-card__value">{{ order.paymentChannel }}</span>
        </div>
        <div class="order-finance-card__row">
          <span class="order-finance-card__label">交易哈希</span>
          <span class="order-finance-card__value order-finance-card__value--mono">{{ order.txid }}</span>
        </div>
        <div class="order-finance-card__row">
          <span class="order-finance-card__label">存款金额</span>
          <span class="order-finance-card__value order-finance-card__value--purple">USDT {{ formatNumber(order.cashFlowTrack?.depositAmount) }}</span>
        </div>
        <div class="order-finance-card__row">
          <span class="order-finance-card__label">手续费</span>
          <span class="order-finance-card__value">USDT {{ formatNumber(order.cashFlowTrack?.fee) }}</span>
        </div>
        <div class="order-finance-card__row">
          <span class="order-finance-card__label">净入金额</span>
          <span class="order-finance-card__value">USDT {{ formatNumber(order.cashFlowTrack?.netAmount) }}</span>
        </div>
        <div class="order-finance-card__row">
          <span class="order-finance-card__label">资金状态</span>
          <StatusPill :text="order.cashFlowTrack?.status === 'confirmed' ? '已确认' : '待确认'" :tone="order.cashFlowTrack?.status === 'confirmed' ? 'success' : 'warning'" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Wallet } from '@element-plus/icons-vue';
import StatusPill from '../../shared/StatusPill.vue';

defineProps({
  order: { type: Object, required: true },
  formatNumber: { type: Function, required: true },
});
</script>
