<template>
  <main class="auth-page">
    <div class="auth-bg" aria-hidden="true">
      <div class="auth-bg__image" />
      <div class="auth-bg__veil" />
      <div class="auth-bg__grid" />
      <div class="auth-bg__glow auth-bg__glow--left" />
      <div class="auth-bg__glow auth-bg__glow--right" />
    </div>

    <section class="auth-shell">
      <BrandHeader />

      <el-card class="auth-card" shadow="never">
        <el-alert
          v-if="message"
          :title="message"
          :type="messageType"
          show-icon
          class="auth-alert"
          @close="message = ''"
        />

        <LoginForm
          v-model:email="loginForm.email"
          v-model:password="loginForm.password"
          v-model:remember="loginForm.remember"
          @login="submitLogin"
        />
      </el-card>

      <FooterInfo />
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import BrandHeader from './components/BrandHeader.vue';
import FooterInfo from './components/FooterInfo.vue';
import LoginForm from './components/LoginForm.vue';

const router = useRouter();
const message = ref('');
const messageType = ref<'success' | 'error' | 'warning' | 'info'>('success');
const loginForm = reactive({
  email: 'admin@alliance.system',
  password: '123456',
  remember: true,
});

function notify(text: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') {
  message.value = text;
  messageType.value = type;
}

function submitLogin() {
  const email = loginForm.email.trim();
  if (!email || !email.includes('@')) {
    notify('请输入合法的系统安全登录邮箱账号', 'error');
    return;
  }

  if (!loginForm.password || loginForm.password.length < 4) {
    notify('系统访问口令长度不足，请重新输入', 'error');
    return;
  }

  notify('认证成功，正在进入管理后台');
  router.push('/admin/dashboard');
}
</script>
