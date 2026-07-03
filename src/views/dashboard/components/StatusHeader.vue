<template>
  <section class="dashboard-card status-card">
    <div class="status-main">
      <div class="status-icon">
        <el-icon><CircleCheckFilled /></el-icon>
      </div>
      <div>
        <h1>全同盟高级运营管理控制中心</h1>
        <p>拥有机构储备大盘监控、参数实时微调、跨层佣金对账及秒级广播最高权限。</p>
      </div>
    </div>

    <div class="risk-badge">
      <el-icon><TrendCharts /></el-icon>
      <div>
        <span>系统风控状态</span>
        <strong>D+1 Settled Safely</strong>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CircleCheckFilled, TrendCharts } from '@element-plus/icons-vue';
</script>
