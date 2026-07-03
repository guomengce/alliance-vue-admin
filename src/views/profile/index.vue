<template>
  <AdminPage
    title="个人安全中心"
    description="维护当前管理员资料、登录密码和安全会话状态"
  >
    <section class="profile-grid">
      <ProfileBanner />
      <ProfileForm :profile="profile" @save="saveProfile" />
      <PasswordForm :form="passwordForm" @save="savePassword" />
      <DangerZone @logout="logout" />
    </section>
  </AdminPage>
</template>

<script setup lang="ts">
import AdminPage from '../shared/AdminPage.vue';
import DangerZone from './components/DangerZone.vue';
import PasswordForm from './components/PasswordForm.vue';
import ProfileBanner from './components/ProfileBanner.vue';
import ProfileForm from './components/ProfileForm.vue';
import { useProfile } from './composables/useProfile';

const {
  profile,
  passwordForm,
  saveProfile,
  savePassword,
  logout,
} = useProfile();
</script>
