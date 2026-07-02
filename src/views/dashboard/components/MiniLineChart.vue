<template>
  <div class="line-chart" @mouseleave="$emit('hover-index-change', null)">
    <svg viewBox="0 0 320 110" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient :id="areaId" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="rgba(207,188,255,0.26)" />
          <stop offset="100%" stop-color="rgba(103,80,164,0)" />
        </linearGradient>
      </defs>
      <path :d="areaPath" :fill="`url(#${areaId})`" />
      <path :d="linePath" fill="none" stroke="#cfbcff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
      <circle
        v-for="(point, index) in points"
        :key="point.time"
        :cx="point.x"
        :cy="point.y"
        :class="{ active: index === activeIndex }"
        r="5"
        @mouseenter="$emit('hover-index-change', index)"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineEmits(['hover-index-change']);

const props = defineProps({
  points: { type: Array, required: true },
  activeIndex: { type: Number, required: true },
});

const areaId = `troo-area-${Math.random().toString(36).slice(2)}`;
const linePath = computed(() => props.points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' '));
const areaPath = computed(() => `${linePath.value} L 320 110 L 0 110 Z`);
</script>

<style scoped>
.line-chart {
  width: 100%;
  height: 110px;
  margin: 24px 0 8px;
  overflow: hidden;
}

svg {
  width: 100%;
  height: 100%;
}

circle {
  fill: #cfbcff;
  opacity: 0;
  stroke: #141119;
  stroke-width: 2;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

circle.active,
circle:hover {
  opacity: 1;
}
</style>
