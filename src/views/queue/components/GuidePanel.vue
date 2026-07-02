<template>
  <div class="queue-guide-grid">
    <div class="queue-guide-grid__item">
      <div class="queue-guide-grid__icon">
        <Lock />
      </div>
      <div>
        <h4>排队与交割核心机制指南</h4>
        <p>当日已满足上浮条件的一托多链（L1 下面）如认购满额后，会自动触发排队锁仓机制。</p>
        <p>届时，用户账户将被冻结 31% 比例的 TROO 锁定等待发放。</p>
      </div>
    </div>
    <div class="queue-guide-grid__item">
      <div class="queue-guide-grid__icon queue-guide-grid__icon--purple">
        <TrendCharts />
      </div>
      <div>
        <h4>智能校对账务监控</h4>
        <p>如果由于特殊业务场景触发，导致下单金额与实际锁仓不一致，系统可自动生成“校准凭证”，以便运营团队核实后执行人工修正。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock, TrendCharts } from '@element-plus/icons-vue';
</script>
