<template>
  <div>
    <FormTitle title="找回访问密码" @back="$emit('back')" />
    <el-form class="auth-form" label-position="top" @submit.prevent>
      <el-form-item label="注册邮箱">
        <el-input v-model="form.email" :prefix-icon="Message" placeholder="输入您的注册邮箱" />
      </el-form-item>
      <el-button class="auth-primary" type="primary" @click="$emit('submit', { ...form })">发送验证码</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Message } from '@element-plus/icons-vue';
import FormTitle from './FormTitle.vue';

defineEmits(['submit', 'back']);

const form = reactive({ email: 'admin@alliance.system' });
</script>
