<template>
  <div class="settlement-guide-grid">
    <div class="settlement-guide-grid__item">
      <div class="settlement-guide-grid__header">
        <Timer />
        <span>D+1 轧账时序规则</span>
      </div>
      <p>每日凌晨 03:00 系统自动执行日结任务，对前一工作日的所有交易订单进行佣金精算、排队解锁、溢漏回笼等全流程处理。</p>
    </div>
    <div class="settlement-guide-grid__item">
      <div class="settlement-guide-grid__header">
        <WarningFilled />
        <span>额度匮乏拦截</span>
      </div>
      <p>当代理佣金池余额不足以支付下级分销收益时，系统自动触发拦截机制，将溢出部分归集至平台准备金账户，并生成异常报告供人工复核。</p>
    </div>
    <div class="settlement-guide-grid__item">
      <div class="settlement-guide-grid__header">
        <Tools />
        <span>手动风控干预</span>
      </div>
      <p>运营团队可根据异常报告，对特定结算批次执行人工补发、强制轧账等操作，确保资金安全与业务连续性。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timer, Tools, WarningFilled } from '@element-plus/icons-vue';
</script>
