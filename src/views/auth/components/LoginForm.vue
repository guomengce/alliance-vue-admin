<template>
  <div>
    <div class="auth-form-header">
      <h2>账户安全登录</h2>
      <el-tag class="auth-badge" effect="plain">智能识别模式</el-tag>
    </div>

    <el-form class="auth-form" label-position="top" @submit.prevent="$emit('login')">
      <el-form-item label="登录邮箱">
        <el-input
          :model-value="email"
          placeholder="请输入您的邮箱"
          :prefix-icon="Message"
          @update:model-value="$emit('update:email', String($event))"
        />
      </el-form-item>

      <el-form-item label="访问密码">
        <el-input
          :model-value="password"
          placeholder="访问口令"
          :prefix-icon="Lock"
          show-password
          @update:model-value="$emit('update:password', String($event))"
        />
      </el-form-item>

      <div class="auth-options">
        <el-checkbox :model-value="remember" @update:model-value="$emit('update:remember', Boolean($event))">
          记住密码
        </el-checkbox>
      </div>

      <el-button class="auth-primary" type="primary" native-type="submit">立即登录</el-button>
    </el-form>

    <div class="auth-divider"><span>安全加密访问</span></div>
  </div>
</template>

<script setup lang="ts">
import { Lock, Message } from '@element-plus/icons-vue';

defineProps({
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  remember: { type: Boolean, default: false },
});

defineEmits<{
  'update:email': [value: string];
  'update:password': [value: string];
  'update:remember': [value: boolean];
  login: [];
}>();
</script>
