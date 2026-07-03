import type { Settlement, SettlementOverflow, StatusTone } from '@/types';

export function mapApiSettlementToSettlement(apiSettlement: Record<string, unknown>): Settlement {
  const commissionAmount = Number(apiSettlement.commissionAmount || 0);
  const overflowAmount = Number(apiSettlement.overflowAmount || 0);

  return {
    id: String(apiSettlement.id || ''),
    date: String(apiSettlement.date || ''),
    orderCount: Number(apiSettlement.orderCount || 0),
    orderAmount: Number(apiSettlement.orderAmount || 0),
    commissionAmount,
    poolCapacity: Number(apiSettlement.poolCapacity ?? Math.max(commissionAmount - overflowAmount, 0)),
    actualAmount: Number(apiSettlement.actualAmount ?? Math.max(commissionAmount - overflowAmount, 0)),
    overflowAmount,
    overflowCount: Number(apiSettlement.overflowCount || (overflowAmount > 0 ? 1 : 0)),
    queueUnlockAmount: Number(apiSettlement.queueUnlockAmount || 0),
    status: (apiSettlement.status as Settlement['status']) || 'pending',
    runAt: apiSettlement.runAt ? String(apiSettlement.runAt) : undefined,
  };
}

export function mapApiOverflowToOverflow(apiOverflow: Record<string, unknown>): SettlementOverflow {
  return {
    id: String(apiOverflow.id || ''),
    memberId: String(apiOverflow.memberId || ''),
    memberName: String(apiOverflow.memberName || ''),
    amount: Number(apiOverflow.overflowAmount || apiOverflow.amount || 0),
    reason: String(apiOverflow.reason || '额度不足'),
    createdAt: apiOverflow.createdAt ? String(apiOverflow.createdAt) : '',
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
    completed: '已核拨付',
    pending: '待执行',
    running: '运行中',
    failed: '失败',
    clipped: '扣除溢流',
    stalled_exception: '额度匮乏挂账',
    low_capacity_notified: '已推警告邮件',
  };
  return map[status] || status;
}

export function getStatusTone(status: string): StatusTone {
  const map: Record<string, StatusTone> = {
    completed: 'success',
    pending: 'muted',
    running: 'warning',
    failed: 'danger',
    clipped: 'danger',
    stalled_exception: 'danger',
    low_capacity_notified: 'purple',
  };
  return map[status] || 'muted';
}
