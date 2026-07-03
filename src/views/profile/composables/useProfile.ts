import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export interface AdminProfile {
  nickname: string;
  email: string;
  phone: string;
}

export interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useProfile() {
  const router = useRouter();
  const profile = reactive<AdminProfile>({
    nickname: 'Alliance Admin',
    email: 'admin@alliance.system',
    phone: '+65 9000 0000',
  });
  const passwordForm = reactive<PasswordForm>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  function saveProfile() {
    ElMessage.success('资料已保存');
  }

  function savePassword() {
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      ElMessage.warning('请填写完整密码信息');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      ElMessage.warning('两次输入的新密码不一致');
      return;
    }
    ElMessage.success('密码已更新');
    passwordForm.oldPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
  }

  function logout() {
    router.push('/login');
  }

  return {
    profile,
    passwordForm,
    saveProfile,
    savePassword,
    logout,
  };
}
