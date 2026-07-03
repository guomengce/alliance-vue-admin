<template>
  <div class="commission-mobile-list">
    <article
      v-for="commission in commissions"
      :key="commission.id"
      class="commission-mobile-card"
      :class="{ 'commission-mobile-card--warning': isWarning(commission) }"
    >
      <div class="commission-mobile-card__header">
        <div>
          <strong>{{ commission.id }}</strong>
          <span>源: {{ commission.orderId || '无关联订单' }}</span>
        </div>
        <span class="commission-native-table__level">L{{ commission.level || commission.tierLevel || commission.generation || '-' }}代</span>
      </div>

      <div class="commission-mobile-card__fields">
        <div>
          <span>代理人 UID</span>
          <strong>{{ commission.memberId || '-' }}</strong>
          <em>{{ commission.memberName || '未命名代理' }}</em>
        </div>
        <div>
          <span>{{ commission.status === 'intercepted' ? '拦截回笼额度' : '核算本轮佣金' }}</span>
          <strong :class="{ 'commission-mobile-card__amount--danger': commission.status === 'intercepted' || commission.status === 'failed' }">
            USDT {{ formatNumber(commission.amount || commission.overflowAmount) }}
          </strong>
        </div>
      </div>

      <div class="commission-mobile-card__actions">
        <StatusPill :text="getStatusText(commission.status)" :tone="getStatusTone(commission.status)" />
        <el-button size="small" @click="$emit('view', commission)">查看</el-button>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';

defineProps<{
  commissions: any[];
  formatNumber: (v: any) => string;
  getStatusText: (s: string) => string;
  getStatusTone: (s: string) => string;
}>();

defineEmits<{ view: [commission: any] }>();

function isWarning(commission: any) {
  return commission.status === 'pool_insufficient' || commission.status === 'failed' || commission.status === 'intercepted';
}
</script>
