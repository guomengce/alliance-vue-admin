import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {
  getAdminCommissionConfig,
  getAdminPackageConfig,
  getAdminSystemConfig,
  getAdminTrooPriceSourceConfig,
  updateAdminCommissionConfig,
  updateAdminPackageConfig,
  updateAdminSystemConfig,
  updateAdminTrooPriceSourceConfig,
} from '../../../api/services';

export type LevelKey = 'l1' | 'l2' | 'l3' | 'l4' | 'l5';

export interface PackageConfig {
  instantTrooRatio: number;
  queueLockRatio: number;
  enabledPackageCodes: string[];
}

export interface CommissionConfig {
  ratios: Record<LevelKey, number>;
  unlockRatio: number;
  overflowTarget: string;
}

export interface SystemConfig {
  settlementTime: string;
  timezone: string;
  withdrawalFee: number;
  replenishmentReminderThreshold: number;
  kycManualReview: boolean;
}

export interface TrooConfig {
  provider: string;
  endpoint: string;
  refreshSeconds: number;
  fallbackPrice: number;
}

export interface CommissionLevel {
  key: LevelKey;
  label: string;
  description: string;
}

export function useParameters() {
  const loading = ref(false);
  const saving = ref(false);
  const packageCodes = ['A', 'B', 'C', 'D', 'E'];
  const levels: CommissionLevel[] = [
    { key: 'l1', label: 'L1', description: '直属推荐奖励' },
    { key: 'l2', label: 'L2', description: '团队扩展奖励' },
    { key: 'l3', label: 'L3', description: '深度关系奖励' },
    { key: 'l4', label: 'L4', description: '长链路激励' },
    { key: 'l5', label: 'L5', description: '尾层激励' },
  ];

  const packageConfig = reactive<PackageConfig>({
    instantTrooRatio: 0.7,
    queueLockRatio: 0.31,
    enabledPackageCodes: [],
  });
  const commissionConfig = reactive<CommissionConfig>({
    ratios: { l1: 0.1, l2: 0.05, l3: 0.03, l4: 0.02, l5: 0.01 },
    unlockRatio: 0.1,
    overflowTarget: 'company_pool',
  });
  const systemConfig = reactive<SystemConfig>({
    settlementTime: '04:00',
    timezone: 'GMT+8',
    withdrawalFee: 15,
    replenishmentReminderThreshold: 0.1,
    kycManualReview: true,
  });
  const trooConfig = reactive<TrooConfig>({
    provider: 'Yahoo Finance',
    endpoint: 'https://query1.finance.yahoo.com/v8/finance/chart/TROO-USD',
    refreshSeconds: 60,
    fallbackPrice: 0.82,
  });

  function toPercent(value: number) {
    return Math.round(Number(value || 0) * 100);
  }

  function fromPercent(value: number | undefined) {
    return Number(value || 0) / 100;
  }

  function setCommissionRatio(key: LevelKey, value: number | undefined) {
    commissionConfig.ratios[key] = fromPercent(value);
  }

  function setPackagePercent(key: 'instantTrooRatio' | 'queueLockRatio', value: number | number[]) {
    packageConfig[key] = fromPercent(Array.isArray(value) ? value[0] : value);
  }

  function setCommissionPercent(key: 'unlockRatio', value: number | undefined) {
    commissionConfig[key] = fromPercent(value);
  }

  function setSystemPercent(key: 'replenishmentReminderThreshold', value: number | undefined) {
    systemConfig[key] = fromPercent(value);
  }

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

  async function savePackageConfig() {
    await updateAdminPackageConfig({ ...packageConfig });
  }

  async function saveCommissionConfig() {
    await updateAdminCommissionConfig({ ...commissionConfig, ratios: { ...commissionConfig.ratios } });
    ElMessage.success('佣金参数已保存');
  }

  async function saveSystemConfig() {
    await updateAdminSystemConfig({ ...systemConfig });
  }

  async function saveTrooConfig() {
    await updateAdminTrooPriceSourceConfig({ ...trooConfig });
  }

  async function savePackageAndSystemConfig() {
    await Promise.all([savePackageConfig(), saveSystemConfig()]);
    ElMessage.success('规则参数已保存');
  }

  async function saveTrooAndSystemConfig() {
    await Promise.all([saveTrooConfig(), saveSystemConfig()]);
    ElMessage.success('价格源配置已保存');
  }

  async function saveAll() {
    saving.value = true;
    try {
      await Promise.all([
        savePackageConfig(),
        saveSystemConfig(),
        saveTrooConfig(),
        updateAdminCommissionConfig({ ...commissionConfig, ratios: { ...commissionConfig.ratios } }),
      ]);
      ElMessage.success('全部参数已保存');
    } finally {
      saving.value = false;
    }
  }

  onMounted(loadConfigs);

  return {
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
  };
}
