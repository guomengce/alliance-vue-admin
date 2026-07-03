<template>
  <div v-loading="loading" class="queue-roster-table-shell">
    <table class="queue-native-table">
      <colgroup>
        <col class="queue-col-owner" />
        <col class="queue-col-original" />
        <col class="queue-col-current" />
        <col class="queue-col-unlocked" />
        <col class="queue-col-trigger" />
        <col class="queue-col-action" />
      </colgroup>
      <thead>
        <tr>
          <th>锁仓归属代表 UID</th>
          <th>初始总额锁定 (U)</th>
          <th>仍排队锁定金额 (U)</th>
          <th>已自动解锁 (U)</th>
          <th>累计触发次数</th>
          <th>穿透详情记录</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in accounts" :key="row.id">
          <td>
            <div class="queue-native-table__owner">
              <strong>{{ row.memberId }}</strong>
              <span>{{ row.memberName || '未命名会员' }}</span>
            </div>
          </td>
          <td class="queue-native-table__mono">USDT {{ formatNumber(getOriginalAmount(row)) }}</td>
          <td>
            <span class="queue-roster-table__amount--amber">USDT {{ formatNumber(row.lockedAmount) }}</span>
          </td>
          <td>
            <span class="queue-roster-table__amount--green">USDT {{ formatNumber(row.unlockedAmount) }}</span>
          </td>
          <td>
            <span class="queue-native-table__trigger">{{ row.triggerCount || 0 }} 次触发</span>
          </td>
          <td>
            <button class="queue-native-table__link" type="button" @click="$emit('view', row)">记录详情</button>
          </td>
        </tr>
        <tr v-if="!accounts.length">
          <td class="queue-native-table__empty" colspan="6">暂无排队锁仓记录</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading: { type: Boolean, default: false },
  accounts: { type: Array as () => any[], default: () => [] },
  formatNumber: { type: Function, required: true },
});

defineEmits(['view']);

function getOriginalAmount(row: any) {
  return Number(row.initialLockedAmount ?? Number(row.lockedAmount || 0) + Number(row.unlockedAmount || 0));
}
</script>
