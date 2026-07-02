<template>
  <AdminPage title="结算列表" description="执行 D+1 日结、手动补结、溢出反馈审阅和结算批次追踪">
    <template #actions>
      <el-button :icon="Refresh" @click="triggerDaily">触发日结</el-button>
      <el-button type="primary" :icon="Calendar" @click="manualVisible = true">手动结算</el-button>
    </template>

    <WorkflowGuide />

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>D+1 结算记录</template>
      <div class="settlement-toolbar">
        <SearchBox v-model="filters.keyword" placeholder="搜索批次号/日期..." />
        <el-select v-model="filters.status" clearable placeholder="状态" style="width: 120px" @change="applyFilters">
          <el-option label="全部" value="" />
          <el-option label="已完成" value="completed" />
          <el-option label="待执行" value="pending" />
          <el-option label="运行中" value="running" />
          <el-option label="失败" value="failed" />
        </el-select>
      </div>

      <Table
        :loading="loading"
        :settlements="filteredSettlements"
        :format-number="formatNumber"
        :get-status-text="getStatusText"
        :get-status-tone="getStatusTone"
        @view="selectSettlement"
      />

      <MobileList
        :settlements="filteredSettlements"
        :format-number="formatNumber"
        :get-status-text="getStatusText"
        :get-status-tone="getStatusTone"
        @view="selectSettlement"
      />
    </el-card>

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>溢出反馈</template>
      <el-table :data="overflows" height="240">
        <el-table-column prop="id" label="编号" width="120" />
        <el-table-column prop="memberName" label="会员" />
        <el-table-column prop="overflowAmount" label="溢出金额" width="140">
          <template #default="{ row }">USDT {{ formatNumber(row.overflowAmount) }}</template>
        </el-table-column>
        <el-table-column prop="settlementStatus" label="处理状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.settlementStatus === 'pending' ? 'warning' : 'success'">
              {{ row.settlementStatus === 'pending' ? '待处理' : '已处理' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="manualVisible" class="admin-dialog" title="手动结算" width="min(430px, 92vw)">
      <el-form :model="manualForm" label-width="90px">
        <el-form-item label="业务日期">
          <el-date-picker v-model="manualForm.date" value-format="YYYY-MM-DD" type="date" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="manualForm.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="manualVisible = false">取消</el-button>
        <el-button type="primary" @click="triggerManual">执行</el-button>
      </template>
    </el-dialog>

    <DetailOverlay
      :visible="!!selectedSettlement"
      :settlement="selectedSettlement || {}"
      :format-number="formatNumber"
      :get-status-text="getStatusText"
      :get-status-tone="getStatusTone"
      @close="selectSettlement(null)"
      @update:visible="(val) => { if (!val) selectSettlement(null); }"
      @notify="handleNotify"
      @force-settle="handleForceSettle"
    />
  </AdminPage>
</template>

<script setup lang="ts">
import { Calendar, Refresh } from '@element-plus/icons-vue';
import AdminPage from '../shared/AdminPage.vue';
import SearchBox from '../shared/SearchBox.vue';
import DetailOverlay from './components/DetailOverlay.vue';
import MobileList from './components/MobileList.vue';
import Table from './components/Table.vue';
import WorkflowGuide from './components/WorkflowGuide.vue';
import { useSettlement } from './composables/useSettlement';

const {
  loading,
  filteredSettlements,
  overflows,
  selectedSettlement,
  manualVisible,
  manualForm,
  filters,
  formatNumber,
  getStatusText,
  getStatusTone,
  applyFilters,
  selectSettlement,
  triggerDaily,
  triggerManual,
} = useSettlement();

function handleNotify() {
  alert('通知邮件已发送');
}

function handleForceSettle() {
  alert('人工补发并强制轧账功能开发中');
}
</script>