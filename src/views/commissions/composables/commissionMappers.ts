import type { Commission, StatusTone } from '@/types';

export function mapApiCommissionToCommission(apiCommission: Record<string, unknown>): Commission {
  return {
    id: String(apiCommission.id || ''),
    orderId: String(apiCommission.sourceOrderId || ''),
    memberId: String(apiCommission.memberId || ''),
    memberName: String(apiCommission.memberName || ''),
    amount: Number(apiCommission.amount || 0),
    status: (apiCommission.status as Commission['status']) || 'pending',
    createdAt: apiCommission.createdAt ? String(apiCommission.createdAt) : '',
    originDetail: apiCommission.originDetail ? (apiCommission.originDetail as Commission['originDetail']) : undefined,
    overflowReason: apiCommission.exceptionReport ? String(apiCommission.exceptionReport) : undefined,
  };
}

export function mapApiOverflowToCommission(apiOverflow: Record<string, unknown>): Commission {
  return {
    id: String(apiOverflow.id || ''),
    orderId: '',
    memberId: String(apiOverflow.memberId || ''),
    memberName: String(apiOverflow.memberName || ''),
    amount: Number(apiOverflow.overflowAmount || 0),
    status: 'intercepted',
    createdAt: apiOverflow.createdAt ? String(apiOverflow.createdAt) : '',
    originDetail: undefined,
    overflowReason: String(apiOverflow.reason || '额度池耗尽'),
  };
}

export function formatMoney(value: unknown): string {
  return `${Number(value || 0).toLocaleString()} USDT`;
}

export function formatNumber(value: unknown): string {
  return Number(value || 0).toLocaleString();
}

export function getStatusText(status: string): string {
  const map: Record<string, string> = {
    credited: '已入池划账',
    pending: '待日终划账',
    pool_insufficient: '额度不足阻塞',
    failed: '广播回滚失败',
    intercepted: '拦截回笼存池',
    settled: '已结算',
  };
  return map[status] || status;
}

export function getStatusTone(status: string): StatusTone {
  const map: Record<string, StatusTone> = {
    credited: 'success',
    pending: 'warning',
    pool_insufficient: 'warning',
    failed: 'danger',
    intercepted: 'danger',
    settled: 'success',
  };
  return map[status] || 'muted';
}

export function getStatusPulse(status: string): boolean {
  return status === 'pending';
}
