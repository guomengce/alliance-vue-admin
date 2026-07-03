<template>
  <AdminPage
    title="全系统运营与安全参数微调"
    description="可实时微调 L1-L5 各层分成占比、排队解扣门限，以及提现矿工消耗手续费扣除上限。"
  >
    <section v-loading="loading" class="parameters-view">
      <el-card class="alliance-card parameters-main-card" shadow="never">
        <div class="parameters-main-card__header">
          <div>
            <h3>
              <Setting />
              <span>全系统运营与安全参数微调</span>
            </h3>
            <p>统一维护认购比例、佣金层级、结算规则和 TROO 价格源。</p>
          </div>
          <div class="parameters-main-card__actions">
            <el-button :icon="Refresh" @click="loadConfigs">刷新配置</el-button>
            <el-button type="primary" :icon="Check" :loading="saving" @click="saveAll">保存全部</el-button>
          </div>
        </div>

        <div class="parameters-grid">
          <CommissionConfigCard
            :levels="levels"
            :config="commissionConfig"
            :to-percent="toPercent"
            @set-ratio="setCommissionRatio"
            @save="saveCommissionConfig"
          />

          <RulesConfigCard
            :package-config="packageConfig"
            :commission-config="commissionConfig"
            :system-config="systemConfig"
            :package-codes="packageCodes"
            :to-percent="toPercent"
            @set-package-percent="setPackagePercent"
            @set-commission-percent="setCommissionPercent"
            @set-system-percent="setSystemPercent"
            @save="savePackageAndSystemConfig"
          />

          <TrooSourceConfigCard
            :troo-config="trooConfig"
            :system-config="systemConfig"
            @save="saveTrooAndSystemConfig"
          />
        </div>
      </el-card>
    </section>
  </AdminPage>
</template>

<script setup lang="ts">
import { Check, Refresh, Setting } from '@element-plus/icons-vue';
import AdminPage from '../shared/AdminPage.vue';
import CommissionConfigCard from './components/CommissionConfigCard.vue';
import RulesConfigCard from './components/RulesConfigCard.vue';
import TrooSourceConfigCard from './components/TrooSourceConfigCard.vue';
import { useParameters } from './composables/useParameters';

const {
  loading,
  saving,
  packageCodes,
  levels,
  packageConfig,
  commissionConfig,
  systemConfig,
  trooConfig,
  toPercent,
  setCommissionRatio,
  setPackagePercent,
  setCommissionPercent,
  setSystemPercent,
  loadConfigs,
  saveCommissionConfig,
  savePackageAndSystemConfig,
  saveTrooAndSystemConfig,
  saveAll,
} = useParameters();
</script>
