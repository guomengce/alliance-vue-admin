<template>
  <el-card class="alliance-card queue-trigger-history" shadow="never">
    <template #header>
      <div class="queue-trigger-history__header">
        <Connection />
        <span>直属下线购买套餐触发解锁日志记录 (TRIGGERS LIST)</span>
        <SearchBox v-model="searchKeyword" placeholder="输入UID、昵称、订单或触发ID查找..." />
      </div>
    </template>
    <el-table class="desktop-table" :data="filteredRecords" height="320">
      <el-table-column prop="id" label="单号/对账标识" width="140" />
      <el-table-column prop="sourceMemberName" label="一代直推下级" width="150" />
      <el-table-column prop="amount" label="下属认购总额" width="140">
        <template #default="{ row }">USDT {{ formatNumber(row.amount) }}</template>
      </el-table-column>
      <el-table-column label="结算释放 (10%)" width="130">
        <template #default="{ row }">
          <span class="queue-trigger-history__release">+{{ formatNumber(row.amount * 0.1) }} U</span>
        </template>
      </el-table-column>
      <el-table-column prop="unlockedAt" label="交割时间" width="160" />
    </el-table>
    <div class="queue-trigger-history__mobile">
      <div v-for="record in filteredRecords" :key="record.id" class="queue-trigger-history__item">
        <div class="queue-trigger-history__item-header">
          <span>{{ record.id }}</span>
          <span class="queue-trigger-history__release">+{{ formatNumber(record.amount * 0.1) }} U</span>
        </div>
        <div class="queue-trigger-history__item-body">
          <span>{{ record.sourceMemberName }}</span>
          <span>USDT {{ formatNumber(record.amount) }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Connection } from '@element-plus/icons-vue';
import SearchBox from '../../shared/SearchBox.vue';

const props = defineProps<{
  records: any[];
  formatNumber: (v: any) => string;
}>();

const searchKeyword = ref('');

const filteredRecords = computed(() => {
  const keyword = searchKeyword.value.toLowerCase();
  return props.records.filter((item) => {
    return !keyword || [item.id, item.sourceMemberId, item.sourceMemberName, item.sourceOrderId].some((field) => String(field).toLowerCase().includes(keyword));
  });
});
</script>
