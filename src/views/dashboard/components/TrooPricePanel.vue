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
      <p>订阅认购时将即时以此售价换算 70% 对应 TROO 给予承购人账户。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import MiniLineChart from './MiniLineChart.vue';

interface TrooPoint {
  time: string;
  price: number;
  priceText: string;
  changeText: string;
  change: number;
  x: number;
  y: number;
}

defineEmits(['hover-index-change']);

const props = defineProps({
  points: { type: Array as PropType<TrooPoint[]>, required: true },
  activeIndex: { type: Number, required: true },
});

const activePoint = computed(() => props.points[props.activeIndex] || { time: '-', priceText: '$0.0000', changeText: '+0.00%', change: 0 });
</script>
