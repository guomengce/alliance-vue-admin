<template>
  <AdminPage
    title="权限管理"
    description="管理后台角色、权限矩阵和运营账号启停状态，确保核心后台入口最小授权。"
  >
    <template #actions>
      <el-button :icon="Plus" type="primary" @click="accountDialogVisible = true">新增账号</el-button>
      <el-button :icon="Key" @click="roleDialogVisible = true">新增角色</el-button>
    </template>

    <KpiGrid :items="kpis" />

    <section class="rbac-view">
      <RbacToolbar v-model:active-tab="activeTab" v-model:keyword="keyword" :options="tabOptions" />

      <div v-if="activeTab === 'accounts'" class="rbac-grid">
        <AccountTable
          :accounts="filteredAccounts"
          :get-status-text="getStatusText"
          :get-status-tone="getStatusTone"
          @edit="openEdit"
          @toggle="toggleAccount"
        />

        <RoleCoverageCard
          v-model:selected-role-code="selectedRoleCode"
          :roles="roles"
          :permission-count="permissionInventory.length"
          :get-role-coverage="getRoleCoverage"
        />
      </div>

      <PermissionMatrix
        v-else
        :selected-role="selectedRole"
        :permissions="permissionInventory"
        @toggle="togglePermission"
      />
    </section>

    <AccountDialog
      v-model="accountDialogVisible"
      :draft="draftAccount"
      :roles="roles"
      @create="createAccount"
    />

    <RoleDialog
      v-model="roleDialogVisible"
      :draft="draftRole"
      @create="createRole"
    />
  </AdminPage>
</template>

<script setup lang="ts">
import { Key, Plus } from '@element-plus/icons-vue';
import AdminPage from '../shared/AdminPage.vue';
import KpiGrid from '../shared/KpiGrid.vue';
import AccountDialog from './components/AccountDialog.vue';
import AccountTable from './components/AccountTable.vue';
import PermissionMatrix from './components/PermissionMatrix.vue';
import RbacToolbar from './components/RbacToolbar.vue';
import RoleCoverageCard from './components/RoleCoverageCard.vue';
import RoleDialog from './components/RoleDialog.vue';
import { useRbac } from './composables/useRbac';

const {
  permissionInventory,
  roles,
  activeTab,
  keyword,
  selectedRoleCode,
  accountDialogVisible,
  roleDialogVisible,
  draftAccount,
  draftRole,
  tabOptions,
  selectedRole,
  filteredAccounts,
  kpis,
  getRoleCoverage,
  getStatusText,
  getStatusTone,
  toggleAccount,
  openEdit,
  togglePermission,
  createAccount,
  createRole,
} = useRbac();
</script>
