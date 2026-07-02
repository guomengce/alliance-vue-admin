const DEFAULT_DESCRIPTION = '系统管理员限定理财分销等级档。被用户充值认购后，将为其释放高额下级团队佣金提款吞吐容量、配售TROO股票份额以及发放质押队列配额。';

const clampPercent = (value) => Math.min(100, Math.max(0, Number(value) || 0));
const toPercent = (value) => Math.round(Number(value || 0) * 100);
const toRatio = (value) => Number((clampPercent(value) / 100).toFixed(4));
const pickPercentValue = (ratioValue, percentValue, fallbackPercent) => {
  if (ratioValue !== undefined && ratioValue !== null) return toPercent(ratioValue);
  if (percentValue !== undefined && percentValue !== null) return clampPercent(percentValue);
  return fallbackPercent;
};

export function normalizeRatioPair(changedField, value) {
  const normalized = clampPercent(value);
  if (changedField === 'queue') {
    return { buyRatio: 100 - normalized, queueRatio: normalized };
  }
  return { buyRatio: normalized, queueRatio: 100 - normalized };
}

export function createDefaultPlanForm() {
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

export function mapApiPackageToPlan(item = {}) {
  const price = Number(item.amount ?? item.price ?? 0);
  const commissionLimit = Number(item.commissionLimit ?? (Number(item.commissionMultiplier || 0) * price) ?? 0);

  return {
    id: String(item.id || item.code || ''),
    code: String(item.code || item.id || '').replace(/^plan-/i, '').toUpperCase(),
    name: item.name || '',
    price,
    giftRatio: Number(item.trooGiftRatio ?? item.giftRatio ?? 1),
    buyRatio: pickPercentValue(item.instantTrooRatio, item.buyRatio, 40),
    queueRatio: pickPercentValue(item.queueLockRatio, item.queueRatio, 60),
    commissionLimit,
    status: item.status === 'disabled' ? 'disabled' : 'enabled',
    description: item.description || DEFAULT_DESCRIPTION,
  };
}

export function mapPlanFormToPayload(form = {}) {
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

export function formatBonusRatio(value) {
  const ratio = Number(value || 1);
  if (ratio === 1) return '无额外赠比';
  return `+${Math.round((ratio - 1) * 100)}%`;
}

export function formatMoney(value) {
  return Number(value || 0).toLocaleString();
}

export { DEFAULT_DESCRIPTION };
