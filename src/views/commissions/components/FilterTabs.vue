<template>
  <div class="commission-filter-tabs">
    <SearchBox v-model="filters.keyword" placeholder="搜索佣金号 / 订单号 / 会员UID / 代理人昵称..." />
    <div class="commission-filter-tabs__chips">
      <el-tag
        v-for="tab in tabs"
        :key="tab.value"
        :class="{ 'commission-filter-tabs__chip--active': filters.tab === tab.value }"
        @click="filters.tab = tab.value"
      >
        {{ tab.label }}
      </el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBox from '../../shared/SearchBox.vue';

defineProps({
  filters: { type: Object, required: true },
});

const tabs = [
  { label: '全部明细', value: 'all' },
  { label: '已入池划账', value: 'credited' },
  { label: '额度池阻塞', value: 'pool_insufficient' },
  { label: '受阻拦截回笼', value: 'intercepted' },
];
</script>
