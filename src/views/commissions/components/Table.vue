<template>
  <el-table v-loading="loading" class="desktop-table commission-table" :data="commissions" height="520">
    <el-table-column prop="id" label="佣金号 / 关联单" width="170" />
    <el-table-column label="级别" width="80">
      <template #default="{ row }">
        <el-tag v-if="row.level" type="primary" size="small">L{{ row.level }}</el-tag>
        <span v-else>-</span>
      </template>
    </el-table-column>
    <el-table-column prop="memberName" label="代理人 / UID" width="150">
      <template #default="{ row }">
        <div>
          <span>{{ row.memberName }}</span>
          <span class="commission-table__uid">{{ row.memberId }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="分配数额 (USDT)" width="140">
      <template #default="{ row }">
        <span class="commission-table__amount">USDT {{ formatNumber(row.amount || row.overflowAmount) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="到账状态" width="130">
      <template #default="{ row }">
        <StatusPill :text="getStatusText(row.status)" :tone="getStatusTone(row.status)" :pulse="getStatusPulse(row.status)" />
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template #default="{ row }">
        <el-button link type="primary" @click="$emit('view', row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';

defineProps({
  loading: { type: Boolean, default: false },
  commissions: { type: Array, default: () => [] },
  formatNumber: { type: Function, required: true },
  getStatusText: { type: Function, required: true },
  getStatusTone: { type: Function, required: true },
  getStatusPulse: { type: Function, required: true },
});

defineEmits(['view']);
</script>
