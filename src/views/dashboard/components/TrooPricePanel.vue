<template>
  <section class="dashboard-card panel-card troo-panel">
    <div>
      <div class="feed-row">
        <span>Yahoo Finance Feed</span>
      </div>

      <div class="price-head">
        <div>
          <p>TROO / USDT 昨日行情价格</p>
          <div class="price-line">
            <strong>{{ activePoint.priceText }}</strong>
            <el-tag :class="['change-tag', activePoint.change >= 0 ? 'is-up' : 'is-down']">
              {{ activePoint.changeText }}
            </el-tag>
          </div>
        </div>
        <div class="time-box">
          <span>时段 {{ activePoint.time }}</span>
          <b>昨日历史走势</b>
        </div>
      </div>

      <MiniLineChart :points="points" :active-index="activeIndex" @hover-index-change="$emit('hover-index-change', $event)" />
    </div>

    <div class="note-box">
      <p>汇率基准溢价: <b>1 USDT = 10 TROO</b></p>
      <p>订阅认购时将即时以此售价换算 70% 对应 TROO 给予承购人账户�?/p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TrooMarketItem } from '../../../types';
import MiniLineChart from './MiniLineChart.vue';

defineEmits(['hover-index-change']);

const props = defineProps<{
  points: TrooMarketItem[];
  activeIndex: number;
}>();

const activePoint = computed(() => props.points[props.activeIndex] || { time: '-', priceText: '$0.0000', changeText: '+0.00%', change: 0 } as TrooMarketItem);
</script>

<style scoped>
.troo-panel {
  grid-column: span 5;
}

.feed-row {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.feed-row span {
  color: rgba(203, 196, 210, 0.5);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.price-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
}

.price-head p {
  margin: 0;
  color: rgba(203, 196, 210, 0.7);
  font-size: 13px;
  font-weight: 600;
}

.price-line {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 8px;
}

.price-line strong {
  color: #fff;
  font-family: Consolas, "Courier New", monospace;
  font-size: 30px;
  font-weight: 900;
  line-height: 1;
}

.change-tag {
  height: 24px;
  border-radius: 8px;
  font-family: Consolas, "Courier New", monospace;
  font-size: 12px;
  font-weight: 800;
}

.change-tag.is-up {
  border-color: rgba(0, 230, 118, 0.2);
  background: rgba(0, 230, 118, 0.1);
  color: #00e676;
}

.change-tag.is-down {
  border-color: rgba(244, 63, 94, 0.2);
  background: rgba(244, 63, 94, 0.1);
  color: #fb7185;
}

.time-box {
  color: rgba(203, 196, 210, 0.4);
  font-family: Consolas, "Courier New", monospace;
  font-size: 12px;
  text-align: right;
}

.time-box b {
  display: block;
  margin-top: 4px;
  color: rgba(207, 188, 255, 0.7);
  font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
}

.note-box {
  margin-top: 20px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  color: rgba(203, 196, 210, 0.8);
  font-size: 13px;
  line-height: 1.7;
}

.note-box p {
  margin: 0;
}

.note-box p + p {
  margin-top: 6px;
}

.note-box b {
  color: #e7c365;
}

@media (max-width: 1080px) {
  .troo-panel {
    grid-column: span 1;
  }
}

@media (max-width: 640px) {
  .price-head {
    flex-direction: column;
  }

  .time-box {
    text-align: left;
  }
}
</style>
