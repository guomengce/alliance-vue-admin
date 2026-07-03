<template>
  <div v-loading="loading" class="commission-table-shell">
    <table class="commission-native-table">
      <colgroup>
        <col class="commission-col-id" />
        <col class="commission-col-level" />
        <col class="commission-col-agent" />
        <col class="commission-col-amount" />
        <col class="commission-col-status" />
        <col class="commission-col-action" />
      </colgroup>
      <thead>
        <tr>
          <th>佣金号 / 关联号</th>
          <th>级别</th>
          <th>代理人 / UID</th>
          <th>分配数值 (USDT)</th>
          <th>到账核算状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in commissions" :key="row.id" :class="{ 'commission-native-table__warning-row': isWarning(row) }">
          <td>
            <div class="commission-native-table__id">
              <strong>{{ row.id }}</strong>
              <span>源: {{ row.orderId || row.sourceOrderId || '无关联订单' }}</span>
            </div>
          </td>
          <td>
            <span v-if="getLevel(row)" class="commission-native-table__level">L{{ getLevel(row) }}代</span>
            <span v-else class="commission-native-table__muted">-</span>
          </td>
          <td>
            <div class="commission-native-table__agent">
              <strong>{{ row.memberName || '未命名代理' }}</strong>
              <span>{{ row.memberId || '-' }}</span>
            </div>
          </td>
          <td>
            <span :class="['commission-table__amount', { 'commission-table__amount--danger': row.status === 'intercepted' || row.status === 'failed' }]">
              USDT {{ formatNumber(row.amount || row.overflowAmount) }}
            </span>
          </td>
          <td>
            <StatusPill :text="getStatusText(row.status)" :tone="getStatusTone(row.status)" :pulse="getStatusPulse(row.status)" />
          </td>
          <td>
            <button class="commission-native-table__link" type="button" @click="$emit('view', row)">查看详情</button>
          </td>
        </tr>
        <tr v-if="!commissions.length && !loading">
          <td class="commission-native-table__empty" colspan="6">
            <p>暂无符合当前过滤条件的佣金对账记录</p>
            <span>可以清空关键词或切换分类查看其它明细。</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';

defineProps({
  loading: { type: Boolean, default: false },
  commissions: { type: Array as () => any[], default: () => [] },
  formatNumber: { type: Function, required: true },
  getStatusText: { type: Function, required: true },
  getStatusTone: { type: Function, required: true },
  getStatusPulse: { type: Function, required: true },
});

defineEmits(['view']);

function getLevel(row: any) {
  return row.level || row.tierLevel || row.generation || '';
}

function isWarning(row: any) {
  return row.status === 'pool_insufficient' || row.status === 'failed' || row.status === 'intercepted';
}
</script>
