import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';
import type { Commission, MetricKpi } from '@/types';
import {
  getAdminCommissionDistribution,
  getAdminCommissionOverflow,
  getAdminCommissionPool,
  getAdminCommissionStatistics,
  settleAdminCommissions,
} from '../../../api/services';
import { formatMoney, formatNumber, getStatusText, getStatusTone, getStatusPulse, mapApiCommissionToCommission, mapApiOverflowToCommission } from './commissionMappers';

export function useCommissions() {
  const loading = ref(false);
  const stats = ref<Record<string, unknown>>({});
  const pools = ref<Record<string, unknown>[]>([]);
  const distributions = ref<Record<string, unknown>[]>([]);
  const overflows = ref<Record<string, unknown>[]>([]);
  const selectedCommission = ref<Commission | null>(null);
  const filters = reactive({ keyword: '', tab: 'all' });

  const allCommissions = computed<Commission[]>(() => {
    const dist = distributions.value.map(mapApiCommissionToCommission);
    const overflow = overflows.value.map(mapApiOverflowToCommission);
    return [...dist, ...overflow].sort((a, b) => (new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()));
  });

  const filteredCommissions = computed<Commission[]>(() => {
    return allCommissions.value.filter((item) => {
      const keyword = filters.keyword.toLowerCase();
      const keywordMatch = !keyword || [item.id, item.memberId, item.memberName, item.orderId].some((field) => String(field).toLowerCase().includes(keyword));
      
      let tabMatch = true;
      if (filters.tab === 'credited') tabMatch = item.status === 'credited' || item.status === 'settled';
      else if (filters.tab === 'pool_insufficient') tabMatch = item.status === 'pool_insufficient';
      else if (filters.tab === 'intercepted') tabMatch = item.status === 'intercepted' || item.status === 'failed';
      
      return keywordMatch && tabMatch;
    });
  });

  const kpis = computed<MetricKpi[]>(() => [
    { label: '待日终划账', value: stats.value.pendingAmount ? formatMoney(stats.value.pendingAmount) : '0 USDT', sub: `${Number(stats.value.pendingCount) || 0} 笔`, tone: 'amber' },
    { label: '已入池划账', value: stats.value.settledAmount ? formatMoney(stats.value.settledAmount) : '0 USDT', sub: '历史累计', tone: 'green' },
    { label: '溢出/拦截', value: stats.value.overflowAmount ? formatMoney(stats.value.overflowAmount) : '0 USDT', sub: '进入储备金库', tone: 'red' },
  ]);

  async function loadCommissions() {
    loading.value = true;
    try {
      const [poolRes, distRes, overflowRes, statsRes] = await Promise.all([
        getAdminCommissionPool({ pageSize: 100 }),
        getAdminCommissionDistribution({ pageSize: 100 }),
        getAdminCommissionOverflow({ pageSize: 100 }),
        getAdminCommissionStatistics(),
      ]);
      pools.value = poolRes.data.items || [];
      distributions.value = distRes.data.items || [];
      overflows.value = overflowRes.data.items || [];
      stats.value = statsRes.data || {};
    } finally {
      loading.value = false;
    }
  }

  function selectCommission(commission: Commission | null) {
    selectedCommission.value = commission;
  }

  function closeDetail() {
    selectedCommission.value = null;
  }

  async function manualSettle() {
    await settleAdminCommissions({ operator: 'admin' });
    ElMessage.success('佣金结算任务已执行');
    await loadCommissions();
  }

  onMounted(loadCommissions);

  return {
    loading,
    stats,
    pools,
    distributions,
    overflows,
    allCommissions,
    filteredCommissions,
    selectedCommission,
    filters,
    kpis,
    formatMoney,
    formatNumber,
    getStatusText,
    getStatusTone,
    getStatusPulse,
    loadCommissions,
    selectCommission,
    closeDetail,
    manualSettle,
  };
}
