<template>
  <el-table v-loading="loading" class="desktop-table order-table" :data="orders" height="520">
    <el-table-column prop="id" label="订单编号 (Tx ID)" width="170" />
    <el-table-column prop="memberId" label="会员 UID" width="120" />
    <el-table-column prop="packageName" label="认购理财规格" width="140" />
    <el-table-column prop="amount" label="认购金额" width="140">
      <template #default="{ row }">
        <span class="order-table__amount">USDT {{ formatNumber(row.amount) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="paidAt" label="到账结算时间" width="160" />
    <el-table-column label="状态说明" width="130">
      <template #default="{ row }">
        <StatusPill :text="getStatusText(row.status)" :tone="getStatusTone(row.status)" :pulse="row.status === 'pending'" />
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template #default="{ row }">
        <el-button link type="primary" @click="$emit('view', row)">查看详情</el-button>
      </template>
    </el-table-column>
    <el-table-column label="审核处理" width="140">
      <template #default="{ row }">
        <template v-if="row.status === 'pending'">
          <el-button size="small" type="success" @click="$emit('confirm', row.id)">确认到账</el-button>
          <el-button size="small" type="danger" @click="$emit('reject', row.id)">驳回</el-button>
        </template>
        <span v-else class="order-table__processed">已处理</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';

defineProps({
  loading: { type: Boolean, default: false },
  orders: { type: Array, default: () => [] },
  formatNumber: { type: Function, required: true },
  getStatusText: { type: Function, required: true },
  getStatusTone: { type: Function, required: true },
});

defineEmits(['view', 'confirm', 'reject']);
</script>
