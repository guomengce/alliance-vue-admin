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

<style scoped>
.status-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 20px;
}

.status-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-icon {
  width: 44px;
  height: 44px;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #10b981 0%, #2dd4bf 100%);
  color: #110e16;
  font-size: 24px;
  box-shadow: 0 14px 30px rgba(16, 185, 129, 0.1);
}

h1 {
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.35;
}

p {
  margin: 4px 0 0;
  color: rgba(203, 196, 210, 0.6);
  font-size: 13px;
  line-height: 1.6;
}

.risk-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 16px;
  border: 1px solid rgba(255, 180, 171, 0.15);
  border-radius: 12px;
  background: rgba(255, 180, 171, 0.05);
  color: #ffb4ab;
}

.risk-badge span {
  display: block;
  color: rgba(203, 196, 210, 0.5);
  font-size: 12px;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}

.risk-badge strong {
  display: block;
  margin-top: 5px;
  color: #34d399;
  font-family: Consolas, "Courier New", monospace;
  font-size: 13px;
  line-height: 1;
}

@media (max-width: 820px) {
  .status-card {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
