<template>
  <AdminPage
    title="用户列表"
    description="对超级同盟会员代表的状态、权限、KYC、资产和推荐关系进行集中管控与对账。"
  >
    <section class="users-view">
      <UserListHeader
        v-model:keyword="filters.keyword"
        v-model:kyc="filters.kyc"
        :total="filteredMembers.length"
        :loading="loading"
        @refresh="loadMembers"
      />

      <UserTable
        :members="filteredMembers"
        :format-number="formatNumber"
        :get-kyc-text="getKycText"
        :get-kyc-tone="getKycTone"
        :get-status-text="getStatusText"
        @view="openMember"
        @approve-kyc="approveKyc"
      />

      <UserMobileList
        :members="filteredMembers"
        :format-number="formatNumber"
        :get-kyc-text="getKycText"
        :get-kyc-tone="getKycTone"
        @view="openMember"
        @approve-kyc="approveKyc"
      />
    </section>

    <UserDetailDrawer
      v-model="drawerVisible"
      v-model:active-tab="activeTab"
      :member="selectedMember"
      :downlines="selectedDownlines"
      :format-number="formatNumber"
      :get-kyc-text="getKycText"
      :get-kyc-tone="getKycTone"
      :get-status-text="getStatusText"
      @approve-kyc="approveKyc"
    />
  </AdminPage>
</template>

<script setup lang="ts">
import AdminPage from '../shared/AdminPage.vue';
import UserDetailDrawer from './components/UserDetailDrawer.vue';
import UserListHeader from './components/UserListHeader.vue';
import UserMobileList from './components/UserMobileList.vue';
import UserTable from './components/UserTable.vue';
import { useUsers } from './composables/useUsers';

const {
  loading,
  filters,
  filteredMembers,
  selectedMember,
  selectedDownlines,
  drawerVisible,
  activeTab,
  formatNumber,
  getKycText,
  getKycTone,
  getStatusText,
  loadMembers,
  openMember,
  approveKyc,
} = useUsers();
</script>
