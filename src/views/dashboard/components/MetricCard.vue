<template>
  <article class="dashboard-card metric-card">
    <div class="kpi-mark">KPI</div>
    <p>{{ title }}</p>
    <strong :class="colorClass">{{ value }}</strong>
    <span>{{ sub }}</span>
  </article>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
  sub: { type: String, required: true },
  colorClass: { type: String, default: 'is-white' },
});
</script>

<style scoped>
.metric-card {
  position: relative;
  min-height: 122px;
  overflow: hidden;
  padding: 18px;
}

.kpi-mark {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.02);
  color: rgba(255, 255, 255, 0.25);
  font-family: Consolas, "Courier New", monospace;
  font-size: 12px;
}

p {
  margin: 0;
  color: rgba(203, 196, 210, 0.5);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

strong {
  display: block;
  margin-top: 9px;
  font-family: Consolas, "Courier New", monospace;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.25;
  word-break: break-word;
}

span {
  display: block;
  margin-top: 6px;
  color: rgba(203, 196, 210, 0.4);
  font-size: 12px;
  line-height: 1.45;
}

.is-white {
  color: #fff;
}

.is-purple {
  color: #cfbcff;
}

.is-green {
  color: #34d399;
}

.is-amber {
  color: #fbbf24;
}

.is-teal {
  color: #5eead4;
}
</style>
