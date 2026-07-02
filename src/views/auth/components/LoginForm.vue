<template>
  <div>
    <div class="auth-form-header">
      <h2>账户安全登录</h2>
      <el-tag class="auth-badge" effect="plain">智能识别模式</el-tag>
    </div>

    <el-form class="auth-form" label-position="top" @submit.prevent>
      <el-form-item label="注册邮箱">
        <el-input :model-value="email" placeholder="输入您的注册邮箱" :prefix-icon="Message" @update:model-value="$emit('update:email', $event)" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input :model-value="password" placeholder="输入您的密码" :prefix-icon="Lock" show-password @update:model-value="$emit('update:password', $event)" />
      </el-form-item>

      <div class="auth-options">
        <el-checkbox>记住密码</el-checkbox>
        <el-button link @click="$emit('forgot')">忘记密码?</el-button>
      </div>

      <el-button class="auth-primary" type="primary" native-type="submit" @click="$emit('login')">立即登录</el-button>
    </el-form>

    <div class="auth-divider"><span>安全加密访问</span></div>
    <p class="auth-bottom">还没有账户？<el-button link @click="$emit('register')">立即注册</el-button></p>
  </div>
</template>

<script setup>
import { Lock, Message } from '@element-plus/icons-vue';

defineEmits(['update:email', 'update:password', 'login', 'forgot', 'register']);

defineProps({
  email: { type: String, default: '' },
  password: { type: String, default: '' },
});
</script>
