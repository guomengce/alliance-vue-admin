<template>
  <div v-loading="loading" class="order-table-shell">
    <table class="order-native-table">
      <colgroup>
        <col class="order-col-id" />
        <col class="order-col-member" />
        <col class="order-col-package" />
        <col class="order-col-amount" />
        <col class="order-col-time" />
        <col class="order-col-status" />
        <col class="order-col-action" />
        <col class="order-col-review" />
      </colgroup>
      <thead>
        <tr>
          <th>订单编号 (Tx ID)</th>
          <th>会员 UID</th>
          <th>认购理财规格</th>
          <th>认购金额</th>
          <th>到账结算时间</th>
          <th>状态说明</th>
          <th>操作</th>
          <th>审核处理</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in orders" :key="row.id">
          <td class="order-native-table__id">{{ row.id }}</td>
          <td>{{ row.memberId }}</td>
          <td>{{ row.packageName }}</td>
          <td>
            <span class="order-table__amount">USDT {{ formatNumber(row.amount) }}</span>
          </td>
          <td>{{ row.paidAt || '-' }}</td>
          <td>
            <StatusPill :text="getStatusText(row.status)" :tone="getStatusTone(row.status)" :pulse="row.status === 'pending'" />
          </td>
          <td>
            <button class="order-native-table__link" type="button" @click="$emit('view', row)">查看详情</button>
          </td>
          <td>
            <div v-if="row.status === 'pending'" class="order-native-table__actions">
              <el-button size="small" type="success" @click="$emit('confirm', row.id)">确认到账</el-button>
              <el-button size="small" type="danger" @click="$emit('reject', row.id)">驳回</el-button>
            </div>
            <span v-else class="order-table__processed">已处理</span>
          </td>
        </tr>
        <tr v-if="!orders.length">
          <td class="order-native-table__empty" colspan="8">暂无订单记录</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';

defineProps({
  loading: { type: Boolean, default: false },
  orders: { type: Array as () => any[], default: () => [] },
  formatNumber: { type: Function, required: true },
  getStatusText: { type: Function, required: true },
  getStatusTone: { type: Function, required: true },
});

defineEmits(['view', 'confirm', 'reject']);
</script>
