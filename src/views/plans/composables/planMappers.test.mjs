import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createDefaultPlanForm,
  formatBonusRatio,
  mapApiPackageToPlan,
  mapPlanFormToPayload,
  normalizeRatioPair,
} from './planMappers.mjs';

test('maps package api fields to plan card fields', () => {
  const plan = mapApiPackageToPlan({
    id: 'pkg-a',
    code: 'A',
    name: '套餐 A',
    amount: 1000,
    trooGiftRatio: 1.1,
    instantTrooRatio: 0.4,
    queueLockRatio: 0.6,
    commissionLimit: 5000,
    status: 'enabled',
  });

  assert.deepEqual(plan, {
    id: 'pkg-a',
    code: 'A',
    name: '套餐 A',
    price: 1000,
    giftRatio: 1.1,
    buyRatio: 40,
    queueRatio: 60,
    commissionLimit: 5000,
    status: 'enabled',
    description: '系统管理员限定理财分销等级档。被用户充值认购后，将为其释放高额下级团队佣金提款吞吐容量、配售TROO股票份额以及发放质押队列配额。',
  });
});

test('uses react default ratios when api ratios are missing', () => {
  const plan = mapApiPackageToPlan({ id: 'pkg-x', name: '套餐 X', amount: 1000 });

  assert.equal(plan.buyRatio, 40);
  assert.equal(plan.queueRatio, 60);
});

test('maps plan form back to current package payload shape', () => {
  const payload = mapPlanFormToPayload({
    id: 'pkg-a',
    code: 'A',
    name: '套餐 A',
    price: 1000,
    giftRatio: 1.1,
    buyRatio: 40,
    queueRatio: 60,
    commissionLimit: 5000,
    description: '规则说明',
    status: 'enabled',
  });

  assert.deepEqual(payload, {
    id: 'pkg-a',
    code: 'A',
    name: '套餐 A',
    amount: 1000,
    currency: 'USDT',
    commissionMultiplier: 5,
    commissionLimit: 5000,
    trooGiftRatio: 1.1,
    instantTrooRatio: 0.4,
    queueLockRatio: 0.6,
    description: '规则说明',
    status: 'enabled',
  });
});

test('keeps buy and queue ratios adding to 100', () => {
  assert.deepEqual(normalizeRatioPair('buy', 37), { buyRatio: 37, queueRatio: 63 });
  assert.deepEqual(normalizeRatioPair('queue', 80), { buyRatio: 20, queueRatio: 80 });
  assert.deepEqual(normalizeRatioPair('buy', 120), { buyRatio: 100, queueRatio: 0 });
});

test('creates a complete default form', () => {
  assert.deepEqual(createDefaultPlanForm(), {
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
  });
});

test('formats bonus ratio like the react page', () => {
  assert.equal(formatBonusRatio(1), '无额外赠比');
  assert.equal(formatBonusRatio(1.1), '+10%');
});
