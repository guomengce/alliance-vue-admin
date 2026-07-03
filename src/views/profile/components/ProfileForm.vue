<template>
  <el-card class="alliance-card profile-card" shadow="never">
    <template #header>基础资料</template>
    <el-form :model="profile" label-width="90px">
      <el-form-item label="昵称"><el-input v-model="profile.nickname" /></el-form-item>
      <el-form-item label="邮箱"><el-input v-model="profile.email" /></el-form-item>
      <el-form-item label="手机号"><el-input v-model="profile.phone" /></el-form-item>
      <el-form-item><el-button type="primary" @click="$emit('save')">保存资料</el-button></el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import type { AdminProfile } from '../composables/useProfile';

defineProps<{
  profile: AdminProfile;
}>();

defineEmits<{
  save: [];
}>();
</script>
