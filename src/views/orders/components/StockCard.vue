<template>
  <el-card class="alliance-card order-stock-card" shadow="never">
    <template #header>
      <div class="order-stock-card__header">
        <TrendCharts />
        <span>TROO 股票认购份额转拨明细</span>
      </div>
    </template>
    <div class="order-stock-card__body">
      <div class="order-stock-card__grid">
        <div class="order-stock-card__row">
          <span class="order-stock-card__label">TROO 总额</span>
          <span class="order-stock-card__value order-stock-card__value--purple">{{ formatNumber(order.stockConversion?.totalTroo) }} U</span>
        </div>
        <div class="order-stock-card__row">
          <span class="order-stock-card__label">即时释放</span>
          <span class="order-stock-card__value">{{ formatNumber(order.stockConversion?.instantRelease) }} U</span>
        </div>
        <div class="order-stock-card__row">
          <span class="order-stock-card__label">排队锁仓</span>
          <span class="order-stock-card__value">{{ formatNumber(order.stockConversion?.queueLocked) }} U</span>
        </div>
        <div class="order-stock-card__row">
          <span class="order-stock-card__label">锁仓周期</span>
          <span class="order-stock-card__value">{{ order.stockConversion?.lockDuration }} 天</span>
        </div>
        <div class="order-stock-card__row">
          <span class="order-stock-card__label">解锁间隔</span>
          <span class="order-stock-card__value">每 {{ order.stockConversion?.unlockInterval }} 天</span>
        </div>
        <div class="order-stock-card__row">
          <span class="order-stock-card__label">每次解锁</span>
          <span class="order-stock-card__value">{{ formatNumber(order.stockConversion?.unlockPerInterval) }} U</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { TrendCharts } from '@element-plus/icons-vue';

defineProps({
  order: { type: Object, required: true },
  formatNumber: { type: Function, required: true },
});
</script>
