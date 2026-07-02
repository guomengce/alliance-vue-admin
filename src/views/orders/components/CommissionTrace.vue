<template>
  <el-card class="alliance-card order-commission-trace" shadow="never">
    <template #header>佣金分拨明细</template>
    <el-table class="desktop-table" :data="order.commissionAllocations" height="240">
      <el-table-column label="层级" width="80">
        <template #default="{ row }">L{{ row.level }}</template>
      </el-table-column>
      <el-table-column prop="memberId" label="代理�?UID" width="120" />
      <el-table-column prop="memberName" label="代理�? />
      <el-table-column label="分润比例" width="100">
        <template #default="{ row }">{{ (row.rate * 100).toFixed(0) }}%</template>
      </el-table-column>
      <el-table-column label="分拨金额" width="140">
        <template #default="{ row }">USDT {{ formatNumber(row.amount) }}</template>
      </el-table-column>
    </el-table>
    <div class="order-commission-trace__mobile">
      <div v-for="(item, index) in order.commissionAllocations" :key="index" class="order-commission-trace__item">
        <div class="order-commission-trace__item-header">
          <span class="order-commission-trace__level">L{{ item.level }}</span>
          <span class="order-commission-trace__rate">{{ (item.rate * 100).toFixed(0) }}%</span>
        </div>
        <div class="order-commission-trace__item-body">
          <span>{{ item.memberName }}</span>
          <span class="order-commission-trace__amount">USDT {{ formatNumber(item.amount) }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
defineProps({
  order: { type: Object, required: true },
  formatNumber: { type: Function, required: true },
});
</script>