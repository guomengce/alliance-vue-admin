import type { Plan, PlanForm } from '@/types';

const DEFAULT_DESCRIPTION = '后台配置的会员认购套餐。认购后会影响 TROO 配比、排队锁仓比例、赠送比例和可释放佣金上限。';

const clampPercent = (value: unknown): number => Math.min(100, Math.max(0, Number(value) || 0));
const toPercent = (value: unknown): number => Math.round(Number(value || 0) * 100);
const toRatio = (value: unknown): number => Number((clampPercent(value) / 100).toFixed(4));
const pickPercentValue = (ratioValue: unknown, percentValue: unknown, fallbackPercent: number): number => {
  if (ratioValue !== undefined && ratioValue !== null) return toPercent(ratioValue);
  if (percentValue !== undefined && percentValue !== null) return clampPercent(percentValue);
  return fallbackPercent;
};

export function normalizeRatioPair(changedField: 'buy' | 'queue', value: unknown): { buyRatio: number; queueRatio: number } {
  const normalized = clampPercent(value);
  if (changedField === 'queue') {
    return { buyRatio: 100 - normalized, queueRatio: normalized };
  }
  return { buyRatio: normalized, queueRatio: 100 - normalized };
}

export function createDefaultPlanForm(): PlanForm {
  return {
    id: '',
    code: '',
    name: '',
    price: 1000,
    giftRatio: 1,
    buyRatio: 40,
    queueRatio: 60,
    commissionLimit: 4000,
    description: '',
    status: 'enabled',
  };
}

export function mapApiPackageToPlan(item: Record<string, unknown> = {}): Plan {
  const price = Number(item.amount ?? item.price ?? 0);
  const commissionLimit = Number(item.commissionLimit ?? Number(item.commissionMultiplier || 0) * price);

  return {
    id: String(item.id || item.code || ''),
    code: String(item.code || item.id || '').replace(/^plan-/i, '').toUpperCase(),
    name: String(item.name || ''),
    price,
    giftRatio: Number(item.trooGiftRatio ?? item.giftRatio ?? 1),
    buyRatio: pickPercentValue(item.instantTrooRatio, item.buyRatio, 40),
    queueRatio: pickPercentValue(item.queueLockRatio, item.queueRatio, 60),
    commissionLimit,
    status: item.status === 'disabled' ? 'disabled' : 'enabled',
    description: String(item.description || DEFAULT_DESCRIPTION),
  };
}

export function mapPlanFormToPayload(form: Partial<PlanForm> = {}): Record<string, unknown> {
  const price = Number(form.price || 0);
  const commissionLimit = Number(form.commissionLimit || 0);

  return {
    id: form.id || undefined,
    code: form.code || '',
    name: form.name || '',
    amount: price,
    currency: 'USDT',
    commissionMultiplier: price > 0 ? Number((commissionLimit / price).toFixed(4)) : 0,
    commissionLimit,
    trooGiftRatio: Number(form.giftRatio || 1),
    instantTrooRatio: toRatio(form.buyRatio),
    queueLockRatio: toRatio(form.queueRatio),
    description: form.description || '',
    status: form.status === 'disabled' ? 'disabled' : 'enabled',
  };
}

export function formatBonusRatio(value: unknown): string {
  const ratio = Number(value || 1);
  if (ratio === 1) return '0%';
  return `+${Math.round((ratio - 1) * 100)}%`;
}

export function formatMoney(value: unknown): string {
  return Number(value || 0).toLocaleString();
}

export { DEFAULT_DESCRIPTION };
