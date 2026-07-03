<template>
  <section class="dashboard-card panel-card trend-panel" @mouseleave="$emit('hover-index-change', null)">
    <div>
      <h3>
        <el-icon><TrendCharts /></el-icon>
        近七日认购单及公司结算佣金走势对比
      </h3>
      <p class="caption">精算统计全系统每日新增流动性质押认购体量与 D+1 04:00 各代扣池佣金派发划拨总值比较。</p>
    </div>

    <div class="active-row">
      <div>
        <span>核算日期</span>
        <b>{{ activePoint.date }}</b>
      </div>
      <div>
        <span class="purple-dot">订阅认购金额</span>
        <b class="purple">{{ activePoint.subscriptionAmountText }}</b>
      </div>
      <div>
        <span class="green-dot">D+1 结算分润</span>
        <b class="green">{{ activePoint.commissionAmountText }}</b>
      </div>
    </div>

    <div class="bar-chart">
      <div
        v-for="(item, index) in trend"
        :key="item.date"
        class="bar-group"
        :class="{ active: index === activeIndex }"
        @mouseenter="$emit('hover-index-change', index)"
      >
        <div class="bars">
          <i class="sub" :style="{ height: getHeight(item.subscriptionAmount) + '%' }" />
          <i class="comm" :style="{ height: getHeight(item.commissionAmount) + '%' }" />
        </div>
        <span>{{ item.date.slice(5) }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import { TrendCharts } from '@element-plus/icons-vue';

interface TrendItem {
  date: string;
  subscriptionAmount: number;
  commissionAmount: number;
}

defineEmits(['hover-index-change']);

const props = defineProps({
  trend: { type: Array as PropType<TrendItem[]>, required: true },
  activeIndex: { type: Number, required: true },
});

const formatUsdt = (value: unknown) => `${Number(value || 0).toLocaleString()} USDT`;
const maxValue = computed(() => Math.max(...props.trend.flatMap((item) => [item.subscriptionAmount, item.commissionAmount]), 1));
const getHeight = (value: unknown) => Math.max(8, Math.round((Number(value || 0) / maxValue.value) * 100));

const activePoint = computed(() => {
  const item = props.trend[props.activeIndex] || { date: '-', subscriptionAmount: 0, commissionAmount: 0 };
  return {
    date: item.date,
    subscriptionAmountText: formatUsdt(item.subscriptionAmount),
    commissionAmountText: formatUsdt(item.commissionAmount),
  };
});
</script>
