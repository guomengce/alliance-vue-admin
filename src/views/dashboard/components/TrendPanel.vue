<template>
  <section class="dashboard-card panel-card trend-panel" @mouseleave="$emit('hover-index-change', null)">
    <div>
      <h3>
        <el-icon><TrendCharts /></el-icon>
        近七日认购单及公司结算佣金走势对比
      </h3>
      <p class="caption">精算统计全系统每日新增流动性质押认购体量与 D+1 04:00 各代扣池佣金派发划拨总值比较</p>
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
import { TrendCharts } from '@element-plus/icons-vue';
import type { DashboardTrend } from '../../../types';

defineEmits(['hover-index-change']);

const props = defineProps<{
  trend: DashboardTrend[];
  activeIndex: number;
}>();

const formatUsdt = (value: number) => `${Number(value || 0).toLocaleString()} USDT`;
const maxValue = computed(() => Math.max(...props.trend.flatMap((item) => [item.subscriptionAmount, item.commissionAmount]), 1));
const getHeight = (value: number) => Math.max(8, Math.round((Number(value || 0) / maxValue.value) * 100));

const activePoint = computed(() => {
  const item = props.trend[props.activeIndex] || { date: '-', subscriptionAmount: 0, commissionAmount: 0 };
  return {
    date: item.date,
    subscriptionAmountText: formatUsdt(item.subscriptionAmount),
    commissionAmountText: formatUsdt(item.commissionAmount),
  };
});
</script>

<style scoped>
.trend-panel {
  grid-column: span 7;
}

h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
}

h3 .el-icon {
  color: #cfbcff;
}

.caption {
  margin: 6px 0 0;
  color: rgba(203, 196, 210, 0.6);
  font-size: 13px;
  line-height: 1.6;
}

.active-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 18px 0 16px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  background: #1e1a26;
}

.active-row span {
  display: block;
  color: rgba(203, 196, 210, 0.4);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.active-row b {
  display: block;
  margin-top: 4px;
  color: #cbc4d2;
  font-family: Consolas, "Courier New", monospace;
  font-size: 13px;
}

.active-row .purple,
.purple-dot {
  color: #cfbcff;
}

.active-row .green,
.green-dot {
  color: #34d399;
}

.purple-dot::before,
.green-dot::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 6px;
  border-radius: 999px;
  vertical-align: 1px;
}

.purple-dot::before {
  background: #cfbcff;
}

.green-dot::before {
  background: #6750a4;
}

.bar-chart {
  height: 236px;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  align-items: end;
  gap: 12px;
  padding-top: 8px;
}

.bar-group {
  min-width: 0;
  cursor: default;
}

.bars {
  height: 202px;
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 6px;
}

.bars i {
  width: 14px;
  min-height: 8px;
  border-radius: 3px 3px 0 0;
  opacity: 0.72;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.bars .sub {
  background: #cfbcff;
}

.bars .comm {
  background: #6750a4;
}

.bar-group.active .bars i,
.bar-group:hover .bars i {
  opacity: 1;
  transform: translateY(-3px);
}

.bar-group > span {
  display: block;
  margin-top: 8px;
  overflow: hidden;
  color: rgba(203, 196, 210, 0.42);
  font-size: 10px;
  font-weight: 800;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1080px) {
  .trend-panel {
    grid-column: span 1;
  }
}

@media (max-width: 700px) {
  .active-row {
    grid-template-columns: 1fr;
  }

  .bar-chart {
    gap: 6px;
  }

  .bars i {
    width: 10px;
  }
}
</style>
