import type { Order, StatusTone } from '@/types';

export function mapApiOrderToOrder(apiOrder: Record<string, unknown>): Order {
  return {
    id: String(apiOrder.id || ''),
    memberId: String(apiOrder.memberId || apiOrder.uid || ''),
    memberName: String(apiOrder.memberName || 'Unknown'),
    packageName: String(apiOrder.packageName || apiOrder.planName || ''),
    amount: Number(apiOrder.amount || 0),
    status: (apiOrder.status as Order['status']) || 'pending',
    paidAt: apiOrder.paidAt ? String(apiOrder.paidAt) : undefined,
    paymentChannel: String(apiOrder.paymentChannel || '-'),
    txid: String(apiOrder.txid || '-'),
    cashFlowTrack: (apiOrder.cashFlowTrack as Order['cashFlowTrack']) || generateDefaultCashFlow(apiOrder),
    stockConversion: (apiOrder.stockConversion as Order['stockConversion']) || generateDefaultStockConversion(apiOrder),
    commissionAllocations: (apiOrder.commissionAllocations as Order['commissionAllocations']) || generateDefaultCommissionAllocations(apiOrder),
    abnormal: Boolean(apiOrder.abnormal || false),
  };
}

function generateDefaultCashFlow(order: Record<string, unknown>): Order['cashFlowTrack'] {
  const amount = Number(order.amount || 0);
  return [
    { type: 'deposit', amount, timestamp: order.paidAt ? String(order.paidAt) : '' },
    { type: 'fee', amount: 0, timestamp: order.paidAt ? String(order.paidAt) : '' },
    { type: 'net', amount, timestamp: order.paidAt ? String(order.paidAt) : '' },
  ];
}

function generateDefaultStockConversion(order: Record<string, unknown>): Order['stockConversion'] {
  const amount = Number(order.amount || 0);
  const instantRatio = 0.7;
  const queueRatio = 0.31;
  return [
    { type: 'total', amount: Math.round(amount * (instantRatio + queueRatio)), timestamp: order.paidAt ? String(order.paidAt) : '' },
    { type: 'instant', amount: Number(order.instantTroo) || Math.round(amount * instantRatio), timestamp: order.paidAt ? String(order.paidAt) : '' },
    { type: 'queue', amount: Number(order.queueLocked) || Math.round(amount * queueRatio), timestamp: order.paidAt ? String(order.paidAt) : '' },
  ];
}

function generateDefaultCommissionAllocations(order: Record<string, unknown>): Order['commissionAllocations'] {
  const baseAmount = Number(order.amount || 0);
  return [
    { level: 1, memberId: '-', memberName: '-', amount: Math.round(baseAmount * 0.1) },
    { level: 2, memberId: '-', memberName: '-', amount: Math.round(baseAmount * 0.05) },
    { level: 3, memberId: '-', memberName: '-', amount: Math.round(baseAmount * 0.03) },
  ];
}

export function formatMoney(value: unknown): string {
  return `${Number(value || 0).toLocaleString()} USDT`;
}

export function formatNumber(value: unknown): string {
  return Number(value || 0).toLocaleString();
}

export function getStatusText(status: string): string {
  const map: Record<string, string> = {
    paid: '完成/已交割',
    pending: '待审核入账',
    cancelled: '已中止作废',
    failed: '失败',
    refunded: '已退款',
    timeout: '超时',
  };
  return map[status] || status;
}

export function getStatusTone(status: string): StatusTone {
  const map: Record<string, StatusTone> = {
    paid: 'success',
    pending: 'warning',
    cancelled: 'danger',
    failed: 'danger',
    refunded: 'muted',
    timeout: 'warning',
  };
  return map[status] || 'muted';
}

export function getStatusType(status: string): string {
  const map: Record<string, string> = {
    paid: 'success',
    pending: 'warning',
    cancelled: 'danger',
    failed: 'danger',
    refunded: 'info',
    timeout: 'warning',
  };
  return map[status] || 'info';
}
