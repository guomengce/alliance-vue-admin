import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {
  adjustAdminFinance,
  getAdminCompanyBalance,
  getAdminFinanceRecords,
  getAdminFinanceWallets,
  getAdminTrooAssets,
} from '../../../api/services';

export interface WalletRow {
  memberId: string;
  memberName: string;
  usdtBalance: number;
  trooBalance: number;
  queueBalance: number;
}

export interface FinanceRecord {
  id: string;
  memberName: string;
  type: string;
  asset: string;
  amount: number;
  fee: number;
  status: string;
}

interface CompanyBalance {
  usdtAvailable: number;
  usdtFrozen: number;
  overflowPool: number;
  withdrawalFeeIncome: number;
}

interface TrooAssets {
  reserve: number;
  issued: number;
  price: number;
  priceChange24h: number;
}

export interface FinanceAdjustForm {
  memberId: string;
  asset: 'USDT' | 'TROO';
  amount: number;
  reason: string;
}

export function useFinance() {
  const loading = ref(false);
  const activeTab = ref<'wallets' | 'records'>('wallets');
  const adjustVisible = ref(false);
  const wallets = ref<WalletRow[]>([]);
  const records = ref<FinanceRecord[]>([]);
  const balance = ref<CompanyBalance>({
    usdtAvailable: 0,
    usdtFrozen: 0,
    overflowPool: 0,
    withdrawalFeeIncome: 0,
  });
  const troo = ref<TrooAssets>({
    reserve: 0,
    issued: 0,
    price: 0,
    priceChange24h: 0,
  });
  const adjustForm = reactive<FinanceAdjustForm>({
    memberId: 'M10001',
    asset: 'USDT',
    amount: 0,
    reason: '',
  });

  const money = (value: unknown) => `${Number(value || 0).toLocaleString()} USDT`;
  const number = (value: unknown) => Number(value || 0).toLocaleString();

  const kpis = computed(() => [
    { label: '公司可用', value: money(balance.value.usdtAvailable), sub: `冻结 ${money(balance.value.usdtFrozen)}`, tone: 'is-green' },
    { label: 'TROO 储备', value: number(troo.value.reserve), sub: `发行 ${number(troo.value.issued)}`, tone: 'is-purple' },
    { label: '溢出池', value: money(balance.value.overflowPool), sub: `手续费 ${money(balance.value.withdrawalFeeIncome)}`, tone: 'is-amber' },
    { label: 'TROO 价格', value: `$${Number(troo.value.price || 0).toFixed(4)}`, sub: `${((troo.value.priceChange24h || 0) * 100).toFixed(2)}%` },
  ]);

  const walletFields = [
    { label: 'USDT', format: (row: WalletRow) => money(row.usdtBalance) },
    { label: 'TROO', format: (row: WalletRow) => number(row.trooBalance) },
    { label: '排队余额', format: (row: WalletRow) => money(row.queueBalance) },
  ];

  async function loadFinance() {
    loading.value = true;
    try {
      const [walletRes, balanceRes, recordsRes, trooRes] = await Promise.all([
        getAdminFinanceWallets({ pageSize: 100 }),
        getAdminCompanyBalance(),
        getAdminFinanceRecords({ pageSize: 100 }),
        getAdminTrooAssets(),
      ]);
      wallets.value = walletRes.data.items;
      balance.value = balanceRes.data;
      records.value = recordsRes.data.items;
      troo.value = trooRes.data;
    } finally {
      loading.value = false;
    }
  }

  async function submitAdjustment() {
    await adjustAdminFinance({ ...adjustForm });
    ElMessage.success('资金调整已记录');
    adjustVisible.value = false;
    await loadFinance();
  }

  onMounted(loadFinance);

  return {
    loading,
    activeTab,
    adjustVisible,
    wallets,
    records,
    adjustForm,
    kpis,
    walletFields,
    money,
    number,
    loadFinance,
    submitAdjustment,
  };
}
