<template>
  <section v-loading="loading" class="admin-dashboard-page">
    <StatusHeader />
    <MetricGrid :cards="metricCards" />

    <div class="panel-grid">
      <TrooPricePanel
        :points="trooPoints"
        :active-index="activeTrooIndex"
        @hover-index-change="setTrooIndex"
      />
      <TrendPanel
        :trend="dashboardTrend"
        :active-index="activeTrendIndex"
        @hover-index-change="setTrendIndex"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  getDashboardCommissions,
  getDashboardMembers,
  getDashboardOrders,
  getDashboardSummary,
  getDashboardTrooPrice,
} from '../../api/services';
import type { DashboardSummary, DashboardPrice, TrendItem, DashboardTrend, TrooMarketItem } from '../../types';
import MetricGrid from './components/MetricGrid.vue';
import StatusHeader from './components/StatusHeader.vue';
import TrendPanel from './components/TrendPanel.vue';
import TrooPricePanel from './components/TrooPricePanel.vue';

const loading = ref(false);
const summary = ref<DashboardSummary>({} as DashboardSummary);
const price = ref<DashboardPrice>({} as DashboardPrice);
const orderTrend = ref<TrendItem[]>([]);
const commissionTrend = ref<TrendItem[]>([]);
const activeTrendHover = ref<number | null>(null);
const activeTrooHover = ref<number | null>(null);

const formatUsdt = (value: number) => `${Number(value || 0).toLocaleString()} USDT`;

const metricCards = computed(() => [
  {
    key: 'totalMembers',
    title: '全网总会员数',
    value: `${Number(summary.value.totalMembers || 0).toLocaleString()} 人`,
    sub: '100% 链上真实注册账户',
    colorClass: 'is-white',
  },
  {
    key: 'todaySubscriptionAmount',
    title: '今日流动性认购单',
    value: formatUsdt(summary.value.todayOrderAmount),
    sub: 'D0 今日到账累计单数',
    colorClass: 'is-purple',
  },
  {
    key: 'todayCommissionAmount',
    title: '今日已派发佣金(L1-L5)',
    value: formatUsdt(summary.value.todayCommission),
    sub: 'D+1 04:00 精算核拨成功',
    colorClass: 'is-green',
  },
  {
    key: 'lockedQueueAmount',
    title: '全联盟锁仓排队总额',
    value: formatUsdt(summary.value.queueLockedAmount),
    sub: '等待推荐下线认购实时释放',
    colorClass: 'is-amber',
  },
  {
    key: 'reserveBalance',
    title: '储备账户总余额',
    value: formatUsdt(summary.value.companyBalance),
    sub: '储备覆盖保证金充足',
    colorClass: 'is-teal',
  },
]);

const trooMarket = computed(() => {
  const base = Number(price.value.price || summary.value.trooPrice || 0);
  return [
    { time: '00:00', price: base * 0.941, change: -5.9 },
    { time: '04:00', price: base * 0.962, change: -3.8 },
    { time: '08:00', price: base * 0.95, change: -5.0 },
    { time: '12:00', price: base * 0.984, change: -1.6 },
    { time: '16:00', price: base * 1.012, change: 1.2 },
    { time: '20:00', price: base * 1.031, change: 3.1 },
    { time: '24:00', price: base * 1.042, change: 4.2 },
  ] as Array<{ time: string; price: number; change: number }>;
});

const trooPoints = computed<TrooMarketItem[]>(() => {
  const base = Number(price.value.price || summary.value.trooPrice || 0) || 1;
  const min = base * 0.92;
  const max = base * 1.06;
  return trooMarket.value.map((item, index) => {
    const x = (index / (trooMarket.value.length - 1)) * 320;
    const y = 110 - ((item.price - min) / (max - min)) * 110;
    return {
      ...item,
      x,
      y,
      priceText: `$${item.price.toFixed(4)}`,
      changeText: `${item.change >= 0 ? '+' : ''}${item.change.toFixed(2)}%`,
    };
  });
});

const dashboardTrend = computed<DashboardTrend[]>(() =>
  orderTrend.value.map((item, index) => ({
    date: item.date,
    subscriptionAmount: item.amount,
    commissionAmount: commissionTrend.value[index]?.settled || 0,
  })),
);

const activeTrooIndex = computed(() => activeTrooHover.value ?? Math.max(trooPoints.value.length - 1, 0));
const activeTrendIndex = computed(() => activeTrendHover.value ?? Math.max(dashboardTrend.value.length - 1, 0));

function setTrooIndex(index: number | null) {
  activeTrooHover.value = index;
}

function setTrendIndex(index: number | null) {
  activeTrendHover.value = index;
}

async function loadDashboard() {
  loading.value = true;
  try {
    const [summaryRes, membersRes, ordersRes, commissionsRes, priceRes] = await Promise.all([
      getDashboardSummary(),
      getDashboardMembers({ pageSize: 20 }),
      getDashboardOrders({ pageSize: 20 }),
      getDashboardCommissions({ pageSize: 20 }),
      getDashboardTrooPrice(),
    ]);

    summary.value = summaryRes.data;
    orderTrend.value = ordersRes.data.items;
    commissionTrend.value = commissionsRes.data.items;
    price.value = priceRes.data;
    void membersRes;
  } finally {
    loading.value = false;
  }
}

onMounted(loadDashboard);
</script>

<style scoped>
.admin-dashboard-page {
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 2px 0 16px;
  color: #cbc4d2;
  user-select: none;
}

:deep(.dashboard-card) {
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(31, 27, 39, 0.96), rgba(20, 17, 25, 0.96));
  box-shadow: 0 18px 46px rgba(8, 7, 11, 0.28);
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 24px;
  flex: 1;
}

:deep(.panel-card) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

@media (max-width: 1080px) {
  .panel-grid {
    grid-template-columns: 1fr;
  }
}
</style>
