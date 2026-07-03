<template>
  <div class="settlement-guide">
    <div class="settlement-guide__steps">
      <h4>D+1 转账时序规则及防透支干预 (Workflow Guide)</h4>
      <div class="settlement-guide-grid">
        <div class="settlement-guide-grid__item">
          <div class="settlement-guide-grid__header">
            <Timer />
            <span>1. D+1 日常轮巡对账</span>
          </div>
          <p>以 24 点日切、次日 04:00 起息派发。将前日待核算佣金扣除溢流部分后拨入可用余额钱包。</p>
        </div>
        <div class="settlement-guide-grid__item">
          <div class="settlement-guide-grid__header settlement-guide-grid__header--amber">
            <WarningFilled />
            <span>2. 额度匮乏拦截 (溢流)</span>
          </div>
          <p>当预期派发额高于仍可用额度时，超额部分自动强制归集至平台 Reserve 库中。</p>
        </div>
        <div class="settlement-guide-grid__item">
          <div class="settlement-guide-grid__header settlement-guide-grid__header--green">
            <Tools />
            <span>3. 手动风控干预</span>
          </div>
          <p>支持管理层一键人工补发拨付、下发枯竭邮件并调整多节点异常挂账。</p>
        </div>
      </div>
    </div>

    <div class="settlement-audit-card">
      <p>大盘结算实时审计 (AUDIT)</p>
      <div>
        <span>涉及预拨总佣金:</span>
        <strong>{{ formatAmount(projectedCommissions) }} U</strong>
      </div>
      <div>
        <span>累计限制溢截流:</span>
        <strong class="settlement-audit-card__amber">{{ formatAmount(totalClipped) }} U</strong>
      </div>
      <div>
        <span>精算预言机状态:</span>
        <strong class="settlement-audit-card__green">完全正常 / 实时同步中</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timer, Tools, WarningFilled } from '@element-plus/icons-vue';

defineProps<{
  projectedCommissions: number;
  totalClipped: number;
}>();

function formatAmount(value: number) {
  return Number(value || 0).toLocaleString();
}
</script>
