<template>
  <el-container class="admin-shell">
    <el-aside class="admin-shell__sider" width="280px">
      <BrandBlock />
      <AdminMenu :items="navItems" :active-path="activePath" @navigate="go" />
    </el-aside>

    <el-container class="admin-shell__main">
      <el-header class="admin-shell__header">
        <div class="admin-shell__route-pill">
          <el-icon><CircleCheckFilled /></el-icon>
          管理后台 · {{ currentTitle }}
        </div>

        <div class="admin-shell__actions">
          <el-button class="admin-shell__icon-button mobile-menu-button" :icon="Menu" circle @click="drawerVisible = true" />
          <el-dropdown trigger="click">
            <el-button class="admin-shell__icon-button">
              <el-icon><Connection /></el-icon>
              <span>CN</span>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>简体中文</el-dropdown-item>
                <el-dropdown-item>English</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button class="admin-shell__profile-button" @click="go('/admin/profile')">
            <span class="admin-shell__profile-copy">
              <strong>Alliance Admin</strong>
              <span>UID: A-0001</span>
            </span>
            <el-avatar :size="30" class="admin-shell__avatar">A</el-avatar>
          </el-button>
        </div>
      </el-header>

      <el-main class="admin-shell__content">
        <router-view />
      </el-main>
    </el-container>

    <el-drawer v-model="drawerVisible" class="admin-drawer" direction="ltr" :size="280" :with-header="false">
      <div class="drawer-brand-row">
        <BrandBlock />
        <el-button :icon="Close" text circle @click="drawerVisible = false" />
      </div>
      <AdminMenu :items="navItems" :active-path="activePath" @navigate="go" />
    </el-drawer>
  </el-container>
</template>

<script setup lang="ts">
import {
  Bell,
  Calendar,
  CircleCheckFilled,
  Close,
  Coin,
  Connection,
  DataAnalysis,
  Document,
  Files,
  Lock,
  Menu,
  Money,
  Operation,
  Setting,
  User,
  Wallet,
} from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminMenu from './components/AdminMenu.vue';
import BrandBlock from './components/BrandBlock.vue';

const route = useRoute();
const router = useRouter();
const drawerVisible = ref(false);

const navItems = [
  { path: '/admin/dashboard', label: '仪表盘', icon: DataAnalysis },
  { path: '/admin/users', label: '用户管理', icon: User },
  { path: '/admin/plans', label: '套餐管理', icon: Operation },
  { path: '/admin/orders', label: '订单管理', icon: Document },
  { path: '/admin/commissions', label: '佣金管理', icon: Coin },
  { path: '/admin/queue', label: '排队管理', icon: Lock },
  { path: '/admin/settlement', label: '结算管理', icon: Calendar },
  { path: '/admin/finance', label: '财务管理', icon: Money },
  { path: '/admin/parameters', label: '参数配置', icon: Setting },
  { path: '/admin/broadcast', label: '通知管理', icon: Bell },
  { path: '/admin/rbac', label: '权限管理', icon: Wallet },
  { path: '/admin/reports', label: '数据报表', icon: Files },
  { path: '/admin/logs', label: '日志管理', icon: Connection },
];
const routeTitleItems = [
  ...navItems,
  { path: '/admin/profile', label: '个人安全中心' },
];

const activePath = computed(() => {
  const match = navItems.find((item) => route.path === item.path || route.path.startsWith(`${item.path}/`));
  return match?.path || '';
});
const currentTitle = computed(() => {
  const match = routeTitleItems.find((item) => route.path === item.path || route.path.startsWith(`${item.path}/`));
  return match?.label || '仪表盘';
});

function go(path) {
  drawerVisible.value = false;
  router.push(path);
}
</script>

<style scoped lang="scss">
.drawer-brand-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;

  :deep(.admin-shell__brand) {
    margin-bottom: 0;
    padding: 0;
  }
}

.mobile-menu-button {
  display: none;
}

@media (max-width: 900px) {
  .mobile-menu-button {
    display: inline-flex;
  }
}
</style>
