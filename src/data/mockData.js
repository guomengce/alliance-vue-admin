export const members = [
  { id: 'M10001', memberNo: 'AL-M10001', nickname: 'Ava Chen', email: 'ava.chen@example.com', phone: '+65 9000 1024', inviterId: null, status: 'active', level: 'Diamond', joinedAt: '2026-04-12 10:28:00', totalOrderAmount: 15000, teamSize: 5, kyc: { l1: 'approved', l2: 'approved' }, wallet: { usdtBalance: 24860, trooBalance: 74210, queueBalance: 19300 } },
  { id: 'M10002', memberNo: 'AL-M10002', nickname: 'Ben Ortiz', email: 'ben.ortiz@example.com', phone: '+1 415 555 0188', inviterId: 'M10001', status: 'active', level: 'Gold', joinedAt: '2026-04-18 14:06:00', totalOrderAmount: 1000, teamSize: 4, kyc: { l1: 'approved', l2: 'pending' }, wallet: { usdtBalance: 8460, trooBalance: 18550, queueBalance: 4650 } },
  { id: 'M10003', memberNo: 'AL-M10003', nickname: 'Mira Tan', email: 'mira.tan@example.com', phone: '+60 12 800 3344', inviterId: 'M10002', status: 'active', level: 'Silver', joinedAt: '2026-05-03 08:30:00', totalOrderAmount: 5000, teamSize: 3, kyc: { l1: 'approved', l2: 'not_submitted' }, wallet: { usdtBalance: 3260, trooBalance: 6890, queueBalance: 1550 } },
  { id: 'M10004', memberNo: 'AL-M10004', nickname: 'Noah Smith', email: 'noah.smith@example.com', phone: '+44 20 5555 0191', inviterId: 'M10003', status: 'disabled', level: 'Bronze', joinedAt: '2026-05-10 11:18:00', totalOrderAmount: 1000, teamSize: 2, kyc: { l1: 'pending', l2: 'not_submitted' }, wallet: { usdtBalance: 840, trooBalance: 720, queueBalance: 310 } },
  { id: 'M10005', memberNo: 'AL-M10005', nickname: 'Lina Zhao', email: 'lina.zhao@example.com', phone: '+86 138 0000 7788', inviterId: 'M10004', status: 'active', level: 'Starter', joinedAt: '2026-05-17 16:45:00', totalOrderAmount: 10000, teamSize: 1, kyc: { l1: 'approved', l2: 'pending' }, wallet: { usdtBalance: 1160, trooBalance: 7100, queueBalance: 3100 } },
  { id: 'M10006', memberNo: 'AL-M10006', nickname: 'Owen Park', email: 'owen.park@example.com', phone: '+82 10 5555 1020', inviterId: 'M10005', status: 'active', level: 'Starter', joinedAt: '2026-05-20 12:03:00', totalOrderAmount: 0, teamSize: 0, kyc: { l1: 'approved', l2: 'not_submitted' }, wallet: { usdtBalance: 620, trooBalance: 0, queueBalance: 0 } },
];

export const packages = [
  { id: 'PKG-A', code: 'A', name: 'Package A', amount: 1000, currency: 'USDT', commissionMultiplier: 2, trooGiftRatio: 0.01, instantTrooRatio: 0.7, queueLockRatio: 0.31, status: 'enabled', sort: 1 },
  { id: 'PKG-B', code: 'B', name: 'Package B', amount: 5000, currency: 'USDT', commissionMultiplier: 3, trooGiftRatio: 0.008, instantTrooRatio: 0.7, queueLockRatio: 0.31, status: 'enabled', sort: 2 },
  { id: 'PKG-C', code: 'C', name: 'Package C', amount: 10000, currency: 'USDT', commissionMultiplier: 5, trooGiftRatio: 0.005, instantTrooRatio: 0.7, queueLockRatio: 0.31, status: 'enabled', sort: 3 },
  { id: 'PKG-D', code: 'D', name: 'Package D', amount: 50000, currency: 'USDT', commissionMultiplier: 7, trooGiftRatio: 0, instantTrooRatio: 0.7, queueLockRatio: 0.31, status: 'disabled', sort: 4 },
];

export const orders = [
  { id: 'ORD-7001', memberId: 'M10001', memberName: 'Ava Chen', packageId: 'PKG-C', packageName: 'Package C', amount: 10000, status: 'paid', paidAt: '2026-05-18 12:30:00', instantTroo: 7000, queueLocked: 3100, commissionCapacity: 50000, abnormal: false },
  { id: 'ORD-7002', memberId: 'M10001', memberName: 'Ava Chen', packageId: 'PKG-B', packageName: 'Package B', amount: 5000, status: 'paid', paidAt: '2026-05-22 09:18:00', instantTroo: 3500, queueLocked: 1550, commissionCapacity: 15000, abnormal: false },
  { id: 'ORD-7003', memberId: 'M10002', memberName: 'Ben Ortiz', packageId: 'PKG-A', packageName: 'Package A', amount: 1000, status: 'paid', paidAt: '2026-05-23 13:47:00', instantTroo: 700, queueLocked: 310, commissionCapacity: 2000, abnormal: false },
  { id: 'ORD-7004', memberId: 'M10003', memberName: 'Mira Tan', packageId: 'PKG-B', packageName: 'Package B', amount: 5000, status: 'timeout', paidAt: null, instantTroo: 0, queueLocked: 0, commissionCapacity: 0, abnormal: true },
];

export const commissionPools = [
  { memberId: 'M10001', memberName: 'Ava Chen', capacity: 65000, used: 18420, remaining: 46580, replenishmentRequired: false },
  { memberId: 'M10002', memberName: 'Ben Ortiz', capacity: 17000, used: 8960, remaining: 8040, replenishmentRequired: false },
  { memberId: 'M10003', memberName: 'Mira Tan', capacity: 2000, used: 1860, remaining: 140, replenishmentRequired: true },
];

export const commissionDistribution = [
  { id: 'COM-5001', memberId: 'M10001', memberName: 'Ava Chen', sourceMemberId: 'M10002', sourceOrderId: 'ORD-7003', level: 1, rate: 0.1, amount: 100, status: 'settled', settledAt: '2026-05-24 04:00:00' },
  { id: 'COM-5002', memberId: 'M10001', memberName: 'Ava Chen', sourceMemberId: 'M10003', sourceOrderId: 'ORD-7004', level: 2, rate: 0.05, amount: 250, status: 'settled', settledAt: '2026-05-25 04:00:00' },
  { id: 'COM-5003', memberId: 'M10002', memberName: 'Ben Ortiz', sourceMemberId: 'M10003', sourceOrderId: 'ORD-7004', level: 1, rate: 0.1, amount: 500, status: 'pending', settledAt: null },
];

export const commissionOverflow = [
  { id: 'OV-1001', memberId: 'M10003', memberName: 'Mira Tan', sourceCommissionId: 'COM-4988', fromLevel: 1, overflowAmount: 360, routedTo: 'company_pool', reason: 'credit_pool_exhausted', createdAt: '2026-05-21 04:00:00' },
  { id: 'OV-1002', memberId: 'M10004', memberName: 'Noah Smith', sourceCommissionId: 'COM-4994', fromLevel: 2, overflowAmount: 80, routedTo: 'upline_pool', reason: 'account_disabled', createdAt: '2026-05-23 04:00:00' },
];

export const queueAccounts = [
  { id: 'QA-M10001', memberId: 'M10001', memberName: 'Ava Chen', lockedAmount: 19300, unlockedAmount: 7600, unlockProgress: 0.2827, nextUnlockEstimate: 500 },
  { id: 'QA-M10002', memberId: 'M10002', memberName: 'Ben Ortiz', lockedAmount: 4650, unlockedAmount: 860, unlockProgress: 0.156, nextUnlockEstimate: 100 },
  { id: 'QA-M10003', memberId: 'M10003', memberName: 'Mira Tan', lockedAmount: 1550, unlockedAmount: 300, unlockProgress: 0.162, nextUnlockEstimate: 0 },
];

export const unlockRecords = [
  { id: 'UNL-3001', memberId: 'M10001', memberName: 'Ava Chen', sourceMemberId: 'M10002', sourceOrderId: 'ORD-7003', amount: 100, status: 'settled', unlockedAt: '2026-05-24 04:00:00' },
  { id: 'UNL-3002', memberId: 'M10001', memberName: 'Ava Chen', sourceMemberId: 'M10002', sourceOrderId: 'ORD-7010', amount: 500, status: 'pending', unlockedAt: null },
  { id: 'UNL-3003', memberId: 'M10002', memberName: 'Ben Ortiz', sourceMemberId: 'M10003', sourceOrderId: 'ORD-7004', amount: 100, status: 'settled', unlockedAt: '2026-05-25 04:00:00' },
];

export const settlements = [
  { id: 'SET-20260524', date: '2026-05-24', orderCount: 8, orderAmount: 28000, commissionAmount: 1420, queueUnlockAmount: 680, overflowAmount: 120, status: 'completed', runAt: '2026-05-25 04:00:00' },
  { id: 'SET-20260525', date: '2026-05-25', orderCount: 6, orderAmount: 19000, commissionAmount: 960, queueUnlockAmount: 410, overflowAmount: 80, status: 'completed', runAt: '2026-05-26 04:00:00' },
  { id: 'SET-20260527', date: '2026-05-27', orderCount: 4, orderAmount: 12000, commissionAmount: 650, queueUnlockAmount: 210, overflowAmount: 0, status: 'pending', runAt: null },
];

export const financeRecords = [
  { id: 'FIN-8001', memberId: 'M10001', memberName: 'Ava Chen', type: 'deposit', asset: 'USDT', amount: 10000, fee: 0, status: 'confirmed', createdAt: '2026-05-22 09:11:00' },
  { id: 'FIN-8002', memberId: 'M10001', memberName: 'Ava Chen', type: 'withdrawal', asset: 'USDT', amount: -500, fee: 15, status: 'processing', createdAt: '2026-05-25 15:28:00' },
  { id: 'FIN-8003', memberId: 'M10002', memberName: 'Ben Ortiz', type: 'commission', asset: 'USDT', amount: 500, fee: 0, status: 'settled', createdAt: '2026-05-25 04:00:00' },
  { id: 'FIN-8004', memberId: 'M10002', memberName: 'Ben Ortiz', type: 'unlock', asset: 'USDT', amount: 100, fee: 0, status: 'settled', createdAt: '2026-05-25 04:00:00' },
];

export const companyBalance = {
  usdtAvailable: 482300,
  usdtFrozen: 18400,
  trooReserve: 1280000,
  overflowPool: 8120,
  withdrawalFeeIncome: 420,
};

export const trooAssets = {
  issued: 3450000,
  circulating: 2180000,
  reserve: 1270000,
  memberHoldings: 1082000,
  price: 0.82,
  priceChange24h: 0.036,
};

export const configs = {
  packages: { instantTrooRatio: 0.7, queueLockRatio: 0.31, enabledPackageCodes: ['A', 'B', 'C'] },
  commissions: { ratios: { l1: 0.1, l2: 0.05, l3: 0.03, l4: 0.02, l5: 0.01 }, unlockRatio: 0.1, overflowTarget: 'company_pool' },
  system: { settlementTime: '04:00', timezone: 'GMT+8', withdrawalFee: 15, replenishmentReminderThreshold: 0.1, kycManualReview: true },
  trooPriceSource: { provider: 'mock-oracle', endpoint: 'https://oracle.example.com/troo-usdt', refreshSeconds: 60, fallbackPrice: 0.82 },
};

export const notificationTemplates = [
  { id: 'TPL-1001', name: 'Commission Arrival', type: 'commission', channel: 'in_app', title: 'Commission arrived', content: 'Hi {{memberName}}, {{amount}} USDT commission has settled.', status: 'enabled', updatedAt: '2026-05-20 18:00:00' },
  { id: 'TPL-1002', name: 'Settlement Result', type: 'settlement', channel: 'email', title: 'Daily settlement completed', content: 'Settlement {{date}} completed at {{time}}.', status: 'enabled', updatedAt: '2026-05-21 09:00:00' },
  { id: 'TPL-1003', name: 'Replenishment Reminder', type: 'replenishment', channel: 'sms', title: 'Credit pool reminder', content: 'Your remaining pool is below {{threshold}}.', status: 'disabled', updatedAt: '2026-05-22 11:30:00' },
];

export const notificationHistory = [
  { id: 'MSG-4001', templateId: 'TPL-1001', targetMemberId: 'M10001', channel: 'in_app', status: 'delivered', sentAt: '2026-05-24 04:05:00' },
  { id: 'MSG-4002', templateId: 'TPL-1002', targetMemberId: 'all', channel: 'email', status: 'delivered', sentAt: '2026-05-25 04:03:00' },
];

export const dashboard = {
  summary: { totalMembers: 1286, todayNewMembers: 36, todayOrders: 42, todayOrderAmount: 96000, todayCommission: 8240, queueLockedAmount: 238600, companyBalance: 482300, trooPrice: 0.82 },
  membersTrend: [
    { date: '2026-05-22', newMembers: 18, activeMembers: 960 },
    { date: '2026-05-23', newMembers: 24, activeMembers: 982 },
    { date: '2026-05-24', newMembers: 20, activeMembers: 1008 },
    { date: '2026-05-25', newMembers: 31, activeMembers: 1040 },
    { date: '2026-05-26', newMembers: 28, activeMembers: 1086 },
    { date: '2026-05-27', newMembers: 33, activeMembers: 1124 },
    { date: '2026-05-28', newMembers: 36, activeMembers: 1172 },
  ],
  orderTrend: [
    { date: '2026-05-22', orders: 26, amount: 52000 },
    { date: '2026-05-23', orders: 33, amount: 74000 },
    { date: '2026-05-24', orders: 28, amount: 63000 },
    { date: '2026-05-25', orders: 36, amount: 82000 },
    { date: '2026-05-26', orders: 39, amount: 91000 },
    { date: '2026-05-27', orders: 34, amount: 78000 },
    { date: '2026-05-28', orders: 42, amount: 96000 },
  ],
  commissionTrend: [
    { date: '2026-05-22', settled: 4200, overflow: 120 },
    { date: '2026-05-23', settled: 5100, overflow: 80 },
    { date: '2026-05-24', settled: 4980, overflow: 140 },
    { date: '2026-05-25', settled: 6100, overflow: 60 },
    { date: '2026-05-26', settled: 7120, overflow: 90 },
    { date: '2026-05-27', settled: 6880, overflow: 0 },
    { date: '2026-05-28', settled: 8240, overflow: 120 },
  ],
};

export const reports = {
  team: [
    { date: '2026-05-28', rootMemberId: 'M10001', levels: 5, totalMembers: 5, activeMembers: 5, orderAmount: 17000 },
    { date: '2026-05-28', rootMemberId: 'M10002', levels: 4, totalMembers: 4, activeMembers: 3, orderAmount: 16000 },
  ],
  commission: [
    { date: '2026-05-28', level: 1, amount: 4200, count: 82 },
    { date: '2026-05-28', level: 2, amount: 2100, count: 45 },
    { date: '2026-05-28', level: 3, amount: 900, count: 22 },
    { date: '2026-05-28', level: 4, amount: 640, count: 18 },
    { date: '2026-05-28', level: 5, amount: 400, count: 10 },
  ],
  operations: [
    { date: '2026-05-28', deposits: 126000, withdrawals: 28000, orderAmount: 96000, settlementStatus: 'running' },
    { date: '2026-05-27', deposits: 102000, withdrawals: 19000, orderAmount: 78000, settlementStatus: 'completed' },
  ],
};

