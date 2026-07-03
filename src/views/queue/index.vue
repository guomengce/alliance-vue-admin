<template>
  <AdminPage title="排队列表" description="浏览和管理会员锁仓排队余额、直推认购触发释放记录及人工校准凭证。">
    <section v-if="!selectedAccount" class="queue-view">
      <GuidePanel />

      <el-card class="alliance-card admin-table-card queue-list-card" shadow="never">
        <template #header>
          <div class="queue-list-card__header">
            <div>
              <h3>排队代表名册</h3>
              <p>Queue Roster & Direct Referral Triggers</p>
            </div>
          </div>
        </template>
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
    </section>

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
