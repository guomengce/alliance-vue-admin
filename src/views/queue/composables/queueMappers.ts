import type { QueueAccount, QueueUnlockRecord, StatusTone } from '@/types';

export function mapApiQueueAccountToAccount(apiAccount: Record<string, unknown>): QueueAccount {
  const lockedAmount = Number(apiAccount.lockedAmount || 0);
  const unlockedAmount = Number(apiAccount.unlockedAmount || 0);
  const initialLockedAmount = Number(apiAccount.totalLocked || apiAccount.initialLockedAmount || lockedAmount + unlockedAmount);

  return {
    id: String(apiAccount.id || ''),
    memberId: String(apiAccount.memberId || ''),
    memberName: String(apiAccount.memberName || ''),
    lockedAmount,
    unlockedAmount,
    initialLockedAmount,
    triggerCount: Number(apiAccount.triggerCount || apiAccount.unlockTriggerCount || 0),
    unlockProgress: initialLockedAmount > 0 ? unlockedAmount / initialLockedAmount : 0,
  };
}

export function mapApiUnlockRecordToRecord(apiRecord: Record<string, unknown>): QueueUnlockRecord {
  return {
    id: String(apiRecord.id || ''),
    memberId: String(apiRecord.memberId || ''),
    sourceMemberId: String(apiRecord.sourceMemberId || ''),
    sourceMemberName: String(apiRecord.sourceMemberName || ''),
    amount: Number(apiRecord.amount || 0),
    unlockedAt: apiRecord.unlockedAt ? String(apiRecord.unlockedAt) : undefined,
    status: (apiRecord.status as QueueUnlockRecord['status']) || 'pending',
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
    settled: '已解锁',
    pending: '待解锁',
    processing: '处理中',
  };
  return map[status] || status;
}

export function getStatusTone(status: string): StatusTone {
  const map: Record<string, StatusTone> = {
    settled: 'success',
    pending: 'warning',
    processing: 'purple',
  };
  return map[status] || 'muted';
}
