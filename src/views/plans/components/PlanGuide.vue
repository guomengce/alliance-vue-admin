<template>
  <section class="plan-guide">
    <p>
      <el-icon><QuestionFilled /></el-icon>
      <span>理财配置及数值对算关系指南：</span>
    </p>
    <ul>
      <li><strong>佣金额度 (Commission Limit)</strong>：采用精确数值填写，表示该套餐认购后可释放的推广佣金上限。</li>
      <li><strong>买入比例与排队比例 (Buy & Queue Ratios)</strong>：买入比例转为活期 TROO 资产，排队比例进入锁仓排队池。</li>
      <li><strong>股票赠送比例 (Gifting Bonus)</strong>：针对高净值认购级别给予额外 TROO 赠送权重。</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue';
</script>
