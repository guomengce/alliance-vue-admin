<template>
  <div class="rbac-toolbar">
    <el-segmented v-model="activeTab" :options="options" />
    <el-input v-model="keyword" :prefix-icon="Search" clearable placeholder="搜索账号 / 邮箱 / 角色..." />
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import type { RbacTab } from '../composables/useRbac';

defineProps<{
  options: Array<{ label: string; value: string }>;
}>();

const activeTab = defineModel<RbacTab>('activeTab', { required: true });
const keyword = defineModel<string>('keyword', { required: true });
</script>
