<template>
  <el-card class="alliance-card profile-card" shadow="never">
    <template #header>修改密码</template>
    <el-form :model="form" label-width="90px">
      <el-form-item label="旧密码"><el-input v-model="form.oldPassword" show-password /></el-form-item>
      <el-form-item label="新密码"><el-input v-model="form.newPassword" show-password /></el-form-item>
      <el-form-item label="确认密码"><el-input v-model="form.confirmPassword" show-password /></el-form-item>
      <el-form-item><el-button type="primary" @click="$emit('save')">更新密码</el-button></el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import type { PasswordForm } from '../composables/useProfile';

defineProps<{
  form: PasswordForm;
}>();

defineEmits<{
  save: [];
}>();
</script>
