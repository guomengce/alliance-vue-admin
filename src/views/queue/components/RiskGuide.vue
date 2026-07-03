<template>
  <div class="queue-risk-guide">
    <el-card class="alliance-card" shadow="never">
      <template #header>
        <div class="queue-risk-guide__panel-header">
          <TrendCharts />
          <span>智能校对监控规范</span>
        </div>
      </template>
      <p>排队队列由直推触发机制秒级交割。当下级成员认购成功，智能合约将立即执行出水动作，冲减相应排队待释放量。</p>
    </el-card>
    <el-card class="alliance-card" shadow="never">
      <template #header>
        <div class="queue-risk-guide__panel-header">
          <Lock />
          <span>结算风控提示</span>
        </div>
      </template>
      <p>所有手工修正行为都会生成独特的 TRIG-CAL 校验对账流水单号进行归档，多重核对确保链上链下逻辑一致。</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Lock, TrendCharts } from '@element-plus/icons-vue';
</script>
