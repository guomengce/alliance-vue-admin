import type { Component } from 'vue';

export interface NavItem {
  path: string;
  label: string;
  icon?: Component;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'commission' | 'settlement' | 'replenishment';
  channel: 'in_app' | 'email' | 'sms';
  title: string;
  content: string;
  status: 'enabled' | 'disabled';
  updatedAt: string;
}

export interface NotificationHistory {
  id: string;
  templateId: string;
  targetMemberId: string;
  channel: string;
  status: string;
  sentAt: string;
}

export interface DashboardSummary {
  totalMembers: number;
  todayOrderAmount: number;
  todayCommission: number;
  queueLockedAmount: number;
  companyBalance: number;
  trooPrice: number;
}

export interface DashboardPrice {
  price: number;
}

export interface TrendItem {
  date: string;
  amount: number;
  settled?: number;
}

export interface DashboardTrend {
  date: string;
  subscriptionAmount: number;
  commissionAmount: number;
}

export interface TrooMarketItem {
  time: string;
  price: number;
  change: number;
  x: number;
  y: number;
  priceText: string;
  changeText: string;
}

export interface SendForm {
  templateId: string;
  targetMemberId: string;
  channel: string;
}

export type StatusTone = 'success' | 'warning' | 'danger' | 'purple' | 'muted' | 'amber' | 'green' | 'red' | 'info';

export interface Commission {
  id: string;
  orderId: string;
  memberId: string;
  memberName: string;
  amount: number;
  status: 'pending' | 'failed' | 'pool_insufficient' | 'intercepted' | 'credited' | 'settled';
  createdAt: string;
  originDetail?: Record<string, unknown>;
  overflowReason?: string;
}

export interface MetricKpi {
  label: string;
  value: string | number;
  sub?: string;
  tone?: StatusTone;
}

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
  id?: string;
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
  status: 'paid' | 'pending' | 'failed' | 'refunded' | 'cancelled' | 'timeout';
  paymentChannel: string;
  txid: string;
  createdAt?: string;
  paidAt?: string;
  cashFlowTrack?: Record<string, unknown>[];
  stockConversion?: Record<string, unknown>[];
  commissionAllocations?: Record<string, unknown>[];
  abnormal?: boolean;
}

export interface QueueAccount {
  id: string;
  memberId: string;
  memberName: string;
  lockedAmount: number;
  unlockedAmount: number;
  initialLockedAmount?: number;
  triggerCount?: number;
  unlockProgress?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface QueueUnlockRecord {
  id: string;
  memberId: string;
  sourceMemberId?: string;
  sourceMemberName?: string;
  amount: number;
  triggerType?: string;
  status?: string;
  unlockedAt?: string;
  createdAt?: string;
}

export interface Settlement {
  id: string;
  batchId?: string;
  date?: string;
  orderCount?: number;
  orderAmount?: number;
  commissionAmount?: number;
  poolCapacity?: number;
  actualAmount?: number;
  overflowAmount?: number;
  overflowCount: number;
  queueUnlockAmount?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'clipped' | 'stalled_exception' | 'low_capacity_notified';
  runAt?: string;
  createdAt?: string;
  processedAt?: string;
}

export interface SettlementOverflow {
  id: string;
  settlementId?: string;
  memberId: string;
  memberName: string;
  amount: number;
  reason: string;
  status?: 'intercepted' | 'returned';
  createdAt: string;
}
