export interface Plan {
  id: string;
  code: string;
  name: string;
  price: number;
  giftRatio: number;
  buyRatio: number;
  queueRatio: number;
  commissionLimit: number;
  description: string;
  status: 'enabled' | 'disabled';
}

export interface PlanForm {
  id: string;
  code: string;
  name: string;
  price: number;
  giftRatio: number;
  buyRatio: number;
  queueRatio: number;
  commissionLimit: number;
  description: string;
  status: 'enabled' | 'disabled';
}

export interface Order {
  id: string;
  memberId: string;
  memberName: string;
  packageName: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  paidAt?: string;
  paymentChannel?: string;
  txid?: string;
  cashFlowTrack?: Array<{ type: string; amount: number; timestamp: string }>;
  stockConversion?: Array<{ type: string; amount: number; timestamp: string }>;
  commissionAllocations?: Array<{ level: number; memberId: string; memberName: string; amount: number }>;
  abnormal?: boolean;
}

export interface Commission {
  id: string;
  orderId: string;
  memberId: string;
  memberName: string;
  amount: number;
  status: 'credited' | 'pending' | 'pool_insufficient' | 'failed' | 'intercepted';
  createdAt: string;
  originDetail?: {
    sourceOrderId: string;
    sourceMemberId: string;
    sourceMemberName: string;
    tier1Amount: number;
    tier2Amount: number;
    tier3Amount: number;
  };
  overflowReason?: string;
}

export interface QueueAccount {
  id: string;
  memberId: string;
  memberName: string;
  lockedAmount: number;
  unlockedAmount: number;
  initialLockedAmount: number;
  triggerCount: number;
  unlockProgress: number;
}

export interface QueueUnlockRecord {
  id: string;
  memberId: string;
  sourceMemberId: string;
  sourceMemberName: string;
  amount: number;
  unlockedAt?: string;
  status?: 'pending' | 'settled';
}

export interface Settlement {
  id: string;
  date: string;
  orderCount: number;
  orderAmount: number;
  commissionAmount: number;
  poolCapacity?: number;
  actualAmount?: number;
  overflowAmount: number;
  overflowCount?: number;
  queueUnlockAmount: number;
  status: 'completed' | 'pending' | 'running' | 'failed' | 'clipped' | 'stalled_exception' | 'low_capacity_notified';
  runAt?: string;
}

export interface SettlementOverflow {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  reason: string;
  createdAt: string;
}

export interface MetricKpi {
  label: string;
  value: string | number;
  sub?: string;
  tone: 'purple' | 'amber' | 'red' | 'green';
}

export type StatusTone = 'success' | 'warning' | 'danger' | 'purple' | 'muted';
