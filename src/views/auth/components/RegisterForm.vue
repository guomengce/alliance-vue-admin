<template>
  <div>
    <FormTitle title="注册新同盟账户" @back="$emit('back')" />
    <el-form class="auth-form" label-position="top" @submit.prevent>
      <el-form-item label="注册邮箱">
        <el-input v-model="form.email" :prefix-icon="Message" placeholder="输入您的注册邮箱" />
        <p class="auth-hint">* 邮箱地址必须是 <b>@alliance.system</b> 域名下的</p>
      </el-form-item>
      <el-form-item label="会员专属名称">
        <el-input v-model="form.nickname" :prefix-icon="User" placeholder="您的昵称" />
      </el-form-item>
      <el-form-item label="设置访问密码">
        <el-input v-model="form.password" :prefix-icon="Lock" placeholder="设置安全密码" show-password />
      </el-form-item>
      <el-form-item label="确认访问密码">
        <el-input v-model="form.confirmPassword" :prefix-icon="Lock" placeholder="再次确认安全密码" show-password />
      </el-form-item>
      <el-button class="auth-primary" type="primary" @click="$emit('submit', { ...form })">创建注册并自动登录</el-button>
    </el-form>
    <p class="auth-bottom">已有同盟账户？<el-button link @click="$emit('back')">返回登录</el-button></p>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Lock, Message, User } from '@element-plus/icons-vue';
import FormTitle from './FormTitle.vue';

defineEmits(['submit', 'back']);

const form = reactive({ email: '', nickname: '', password: '', confirmPassword: '' });
</script>
