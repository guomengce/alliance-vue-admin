<template>
  <div class="settlement-capacity-warning">
    <div class="settlement-capacity-warning__icon">
      <WarningFilled />
    </div>
    <div class="settlement-capacity-warning__content">
      <h4>额度不足警报</h4>
      <p>当前结算批次中存在 {{ count }} 笔佣金因代理佣金池余额不足而被拦截，相关资金已自动归集至平台准备金账户。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue';

defineProps({
  count: { type: Number, default: 0 },
});
</script>
