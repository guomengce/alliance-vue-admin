<template>
  <div v-loading="loading" class="settlement-table-shell">
    <table class="settlement-native-table">
      <thead>
        <tr>
          <th class="settlement-col-member">同盟代表昵称/邮箱</th>
          <th class="settlement-col-money">日常待派 (U)</th>
          <th class="settlement-col-money">仍剩推荐包额度</th>
          <th class="settlement-col-money settlement-col-money--green">应剥拨付可用 (U)</th>
          <th class="settlement-col-money settlement-col-money--amber">溢出截流拦截</th>
          <th class="settlement-col-status">转账结果标识</th>
          <th class="settlement-col-action">风控预案</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="settlement in settlements" :key="settlement.id" :class="{ 'settlement-native-table__warning-row': hasWarning(settlement) }">
          <td>
            <p class="settlement-native-table__name">{{ getRepresentativeName(settlement) }}</p>
            <p class="settlement-native-table__meta">{{ getRepresentativeEmail(settlement) }}</p>
          </td>
          <td class="settlement-native-table__amount">USDT {{ formatNumber(settlement.commissionAmount) }}</td>
          <td class="settlement-native-table__amount" :class="{ 'settlement-native-table__amount--danger': getPoolCapacity(settlement) <= 0 }">
            USDT {{ formatNumber(Math.max(getPoolCapacity(settlement), 0)) }}
          </td>
          <td class="settlement-native-table__amount settlement-native-table__amount--green">
            USDT {{ formatNumber(getActualAmount(settlement)) }}
          </td>
          <td class="settlement-native-table__amount settlement-native-table__amount--amber">
            USDT {{ formatNumber(settlement.overflowAmount) }}
          </td>
          <td class="settlement-native-table__status">
            <StatusPill :text="getStatusText(settlement.status)" :tone="getStatusTone(settlement.status)" />
          </td>
          <td class="settlement-native-table__action">
            <button type="button" @click="$emit('view', settlement)">穿透诊断</button>
          </td>
        </tr>
        <tr v-if="!settlements.length && !loading">
          <td class="settlement-native-table__empty" colspan="7">暂无结算队列记录</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';

defineProps<{
  loading?: boolean;
  settlements: any[];
  formatNumber: (value: unknown) => string;
  getStatusText: (status: string) => string;
  getStatusTone: (status: string) => string;
}>();

defineEmits<{ view: [settlement: any] }>();

function getPoolCapacity(settlement: any) {
  return Number(settlement.poolCapacity ?? settlement.commissionAmount ?? 0);
}

function getActualAmount(settlement: any) {
  return Number(settlement.actualAmount ?? Math.max(settlement.commissionAmount - settlement.overflowAmount, 0));
}

function hasWarning(settlement: any) {
  return settlement.overflowAmount > 0 || getPoolCapacity(settlement) < 500 || settlement.status === 'failed';
}

function getRepresentativeName(settlement: any) {
  return settlement.memberName || `结算节点 ${settlement.id}`;
}

function getRepresentativeEmail(settlement: any) {
  return settlement.contactEmail || `${String(settlement.id || 'settlement').toLowerCase()}@audit.local`;
}
</script>
