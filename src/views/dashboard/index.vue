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
import MetricGrid from './components/MetricGrid.vue';
import StatusHeader from './components/StatusHeader.vue';
import TrendPanel from './components/TrendPanel.vue';
import TrooPricePanel from './components/TrooPricePanel.vue';

interface DashboardSummary {
  totalMembers?: number;
  todayOrderAmount?: number;
  todayCommission?: number;
  queueLockedAmount?: number;
  companyBalance?: number;
  trooPrice?: number;
}

interface TrooPrice {
  price?: number;
}

interface OrderTrendItem {
  date: string;
  amount: number;
}

interface CommissionTrendItem {
  settled?: number;
}

const loading = ref(false);
const summary = ref<DashboardSummary>({});
const price = ref<TrooPrice>({});
const orderTrend = ref<OrderTrendItem[]>([]);
const commissionTrend = ref<CommissionTrendItem[]>([]);
const activeTrendHover = ref<number | null>(null);
const activeTrooHover = ref<number | null>(null);

const formatUsdt = (value: unknown) => `${Number(value || 0).toLocaleString()} USDT`;

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
    title: '今日已派发佣金 (L1-L5)',
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
  ];
});

const trooPoints = computed(() => {
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

const dashboardTrend = computed(() =>
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

    summary.value = summaryRes.data || {};
    orderTrend.value = ordersRes.data.items || [];
    commissionTrend.value = commissionsRes.data.items || [];
    price.value = priceRes.data || {};
    void membersRes;
  } finally {
    loading.value = false;
  }
}

onMounted(loadDashboard);
</script>
