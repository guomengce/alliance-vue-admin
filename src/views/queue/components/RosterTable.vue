<template>
  <el-table v-loading="loading" class="desktop-table queue-roster-table" :data="accounts" height="520">
    <el-table-column prop="memberId" label="锁仓归属代表 UID" width="150" />
    <el-table-column prop="lockedAmount" label="初始总额锁定 (U)" width="160">
      <template #default="{ row }">USDT {{ formatNumber(row.lockedAmount + row.unlockedAmount) }}</template>
    </el-table-column>
    <el-table-column prop="lockedAmount" label="仍排队锁定金 (U)" width="160">
      <template #default="{ row }">
        <span class="queue-roster-table__amount--amber">USDT {{ formatNumber(row.lockedAmount) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="unlockedAmount" label="已自动解�?(U)" width="160">
      <template #default="{ row }">
        <span class="queue-roster-table__amount--green">USDT {{ formatNumber(row.unlockedAmount) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="nextUnlockEstimate" label="累计触发次数" width="120">
      <template #default="{ row }">{{ row.nextUnlockEstimate > 0 ? `${row.nextUnlockEstimate} 次触发` : '-' }}</template>
    </el-table-column>
    <el-table-column label="穿透详情记�? width="120">
      <template #default="{ row }">
        <el-button link type="primary" @click="$emit('view', row)">记录详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
defineProps({
  loading: { type: Boolean, default: false },
  accounts: { type: Array, default: () => [] },
  formatNumber: { type: Function, required: true },
});

defineEmits(['view']);
</script>