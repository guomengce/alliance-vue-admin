import { computed, onMounted, reactive, ref } from 'vue';
import type { MetricKpi, QueueAccount, QueueUnlockRecord } from '@/types';
import { getAdminQueueAccount, getAdminQueueAccounts, getAdminQueueLockedAmount, getAdminQueueUnlockRecords } from '../../../api/services';
import { formatMoney, formatNumber, getStatusText, getStatusTone, mapApiQueueAccountToAccount, mapApiUnlockRecordToRecord } from './queueMappers';

export function useQueue() {
  const loading = ref(false);
  const accounts = ref<QueueAccount[]>([]);
  const unlockRecords = ref<QueueUnlockRecord[]>([]);
  const locked = ref<Record<string, unknown>>({});
  const selectedAccount = ref<QueueAccount | null>(null);
  const detailRecords = ref<QueueUnlockRecord[]>([]);
  const filters = reactive({ keyword: '' });
  const isEditingData = ref(false);

  const filteredAccounts = computed(() => {
    return accounts.value.filter((item) => {
      const keyword = filters.keyword.toLowerCase();
      return !keyword || [item.id, item.memberId, item.memberName].some((field) => String(field).toLowerCase().includes(keyword));
    });
  });

  const averageProgress = computed(() => {
    if (!accounts.value.length) return 0;
    return Math.round((accounts.value.reduce((sum, item) => sum + item.unlockProgress, 0) / accounts.value.length) * 100);
  });

  const kpis = computed<MetricKpi[]>(() => [
    { label: '锁仓总额', value: formatMoney(locked.value.lockedAmount || 0), sub: `${Number(locked.value.accountCount) || 0} 个账户`, tone: 'amber' },
    { label: '平均解锁进度', value: `${averageProgress.value}%`, sub: '按账户进度估算', tone: 'purple' },
    { label: '待解锁记录', value: unlockRecords.value.filter((item) => item.status !== 'settled').length, sub: '需要结算确认', tone: 'green' },
  ]);

  async function loadQueue() {
    loading.value = true;
    try {
      const [accountsRes, lockedRes, recordsRes] = await Promise.all([
        getAdminQueueAccounts({ pageSize: 100 }),
        getAdminQueueLockedAmount(),
        getAdminQueueUnlockRecords({ pageSize: 100 }),
      ]);
      accounts.value = (accountsRes.data.items || []).map(mapApiQueueAccountToAccount);
      locked.value = lockedRes.data || {};
      unlockRecords.value = (recordsRes.data.items || []).map(mapApiUnlockRecordToRecord);
    } finally {
      loading.value = false;
    }
  }

  async function selectAccount(account: QueueAccount | null) {
    if (account) {
      selectedAccount.value = account;
      const res = await getAdminQueueAccount(account.id);
      selectedAccount.value = mapApiQueueAccountToAccount(res.data);
      detailRecords.value = unlockRecords.value.filter((r) => r.memberId === account.memberId);
      isEditingData.value = false;
    } else {
      selectedAccount.value = null;
      detailRecords.value = [];
      isEditingData.value = false;
    }
  }

  function closeDetail() {
    selectedAccount.value = null;
    detailRecords.value = [];
    isEditingData.value = false;
  }

  function toggleEditMode() {
    isEditingData.value = !isEditingData.value;
  }

  function saveCalibration(data: { currentLocked: number; unlockedAmount: number }) {
    if (selectedAccount.value) {
      selectedAccount.value.lockedAmount = data.currentLocked;
      selectedAccount.value.unlockedAmount = data.unlockedAmount;
      const newRecord: QueueUnlockRecord = {
        id: `TRIG-CAL-${Date.now()}`,
        memberId: selectedAccount.value.memberId,
        sourceMemberId: 'SYSTEM',
        sourceMemberName: '系统校准',
        amount: data.currentLocked - (selectedAccount.value.lockedAmount || 0),
        unlockedAt: new Date().toISOString(),
        status: 'settled',
      };
      detailRecords.value.unshift(newRecord);
    }
    isEditingData.value = false;
    loadQueue();
  }

  onMounted(loadQueue);

  return {
    loading,
    accounts,
    unlockRecords,
    locked,
    selectedAccount,
    detailRecords,
    filters,
    filteredAccounts,
    kpis,
    isEditingData,
    formatMoney,
    formatNumber,
    getStatusText,
    getStatusTone,
    loadQueue,
    selectAccount,
    closeDetail,
    toggleEditMode,
    saveCalibration,
  };
}
