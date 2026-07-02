import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';
import type { MetricKpi, Order } from '@/types';
import { getAdminOrder, getAdminOrders, getAdminOrderStatistics, updateAdminOrderStatus } from '../../../api/services';
import { formatMoney, formatNumber, getStatusText, getStatusTone, getStatusType, mapApiOrderToOrder } from './orderMappers';

export function useOrders() {
  const loading = ref(false);
  const orders = ref<Order[]>([]);
  const stats = ref<Record<string, unknown>>({});
  const selectedOrder = ref<Order | null>(null);
  const filters = reactive({ keyword: '', status: '' });

  const filteredOrders = computed(() => {
    return orders.value.filter((item) => {
      const keyword = filters.keyword.toLowerCase();
      const keywordMatch = !keyword || [item.id, item.memberName, item.memberId].some((field) => String(field).toLowerCase().includes(keyword));
      return keywordMatch && (!filters.status || item.status === filters.status);
    });
  });

  const kpis = computed<MetricKpi[]>(() => [
    { label: '待审核', value: Number(stats.value.pendingCount) || 0, sub: '需要确认到账', tone: 'amber' },
    { label: '本周订单', value: formatMoney(stats.value.weekAmount || 0), sub: `${Number(stats.value.weekCount) || 0} 笔`, tone: 'green' },
    { label: '异常订单', value: Number(stats.value.abnormalCount) || 0, sub: '需运营复核', tone: 'red' },
  ]);

  async function loadOrders() {
    loading.value = true;
    try {
      const [ordersRes, statsRes] = await Promise.all([
        getAdminOrders({ pageSize: 100 }),
        getAdminOrderStatistics(),
      ]);
      orders.value = (ordersRes.data.items || []).map(mapApiOrderToOrder);
      stats.value = statsRes.data || {};
    } finally {
      loading.value = false;
    }
  }

  async function loadOrderDetail(orderId: string): Promise<Order> {
    const res = await getAdminOrder(orderId);
    return mapApiOrderToOrder(res.data);
  }

  async function selectOrder(order: Order | null) {
    if (order) {
      selectedOrder.value = await loadOrderDetail(order.id);
    } else {
      selectedOrder.value = null;
    }
  }

  async function confirmOrder(orderId: string) {
    await updateAdminOrderStatus(orderId, { status: 'paid' });
    ElMessage.success('订单已确认到账');
    await loadOrders();
    if (selectedOrder.value?.id === orderId) {
      selectedOrder.value = await loadOrderDetail(orderId);
    }
  }

  async function rejectOrder(orderId: string) {
    await updateAdminOrderStatus(orderId, { status: 'cancelled' });
    ElMessage.success('订单已驳回');
    await loadOrders();
    if (selectedOrder.value?.id === orderId) {
      selectedOrder.value = await loadOrderDetail(orderId);
    }
  }

  function closeDetail() {
    selectedOrder.value = null;
  }

  onMounted(loadOrders);

  return {
    loading,
    orders,
    stats,
    selectedOrder,
    filters,
    filteredOrders,
    kpis,
    formatMoney,
    formatNumber,
    getStatusText,
    getStatusTone,
    getStatusType,
    loadOrders,
    selectOrder,
    closeDetail,
    confirmOrder,
    rejectOrder,
  };
}
