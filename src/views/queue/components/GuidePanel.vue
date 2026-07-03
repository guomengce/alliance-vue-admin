<template>
  <div class="queue-guide-grid">
    <div class="queue-guide-grid__item">
      <div class="queue-guide-grid__icon">
        <Lock />
      </div>
      <div>
        <h4>排队与交割核心机制指南</h4>
        <p>当直推下级成员认购成功后，系统会自动触发排队锁仓释放机制。</p>
        <p>届时，用户账户按约定比例的 TROO 锁定金额将等待释放。</p>
      </div>
    </div>
    <div class="queue-guide-grid__item">
      <div class="queue-guide-grid__icon queue-guide-grid__icon--purple">
        <TrendCharts />
      </div>
      <div>
        <h4>智能校对财务监控</h4>
        <p>如果特殊业务场景导致下单金额与实际锁定不一致，系统可生成校准凭证，便于运营团队核实后执行人工修正。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock, TrendCharts } from '@element-plus/icons-vue';
</script>
