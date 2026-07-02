<template>
  <div class="order-detail-view">
    <div class="order-detail-view__header">
      <el-button :icon="ArrowLeft" @click="$emit('back')">返回订单列表</el-button>
      <div class="order-detail-view__title">
        <h2>{{ order.id }}</h2>
        <StatusPill :text="getStatusText(order.status)" :tone="getStatusTone(order.status)" :pulse="order.status === 'pending'" />
      </div>
    </div>

    <PendingActions v-if="order.status === 'pending'" @confirm="$emit('confirm')" @reject="$emit('reject')" />

    <div class="order-detail-view__main">
      <div class="order-detail-view__cards">
        <FinanceCard :order="order" :format-number="formatNumber" />
        <StockCard :order="order" :format-number="formatNumber" />
      </div>

      <div class="order-detail-view__info">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="订单编号">{{ order.id }}</el-descriptions-item>
          <el-descriptions-item label="会员 UID">{{ order.memberId }}</el-descriptions-item>
          <el-descriptions-item label="会员名称">{{ order.memberName }}</el-descriptions-item>
          <el-descriptions-item label="认购套餐">{{ order.packageName }}</el-descriptions-item>
          <el-descriptions-item label="认购金额">USDT {{ formatNumber(order.amount) }}</el-descriptions-item>
          <el-descriptions-item label="支付时间">{{ order.paidAt || '未支付' }}</el-descriptions-item>
          <el-descriptions-item label="状态">{{ getStatusText(order.status) }}</el-descriptions-item>
          <el-descriptions-item label="异常标记">
            <el-tag v-if="order.abnormal" type="danger">异常</el-tag>
            <span v-else>正常</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

    <CommissionTrace :order="order" :format-number="formatNumber" />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import CommissionTrace from './CommissionTrace.vue';
import FinanceCard from './FinanceCard.vue';
import PendingActions from './PendingActions.vue';
import StockCard from './StockCard.vue';
import StatusPill from '../../shared/StatusPill.vue';

defineProps({
  order: { type: Object, required: true },
  formatNumber: { type: Function, required: true },
  getStatusText: { type: Function, required: true },
  getStatusTone: { type: Function, required: true },
});

defineEmits(['back', 'confirm', 'reject']);
</script>