<template>
  <AdminPage
    title="结算列表"
    description="浏览与检索所有会员 D+1 结算日志、扣税明细、手动触发全盘自动结算扣缴及超额回账对账。"
  >
    <div class="settlement-view">
      <el-card class="alliance-card settlement-main-card" shadow="never">
        <div class="settlement-main-card__header">
          <div>
            <h3>
              <Refresh />
              <span>结算列表</span>
            </h3>
            <p>查看 D+1 自动结算批次、实时拨付队列、额度拦截与人工风控处理记录。</p>
          </div>
          <div class="settlement-main-card__actions">
            <el-button :icon="Refresh" :loading="loading" @click="triggerDaily">启动全盘结算对账</el-button>
            <el-button type="primary" :icon="Calendar" @click="manualVisible = true">手动结算</el-button>
          </div>
        </div>

        <WorkflowGuide
          :projected-commissions="projectedCommissions"
          :total-clipped="totalClipped"
        />

        <div class="settlement-content-grid">
          <aside class="settlement-log-panel">
            <h4>历史结算自动批次</h4>
            <div class="settlement-log-list">
              <button
                v-for="settlement in filteredSettlements"
                :key="settlement.id"
                type="button"
                class="settlement-log-item"
                @click="selectSettlement(settlement)"
              >
                <div class="settlement-log-item__top">
                  <span>{{ settlement.id }}</span>
                  <StatusPill :text="getStatusText(settlement.status)" :tone="getStatusTone(settlement.status)" />
                </div>
                <div class="settlement-log-item__row">
                  <span>结算日期:</span>
                  <strong>{{ settlement.date }}</strong>
                </div>
                <div class="settlement-log-item__row">
                  <span>累计申报单数:</span>
                  <strong>{{ settlement.orderCount }}</strong>
                </div>
                <div class="settlement-log-item__row">
                  <span>总拨付金额:</span>
                  <strong>USDT {{ formatNumber(settlement.commissionAmount) }}</strong>
                </div>
              </button>

              <div v-if="!filteredSettlements.length && !loading" class="settlement-log-empty">暂无结算批次</div>
            </div>
          </aside>

          <section class="settlement-queue-panel">
            <div class="settlement-queue-panel__header">
              <div>
                <h4>
                  <Promotion />
                  <span>待完成转账对账客户端明细</span>
                </h4>
              </div>
              <div class="settlement-queue-panel__filters">
                <SearchBox v-model="filters.keyword" placeholder="搜索批次号/日期..." />
                <el-select v-model="filters.status" clearable placeholder="状态" class="settlement-status-select" @change="applyFilters">
                  <el-option label="全部" value="" />
                  <el-option label="已核拨付" value="completed" />
                  <el-option label="待执行" value="pending" />
                  <el-option label="运行中" value="running" />
                  <el-option label="失败" value="failed" />
                </el-select>
              </div>
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
          </section>
        </div>
      </el-card>
    </div>

    <el-dialog v-model="manualVisible" class="admin-dialog" title="手动结算" width="min(430px, 92vw)">
      <el-form :model="manualForm" label-width="90px">
        <el-form-item label="业务日期">
          <el-date-picker v-model="manualForm.date" value-format="YYYY-MM-DD" type="date" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="manualForm.remark" placeholder="请输入结算备注" />
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
import { Calendar, Promotion, Refresh } from '@element-plus/icons-vue';
import { computed } from 'vue';
import AdminPage from '../shared/AdminPage.vue';
import SearchBox from '../shared/SearchBox.vue';
import StatusPill from '../shared/StatusPill.vue';
import DetailOverlay from './components/DetailOverlay.vue';
import MobileList from './components/MobileList.vue';
import Table from './components/Table.vue';
import WorkflowGuide from './components/WorkflowGuide.vue';
import { useSettlement } from './composables/useSettlement';

const {
  loading,
  filteredSettlements,
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

const projectedCommissions = computed(() => {
  return filteredSettlements.value.reduce((sum, item) => sum + item.commissionAmount, 0);
});

const totalClipped = computed(() => {
  return filteredSettlements.value.reduce((sum, item) => sum + item.overflowAmount, 0);
});

function handleNotify() {
  alert('通知邮件已发送');
}

function handleForceSettle() {
  alert('人工补发并强制入账功能开发中');
}
</script>
