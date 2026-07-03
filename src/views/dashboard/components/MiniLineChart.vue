<template>
  <div class="mini-line-chart">
    <svg viewBox="0 0 320 130" role="img" aria-label="TROO price trend">
      <defs>
        <linearGradient id="trooLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#cfbcff" />
          <stop offset="1" stop-color="#34d399" />
        </linearGradient>
      </defs>
      <polyline class="mini-line-chart__line" :points="polylinePoints" />
      <circle
        v-for="(point, index) in points"
        :key="`${point.time}-${index}`"
        class="mini-line-chart__point"
        :class="{ active: index === activeIndex }"
        :cx="point.x"
        :cy="point.y + 10"
        r="4"
        @mouseenter="$emit('hover-index-change', index)"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ChartPoint {
  time: string;
  x: number;
  y: number;
}

const props = defineProps<{
  points: ChartPoint[];
  activeIndex: number;
}>();

defineEmits<{ 'hover-index-change': [index: number] }>();

const polylinePoints = computed(() => props.points.map((point) => `${point.x},${point.y + 10}`).join(' '));
</script>
