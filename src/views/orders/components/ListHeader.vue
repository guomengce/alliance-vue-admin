<template>
  <div class="order-list-header">
    <div class="order-list-header__filters">
      <SearchBox v-model="filters.keyword" placeholder="订单号 / 会员UID / 会员昵称" />
      <el-select v-model="filters.status" clearable placeholder="状态" style="width: 130px">
        <el-option label="全部" value="" />
        <el-option label="待审核入账" value="pending" />
        <el-option label="完成/已交割" value="paid" />
        <el-option label="已中止作废" value="cancelled" />
        <el-option label="失败" value="failed" />
        <el-option label="已退款" value="refunded" />
      </el-select>
    </div>
    <div class="order-list-header__actions">
      <el-button type="primary" :icon="Download" @click="handleExport">导出</el-button>
      <el-button :icon="Refresh" @click="$emit('refresh')">刷新</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, Refresh } from '@element-plus/icons-vue';
import SearchBox from '../../shared/SearchBox.vue';

defineProps({
  filters: { type: Object, required: true },
});

defineEmits(['refresh', 'export']);

function handleExport() {
  alert('导出功能开发中');
}
</script>
