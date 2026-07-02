<template>
  <div>
    <FormTitle title="重置安全密码" @back="$emit('back')" />
    <el-form class="auth-form" label-position="top" @submit.prevent>
      <el-form-item label="验证码">
        <el-input v-model="form.code" class="auth-mono" placeholder="输入 6 位验证码" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.password" :prefix-icon="Lock" placeholder="设置新密码" show-password />
      </el-form-item>
      <el-button class="auth-primary" type="primary" @click="$emit('submit', { ...form })">确认重置</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Lock } from '@element-plus/icons-vue';
import FormTitle from './FormTitle.vue';

defineEmits(['submit', 'back']);

const form = reactive({ code: '', password: '' });
</script>
