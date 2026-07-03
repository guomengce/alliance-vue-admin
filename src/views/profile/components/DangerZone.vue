<template>
  <el-card class="alliance-card danger-zone" shadow="never">
    <template #header>安全操作</template>
    <p>退出后需要重新通过安全登录进入管理后台</p>
    <el-button type="danger" plain @click="$emit('logout')">退出登录</el-button>
  </el-card>
</template>

<script setup lang="ts">
defineEmits<{
  logout: [];
}>();
</script>
