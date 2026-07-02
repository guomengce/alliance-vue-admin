import {
  commissionDistribution,
  commissionOverflow,
  commissionPools,
  companyBalance,
  configs,
  dashboard,
  financeRecords,
  members,
  notificationHistory,
  notificationTemplates,
  orders,
  packages,
  queueAccounts,
  reports,
  settlements,
  trooAssets,
  unlockRecords,
} from '../data/mockData';

function clone(data) {
  if (data == null) return data;
  if (typeof structuredClone === 'function') return structuredClone(data);
  return JSON.parse(JSON.stringify(data));
}

const ok = (data) => ({ code: 0, message: 'success', data: clone(data) });
const notFound = () => ({ code: 404, message: 'Mock endpoint not found', data: null });

function list(items, params = {}) {
  const page = Number(params.page || 1);
  const pageSize = Number(params.pageSize || params.limit || 10);
  const start = (page - 1) * pageSize;

  return {
    items: clone(items.slice(start, start + pageSize)),
    total: items.length,
    page,
    pageSize,
  };
}

function normalize(method, url) {
  return {
    method: String(method || 'GET').toUpperCase(),
    path: String(url || '').split('?')[0].replace(/\/$/, ''),
  };
}

function now() {
  return '2026-05-28 14:00:00';
}

function withMemberDetail(member) {
  if (!member) return null;
  return {
    ...member,
    orders: orders.filter((order) => order.memberId === member.id),
    downlines: members.filter((item) => item.inviterId === member.id),
    commissionPool: commissionPools.find((pool) => pool.memberId === member.id),
    queueAccount: queueAccounts.find((queue) => queue.memberId === member.id),
  };
}

function orderStats() {
  const paidOrders = orders.filter((order) => order.status === 'paid');
  return {
    today: { count: 42, amount: 96000 },
    week: { count: 238, amount: 552000 },
    month: { count: 986, amount: 2216000 },
    abnormalCount: orders.filter((order) => order.abnormal).length,
    packageBreakdown: packages.map((item) => ({
      packageId: item.id,
      packageName: item.name,
      count: paidOrders.filter((order) => order.packageId === item.id).length,
      amount: paidOrders.filter((order) => order.packageId === item.id).reduce((sum, order) => sum + order.amount, 0),
    })),
  };
}

function commissionStats() {
  return {
    pendingAmount: commissionDistribution.filter((item) => item.status === 'pending').reduce((sum, item) => sum + item.amount, 0),
    settledAmount: commissionDistribution.filter((item) => item.status === 'settled').reduce((sum, item) => sum + item.amount, 0),
    overflowAmount: commissionOverflow.reduce((sum, item) => sum + item.overflowAmount, 0),
    byLevel: [1, 2, 3, 4, 5].map((level) => ({
      level,
      amount: commissionDistribution.filter((item) => item.level === level).reduce((sum, item) => sum + item.amount, 0),
    })),
  };
}

export async function mockRequest({ method = 'GET', url, data, params } = {}) {
  const route = normalize(method, url);
  const { path } = route;

  if (route.method === 'GET' && path === '/api/v1/admin/dashboard/summary') return ok(dashboard.summary);
  if (route.method === 'GET' && path === '/api/v1/admin/dashboard/members') return ok(list(dashboard.membersTrend, params));
  if (route.method === 'GET' && path === '/api/v1/admin/dashboard/orders') return ok(list(dashboard.orderTrend, params));
  if (route.method === 'GET' && path === '/api/v1/admin/dashboard/commissions') return ok(list(dashboard.commissionTrend, params));
  if (route.method === 'GET' && path === '/api/v1/admin/dashboard/troo-price') return ok({ price: trooAssets.price, change24h: trooAssets.priceChange24h, source: configs.trooPriceSource.provider, updatedAt: now() });

  if (route.method === 'GET' && path === '/api/v1/admin/members') return ok(list(members, params));

  const memberStatusMatch = path.match(/^\/api\/v1\/admin\/members\/([^/]+)\/status$/);
  if (route.method === 'PUT' && memberStatusMatch) {
    const member = members.find((item) => item.id === memberStatusMatch[1]);
    if (!member) return notFound();
    member.status = data?.status || member.status;
    return ok(member);
  }

  const memberKycMatch = path.match(/^\/api\/v1\/admin\/members\/([^/]+)\/kyc-review$/);
  if (route.method === 'POST' && memberKycMatch) {
    const member = members.find((item) => item.id === memberKycMatch[1]);
    if (!member) return notFound();
    member.kyc[data?.level || 'l2'] = data?.status || 'approved';
    return ok({ memberId: member.id, kyc: member.kyc, reviewer: data?.reviewer || 'admin', reviewedAt: now() });
  }

  const memberDownlinesMatch = path.match(/^\/api\/v1\/admin\/members\/([^/]+)\/downlines$/);
  if (route.method === 'GET' && memberDownlinesMatch) {
    const rootId = memberDownlinesMatch[1];
    const rows = [];
    let currentIds = [rootId];
    for (let level = 1; level <= 5; level += 1) {
      const next = members.filter((member) => currentIds.includes(member.inviterId));
      rows.push(...next.map((member) => ({ ...member, level })));
      currentIds = next.map((member) => member.id);
    }
    return ok(list(rows, params));
  }

  const memberMatch = path.match(/^\/api\/v1\/admin\/members\/([^/]+)$/);
  if (route.method === 'GET' && memberMatch) {
    const member = withMemberDetail(members.find((item) => item.id === memberMatch[1]));
    return member ? ok(member) : notFound();
  }

  if (route.method === 'GET' && path === '/api/v1/admin/packages') return ok(list(packages, params));
  if (route.method === 'POST' && path === '/api/v1/admin/packages') {
    const item = { id: `PKG-${data?.code || packages.length + 1}`, status: 'enabled', sort: packages.length + 1, ...data };
    packages.push(item);
    return ok(item);
  }

  const packageStatusMatch = path.match(/^\/api\/v1\/admin\/packages\/([^/]+)\/status$/);
  if (route.method === 'PUT' && packageStatusMatch) {
    const item = packages.find((pkg) => pkg.id === packageStatusMatch[1]);
    if (!item) return notFound();
    item.status = data?.status || item.status;
    return ok(item);
  }

  const packageMatch = path.match(/^\/api\/v1\/admin\/packages\/([^/]+)$/);
  if (packageMatch) {
    const item = packages.find((pkg) => pkg.id === packageMatch[1]);
    if (!item) return notFound();
    if (route.method === 'GET') return ok(item);
    if (route.method === 'PUT') {
      Object.assign(item, data);
      return ok(item);
    }
  }

  if (route.method === 'GET' && path === '/api/v1/admin/orders/statistics') return ok(orderStats());
  if (route.method === 'GET' && path === '/api/v1/admin/orders') return ok(list(orders, params));

  const orderStatusMatch = path.match(/^\/api\/v1\/admin\/orders\/([^/]+)\/status$/);
  if (route.method === 'PUT' && orderStatusMatch) {
    const order = orders.find((item) => item.id === orderStatusMatch[1]);
    if (!order) return notFound();
    order.status = data?.status || order.status;
    order.abnormal = ['timeout', 'failed', 'refunded'].includes(order.status);
    return ok(order);
  }

  const orderMatch = path.match(/^\/api\/v1\/admin\/orders\/([^/]+)$/);
  if (route.method === 'GET' && orderMatch) {
    const order = orders.find((item) => item.id === orderMatch[1]);
    return order ? ok({ ...order, member: members.find((member) => member.id === order.memberId), package: packages.find((pkg) => pkg.id === order.packageId) }) : notFound();
  }

  if (route.method === 'GET' && path === '/api/v1/admin/commissions/pool') return ok(list(commissionPools, params));
  if (route.method === 'GET' && path === '/api/v1/admin/commissions/distribution') return ok(list(commissionDistribution, params));
  if (route.method === 'GET' && path === '/api/v1/admin/commissions/overflow') return ok(list(commissionOverflow, params));
  if (route.method === 'GET' && path === '/api/v1/admin/commissions/statistics') return ok(commissionStats());
  if (route.method === 'POST' && path === '/api/v1/admin/commissions/settle') {
    commissionDistribution.forEach((item) => {
      if (item.status === 'pending') {
        item.status = 'settled';
        item.settledAt = now();
      }
    });
    return ok({ settled: true, runAt: now(), operator: data?.operator || 'admin' });
  }

  if (route.method === 'GET' && path === '/api/v1/admin/queue/accounts') return ok(list(queueAccounts, params));
  if (route.method === 'GET' && path === '/api/v1/admin/queue/locked-amount') return ok({ lockedAmount: queueAccounts.reduce((sum, item) => sum + item.lockedAmount, 0), accountCount: queueAccounts.length });
  if (route.method === 'GET' && path === '/api/v1/admin/queue/unlock-records') return ok(list(unlockRecords, params));

  const queueMatch = path.match(/^\/api\/v1\/admin\/queue\/accounts\/([^/]+)$/);
  if (route.method === 'GET' && queueMatch) {
    const account = queueAccounts.find((item) => item.id === queueMatch[1] || item.memberId === queueMatch[1]);
    return account ? ok(account) : notFound();
  }

  if (route.method === 'GET' && path === '/api/v1/admin/settlements/overflow') return ok(list(commissionOverflow.map((item) => ({ ...item, settlementStatus: 'pending_review' })), params));
  if (route.method === 'GET' && path === '/api/v1/admin/settlements') return ok(list(settlements, params));
  if (route.method === 'POST' && (path === '/api/v1/admin/settlements/daily' || path === '/api/v1/admin/settlements/manual')) {
    const item = {
      id: `SET-${String(data?.date || '20260528').replaceAll('-', '')}-${settlements.length + 1}`,
      date: data?.date || '2026-05-28',
      orderCount: 42,
      orderAmount: 96000,
      commissionAmount: 8240,
      queueUnlockAmount: 1200,
      overflowAmount: 120,
      status: 'running',
      runAt: now(),
      triggerType: path.endsWith('/daily') ? 'daily' : 'manual',
    };
    settlements.unshift(item);
    return ok(item);
  }

  const settlementMatch = path.match(/^\/api\/v1\/admin\/settlements\/([^/]+)$/);
  if (route.method === 'GET' && settlementMatch) {
    const settlement = settlements.find((item) => item.id === settlementMatch[1]);
    return settlement ? ok(settlement) : notFound();
  }

  if (route.method === 'GET' && path === '/api/v1/admin/finance/wallets') return ok(list(members.map((member) => ({ memberId: member.id, memberName: member.nickname, ...member.wallet })), params));
  if (route.method === 'GET' && path === '/api/v1/admin/finance/company-balance') return ok(companyBalance);
  if (route.method === 'GET' && path === '/api/v1/admin/finance/records') return ok(list(financeRecords, params));
  if (route.method === 'GET' && path === '/api/v1/admin/finance/troo-assets') return ok(trooAssets);
  if (route.method === 'POST' && path === '/api/v1/admin/finance/adjust') {
    const record = { id: `FIN-${8000 + financeRecords.length + 1}`, type: 'manual_adjustment', status: 'confirmed', createdAt: now(), operator: data?.operator || 'admin', ...data };
    financeRecords.unshift(record);
    return ok(record);
  }

  if (route.method === 'GET' && path === '/api/v1/admin/config/packages') return ok(configs.packages);
  if (route.method === 'PUT' && path === '/api/v1/admin/config/packages') {
    Object.assign(configs.packages, data);
    return ok(configs.packages);
  }
  if (route.method === 'GET' && path === '/api/v1/admin/config/commissions') return ok(configs.commissions);
  if (route.method === 'PUT' && path === '/api/v1/admin/config/commissions') {
    Object.assign(configs.commissions, data);
    return ok(configs.commissions);
  }
  if (route.method === 'GET' && path === '/api/v1/admin/config/system') return ok(configs.system);
  if (route.method === 'PUT' && path === '/api/v1/admin/config/system') {
    Object.assign(configs.system, data);
    return ok(configs.system);
  }
  if (route.method === 'GET' && path === '/api/v1/admin/config/troo-price-source') return ok(configs.trooPriceSource);
  if (route.method === 'PUT' && path === '/api/v1/admin/config/troo-price-source') {
    Object.assign(configs.trooPriceSource, data);
    return ok(configs.trooPriceSource);
  }

  if (route.method === 'GET' && path === '/api/v1/admin/notifications/templates') return ok(list(notificationTemplates, params));
  if (route.method === 'POST' && path === '/api/v1/admin/notifications/templates') {
    const template = { id: `TPL-${1000 + notificationTemplates.length + 1}`, status: 'enabled', updatedAt: now(), ...data };
    notificationTemplates.push(template);
    return ok(template);
  }
  if (route.method === 'POST' && path === '/api/v1/admin/notifications/send') {
    const message = { id: `MSG-${4000 + notificationHistory.length + 1}`, status: 'delivered', sentAt: now(), ...data };
    notificationHistory.unshift(message);
    return ok(message);
  }
  if (route.method === 'GET' && path === '/api/v1/admin/notifications/history') return ok(list(notificationHistory, params));

  const templateMatch = path.match(/^\/api\/v1\/admin\/notifications\/templates\/([^/]+)$/);
  if (templateMatch) {
    const template = notificationTemplates.find((item) => item.id === templateMatch[1]);
    if (!template) return notFound();
    if (route.method === 'GET') return ok(template);
    if (route.method === 'PUT') {
      Object.assign(template, data, { updatedAt: now() });
      return ok(template);
    }
  }

  if (route.method === 'GET' && path === '/api/v1/admin/reports/team') return ok(list(reports.team, params));
  if (route.method === 'GET' && path === '/api/v1/admin/reports/commission') return ok(list(reports.commission, params));
  if (route.method === 'GET' && path === '/api/v1/admin/reports/operations') return ok(list(reports.operations, params));
  if (route.method === 'POST' && path === '/api/v1/admin/reports/export') {
    return ok({ exportId: `EXP-${Date.now()}`, reportType: data?.reportType || 'operations', format: data?.format || 'xlsx', status: 'ready', downloadUrl: '/mock-downloads/alliance-report.xlsx' });
  }

  return notFound();
}
