<template>
  <AdminPage title="个人安全中心" description="维护当前管理员资料、登录密码和安全会话状态。">
    <div class="profile-grid">
      <el-card class="alliance-card profile-banner" shadow="never">
        <div class="profile-avatar">A</div>
        <div>
          <h3>Alliance Admin</h3>
          <p>SUPER_ADMIN · UID A-0001</p>
          <el-tag type="success" effect="plain">安全会话中</el-tag>
        </div>
      </el-card>

      <el-card class="alliance-card" shadow="never">
        <template #header>基础资料</template>
        <el-form :model="profile" label-width="90px">
          <el-form-item label="昵称"><el-input v-model="profile.nickname" /></el-form-item>
          <el-form-item label="邮箱"><el-input v-model="profile.email" /></el-form-item>
          <el-form-item label="手机号"><el-input v-model="profile.phone" /></el-form-item>
          <el-form-item><el-button type="primary" @click="saveProfile">保存资料</el-button></el-form-item>
        </el-form>
      </el-card>

      <el-card class="alliance-card" shadow="never">
        <template #header>修改密码</template>
        <el-form :model="passwordForm" label-width="90px">
          <el-form-item label="旧密码"><el-input v-model="passwordForm.oldPassword" show-password /></el-form-item>
          <el-form-item label="新密码"><el-input v-model="passwordForm.newPassword" show-password /></el-form-item>
          <el-form-item label="确认密码"><el-input v-model="passwordForm.confirmPassword" show-password /></el-form-item>
          <el-form-item><el-button type="primary" @click="savePassword">更新密码</el-button></el-form-item>
        </el-form>
      </el-card>

      <el-card class="alliance-card danger-zone" shadow="never">
        <template #header>安全操作</template>
        <p>退出后需要重新通过安全登录进入管理后台。</p>
        <el-button type="danger" plain @click="logout">退出登录</el-button>
      </el-card>
    </div>
  </AdminPage>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import AdminPage from '../shared/AdminPage.vue';

const router = useRouter();
const profile = reactive({ nickname: 'Alliance Admin', email: 'admin@alliance.system', phone: '+65 9000 0000' });
const passwordForm = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' });

function saveProfile() {
  ElMessage.success('资料已保存');
}

function savePassword() {
  ElMessage.success('密码已更新');
  passwordForm.oldPassword = '';
  passwordForm.newPassword = '';
  passwordForm.confirmPassword = '';
}

function logout() {
  router.push('/login');
}
</script>

<style scoped lang="scss">
.profile-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
}

.profile-banner {
  grid-column: 1 / -1;

  :deep(.el-card__body) {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  h3 {
    margin: 0;
    color: #fff;
    font-size: 22px;
  }

  p {
    margin: 6px 0 12px;
    color: var(--alliance-muted);
  }
}

.profile-avatar {
  width: 70px;
  height: 70px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, #6750a4, #cfbcff);
  color: #fff;
  font-size: 28px;
  font-weight: 900;
}

.danger-zone p {
  margin-top: 0;
  color: var(--alliance-muted);
}

@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
