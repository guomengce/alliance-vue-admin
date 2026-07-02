<template>
  <section class="plan-guide">
    <p>
      <el-icon><QuestionFilled /></el-icon>
      <span>理财配置及数值对算关系指南：</span>
    </p>
    <ul>
      <li><strong>佣金额度 (Commission Limit)</strong>：采用精确数值填写。该套餐被认购后，用户最大能够核扣获取的下线推广佣金绝对值。</li>
      <li><strong>买入比例与排队比例 (Buy & Queue Ratios)</strong>：买入比例直接转换为活期股票资产；排队比例将投入锁仓排队池排队交割。</li>
      <li><strong>股票赠送比例 (Gifting Bonus)</strong>：针对高净值认购级别给予的特殊贴息比例。</li>
    </ul>
  </section>
</template>

<script setup>
import { QuestionFilled } from '@element-plus/icons-vue';
</script>
