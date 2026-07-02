<template>
  <AdminPage title="参数配置" description="配置认购比例、佣金层级、结算时间、风控阈值与 TROO 价格源。">
    <el-card v-loading="loading" class="alliance-card" shadow="never">
      <el-tabs v-model="activeTab" class="config-tabs">
        <el-tab-pane label="套餐参数" name="packages">
          <el-form :model="packageConfig" label-width="150px" class="config-form">
            <el-form-item label="即时 TROO 比例"><el-slider v-model="packageConfig.instantTrooRatio" :min="0" :max="1" :step="0.01" /></el-form-item>
            <el-form-item label="排队锁定比例"><el-slider v-model="packageConfig.queueLockRatio" :min="0" :max="1" :step="0.01" /></el-form-item>
            <el-form-item label="启用套餐"><el-select v-model="packageConfig.enabledPackageCodes" multiple><el-option label="A" value="A" /><el-option label="B" value="B" /><el-option label="C" value="C" /><el-option label="D" value="D" /></el-select></el-form-item>
            <el-form-item><el-button type="primary" @click="savePackageConfig">保存套餐参数</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="佣金参数" name="commissions">
          <el-form :model="commissionConfig" label-width="150px" class="config-form">
            <el-form-item v-for="level in levels" :key="level.key" :label="level.label"><el-slider v-model="commissionConfig.ratios[level.key]" :min="0" :max="1" :step="0.01" /></el-form-item>
            <el-form-item label="解锁比例"><el-slider v-model="commissionConfig.unlockRatio" :min="0" :max="1" :step="0.01" /></el-form-item>
            <el-form-item label="溢出目标"><el-select v-model="commissionConfig.overflowTarget"><el-option label="公司池" value="company_pool" /><el-option label="上级池" value="upline_pool" /></el-select></el-form-item>
            <el-form-item><el-button type="primary" @click="saveCommissionConfig">保存佣金参数</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="系统参数" name="system">
          <el-form :model="systemConfig" label-width="150px" class="config-form">
            <el-form-item label="结算时间"><el-time-picker v-model="systemConfig.settlementTime" value-format="HH:mm" format="HH:mm" /></el-form-item>
            <el-form-item label="时区"><el-input v-model="systemConfig.timezone" /></el-form-item>
            <el-form-item label="提现手续费"><el-input-number v-model="systemConfig.withdrawalFee" :min="0" /></el-form-item>
            <el-form-item label="补池提醒阈值"><el-slider v-model="systemConfig.replenishmentReminderThreshold" :min="0" :max="1" :step="0.01" /></el-form-item>
            <el-form-item label="KYC 人工审核"><el-switch v-model="systemConfig.kycManualReview" /></el-form-item>
            <el-form-item><el-button type="primary" @click="saveSystemConfig">保存系统参数</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="TROO 价格源" name="troo">
          <el-form :model="trooConfig" label-width="150px" class="config-form">
            <el-form-item label="提供方"><el-input v-model="trooConfig.provider" /></el-form-item>
            <el-form-item label="接口地址"><el-input v-model="trooConfig.endpoint" /></el-form-item>
            <el-form-item label="刷新秒数"><el-input-number v-model="trooConfig.refreshSeconds" :min="10" /></el-form-item>
            <el-form-item label="兜底价格"><el-input-number v-model="trooConfig.fallbackPrice" :min="0" :step="0.01" /></el-form-item>
            <el-form-item><el-button type="primary" @click="saveTrooConfig">保存价格源</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </AdminPage>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import {
  getAdminCommissionConfig,
  getAdminPackageConfig,
  getAdminSystemConfig,
  getAdminTrooPriceSourceConfig,
  updateAdminCommissionConfig,
  updateAdminPackageConfig,
  updateAdminSystemConfig,
  updateAdminTrooPriceSourceConfig,
} from '../../api/services';
import AdminPage from '../shared/AdminPage.vue';

const loading = ref(false);
const activeTab = ref('packages');
const levels = [
  { key: 'l1', label: '一级比例' },
  { key: 'l2', label: '二级比例' },
  { key: 'l3', label: '三级比例' },
  { key: 'l4', label: '四级比例' },
  { key: 'l5', label: '五级比例' },
];
const packageConfig = reactive({ enabledPackageCodes: [] });
const commissionConfig = reactive({ ratios: {} });
const systemConfig = reactive({});
const trooConfig = reactive({});

async function loadConfigs() {
  loading.value = true;
  try {
    const [packageRes, commissionRes, systemRes, trooRes] = await Promise.all([
      getAdminPackageConfig(),
      getAdminCommissionConfig(),
      getAdminSystemConfig(),
      getAdminTrooPriceSourceConfig(),
    ]);
    Object.assign(packageConfig, packageRes.data);
    Object.assign(commissionConfig, commissionRes.data);
    Object.assign(systemConfig, systemRes.data);
    Object.assign(trooConfig, trooRes.data);
  } finally {
    loading.value = false;
  }
}

async function savePackageConfig() { await updateAdminPackageConfig({ ...packageConfig }); ElMessage.success('套餐参数已保存'); }
async function saveCommissionConfig() { await updateAdminCommissionConfig({ ...commissionConfig }); ElMessage.success('佣金参数已保存'); }
async function saveSystemConfig() { await updateAdminSystemConfig({ ...systemConfig }); ElMessage.success('系统参数已保存'); }
async function saveTrooConfig() { await updateAdminTrooPriceSourceConfig({ ...trooConfig }); ElMessage.success('TROO 价格源已保存'); }

onMounted(loadConfigs);
</script>

<style scoped lang="scss">
.config-form {
  max-width: 720px;
  padding-top: 10px;
}

@media (max-width: 700px) {
  .config-form {
    :deep(.el-form-item) {
      display: block;
    }

    :deep(.el-form-item__label) {
      justify-content: flex-start;
      width: auto !important;
    }
  }
}
</style>
