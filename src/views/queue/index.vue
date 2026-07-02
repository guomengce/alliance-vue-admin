<template>
  <AdminPage title="排队列表" description="查看锁仓账户、解锁进度、下次释放预估和队列校准状态">
    <div v-if="!selectedAccount">
      <GuidePanel />

      <el-card class="alliance-card admin-table-card" shadow="never">
        <template #header>排队代表名册</template>
        <RosterTable
          :loading="loading"
          :accounts="filteredAccounts"
          :format-number="formatNumber"
          @view="selectAccount"
        />
        <RosterMobileList
          :accounts="filteredAccounts"
          :format-number="formatNumber"
          @view="selectAccount"
        />
      </el-card>
    </div>

    <DetailView
      v-else
      :account="selectedAccount"
      :records="detailRecords"
      :format-number="formatNumber"
      :is-editing-data="isEditingData"
      @back="closeDetail"
      @calibrate="toggleEditMode"
      @cancel-edit="toggleEditMode"
      @save-calibration="saveCalibration"
    />
  </AdminPage>
</template>

<script setup lang="ts">
import AdminPage from '../shared/AdminPage.vue';
import DetailView from './components/DetailView.vue';
import GuidePanel from './components/GuidePanel.vue';
import RosterMobileList from './components/RosterMobileList.vue';
import RosterTable from './components/RosterTable.vue';
import { useQueue } from './composables/useQueue';

const {
  loading,
  filteredAccounts,
  selectedAccount,
  detailRecords,
  isEditingData,
  formatNumber,
  selectAccount,
  closeDetail,
  toggleEditMode,
  saveCalibration,
} = useQueue();
</script>