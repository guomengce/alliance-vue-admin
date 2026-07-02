import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import type { Settlement, SettlementOverflow } from '@/types';
import {
  getAdminSettlement,
  getAdminSettlementOverflow,
  getAdminSettlements,
  triggerAdminDailySettlement,
  triggerAdminManualSettlement,
} from '../../../api/services';
import { formatMoney, formatNumber, getStatusText, getStatusTone, mapApiOverflowToOverflow, mapApiSettlementToSettlement } from './settlementMappers';

export function useSettlement() {
  const loading = ref(false);
  const settlements = ref<Settlement[]>([]);
  const overflows = ref<SettlementOverflow[]>([]);
  const selectedSettlement = ref<Settlement | null>(null);
  const manualVisible = ref(false);
  const filters = reactive({ keyword: '', status: '' });

  const filteredSettlements = ref<Settlement[]>([]);

  const manualForm = reactive({ date: new Date().toISOString().split('T')[0], remark: '' });

  async function loadSettlements() {
    loading.value = true;
    try {
      const [settlementRes, overflowRes] = await Promise.all([
        getAdminSettlements({ pageSize: 100 }),
        getAdminSettlementOverflow({ pageSize: 100 }),
      ]);
      settlements.value = (settlementRes.data.items || []).map(mapApiSettlementToSettlement);
      overflows.value = (overflowRes.data.items || []).map(mapApiOverflowToOverflow);
      applyFilters();
    } finally {
      loading.value = false;
    }
  }

  function applyFilters() {
    filteredSettlements.value = settlements.value.filter((item) => {
      const keyword = filters.keyword.toLowerCase();
      const keywordMatch = !keyword || [item.id, item.date].some((field) => String(field).toLowerCase().includes(keyword));
      return keywordMatch && (!filters.status || item.status === filters.status);
    });
  }

  async function loadSettlementDetail(settlementId: string): Promise<Settlement> {
    const res = await getAdminSettlement(settlementId);
    return mapApiSettlementToSettlement(res.data);
  }

  function selectSettlement(settlement: Settlement | null) {
    if (settlement) {
      selectedSettlement.value = settlement;
    } else {
      selectedSettlement.value = null;
    }
  }

  async function triggerDaily() {
    await triggerAdminDailySettlement({ date: new Date().toISOString().split('T')[0] });
    ElMessage.success('日结任务已触发');
    await loadSettlements();
  }

  async function triggerManual() {
    await triggerAdminManualSettlement({ ...manualForm });
    ElMessage.success('手动结算已触发');
    manualVisible.value = false;
    await loadSettlements();
  }

  onMounted(loadSettlements);

  return {
    loading,
    settlements,
    filteredSettlements,
    overflows,
    selectedSettlement,
    manualVisible,
    manualForm,
    filters,
    formatMoney,
    formatNumber,
    getStatusText,
    getStatusTone,
    loadSettlements,
    applyFilters,
    selectSettlement,
    triggerDaily,
    triggerManual,
  };
}
