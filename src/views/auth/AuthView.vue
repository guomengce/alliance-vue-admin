<template>
  <main class="auth-page">
    <div class="auth-bg">
      <div class="auth-grid" />
      <div class="auth-glow auth-glow--left" />
      <div class="auth-glow auth-glow--right" />
    </div>

    <section class="auth-shell">
      <BrandHeader />

      <el-card class="auth-card" shadow="never">
        <el-alert v-if="message" :title="message" :type="messageType" show-icon class="auth-alert" @close="message = ''" />

        <LoginForm
          v-if="mode === 'login'"
          v-model:email="loginForm.email"
          v-model:password="loginForm.password"
          @login="submitLogin"
          @forgot="mode = 'forgot'"
          @register="mode = 'register'"
        />
        <RegisterForm v-else-if="mode === 'register'" @submit="submitRegister" @back="mode = 'login'" />
        <ForgotPasswordForm v-else-if="mode === 'forgot'" @submit="submitForgot" @back="mode = 'login'" />
        <ResetPasswordForm v-else @submit="submitReset" @back="mode = 'forgot'" />
      </el-card>

      <FooterInfo />
    </section>
  </main>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BrandHeader from './components/BrandHeader.vue';
import FooterInfo from './components/FooterInfo.vue';
import ForgotPasswordForm from './components/ForgotPasswordForm.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import ResetPasswordForm from './components/ResetPasswordForm.vue';

const route = useRoute();
const router = useRouter();
const mode = ref(route.meta.authMode || 'login');
const message = ref('');
const messageType = ref('success');
const loginForm = reactive({ email: 'admin@alliance.system', password: '123456' });

watch(() => route.meta.authMode, (next) => {
  mode.value = next || 'login';
});

function notify(text, type = 'success') {
  message.value = text;
  messageType.value = type;
}

function submitLogin() {
  notify('认证成功，正在进入管理后台');
  router.push('/admin/dashboard');
}

function submitRegister(values) {
  loginForm.email = values.email;
  notify('账户已创建，请使用新账户登录');
  mode.value = 'login';
}

function submitForgot(values) {
  notify(`验证码已发送至 ${values.email}`);
  mode.value = 'reset';
}

function submitReset() {
  notify('密码已重置，请重新登录');
  mode.value = 'login';
}
</script>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  position: relative;
  padding: 34px 18px 24px;
  background: #09070d;
}

.auth-bg,
.auth-grid,
.auth-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.auth-grid {
  background:
    linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 28px 28px;
}

.auth-glow {
  filter: blur(110px);
  opacity: 0.78;
}

.auth-glow--left {
  top: auto;
  right: 10%;
  bottom: -14%;
  left: -8%;
  background: linear-gradient(35deg, rgba(138, 78, 156, 0.28), rgba(78, 60, 156, 0.12), transparent);
}

.auth-glow--right {
  inset: 5% 4% auto auto;
  width: 350px;
  height: 350px;
  border-radius: 999px;
  background: rgba(103, 80, 164, 0.16);
}

.auth-shell {
  position: relative;
  z-index: 1;
  width: min(383px, 100%);
  display: grid;
  gap: 28px;
}

.auth-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  background: rgba(22, 19, 28, 0.9);
  backdrop-filter: blur(24px);

  :deep(.el-card__body) {
    padding: 31px 32px 30px;
  }
}

.auth-alert {
  margin-bottom: 20px;
}
</style>
