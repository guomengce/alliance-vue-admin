import { request } from './http';

export const getDashboardSummary = () => request({ url: '/api/v1/admin/dashboard/summary' });
export const getDashboardMembers = (params) => request({ url: '/api/v1/admin/dashboard/members', params });
export const getDashboardOrders = (params) => request({ url: '/api/v1/admin/dashboard/orders', params });
export const getDashboardCommissions = (params) => request({ url: '/api/v1/admin/dashboard/commissions', params });
export const getDashboardTrooPrice = () => request({ url: '/api/v1/admin/dashboard/troo-price' });

export const getAdminMembers = (params) => request({ url: '/api/v1/admin/members', params });
export const getAdminMember = (id) => request({ url: `/api/v1/admin/members/${id}` });
export const updateAdminMemberStatus = (id, data) => request({ method: 'PUT', url: `/api/v1/admin/members/${id}/status`, data });
export const reviewAdminMemberKyc = (id, data) => request({ method: 'POST', url: `/api/v1/admin/members/${id}/kyc-review`, data });
export const getAdminMemberDownlines = (id, params) => request({ url: `/api/v1/admin/members/${id}/downlines`, params });

export const getAdminPackages = (params) => request({ url: '/api/v1/admin/packages', params });
export const createAdminPackage = (data) => request({ method: 'POST', url: '/api/v1/admin/packages', data });
export const getAdminPackage = (id) => request({ url: `/api/v1/admin/packages/${id}` });
export const updateAdminPackage = (id, data) => request({ method: 'PUT', url: `/api/v1/admin/packages/${id}`, data });
export const updateAdminPackageStatus = (id, data) => request({ method: 'PUT', url: `/api/v1/admin/packages/${id}/status`, data });

export const getAdminOrders = (params) => request({ url: '/api/v1/admin/orders', params });
export const getAdminOrder = (id) => request({ url: `/api/v1/admin/orders/${id}` });
export const updateAdminOrderStatus = (id, data) => request({ method: 'PUT', url: `/api/v1/admin/orders/${id}/status`, data });
export const getAdminOrderStatistics = (params) => request({ url: '/api/v1/admin/orders/statistics', params });

export const getAdminCommissionPool = (params) => request({ url: '/api/v1/admin/commissions/pool', params });
export const getAdminCommissionDistribution = (params) => request({ url: '/api/v1/admin/commissions/distribution', params });
export const getAdminCommissionOverflow = (params) => request({ url: '/api/v1/admin/commissions/overflow', params });
export const getAdminCommissionStatistics = (params) => request({ url: '/api/v1/admin/commissions/statistics', params });
export const settleAdminCommissions = (data) => request({ method: 'POST', url: '/api/v1/admin/commissions/settle', data });

export const getAdminQueueAccounts = (params) => request({ url: '/api/v1/admin/queue/accounts', params });
export const getAdminQueueAccount = (id) => request({ url: `/api/v1/admin/queue/accounts/${id}` });
export const getAdminQueueLockedAmount = () => request({ url: '/api/v1/admin/queue/locked-amount' });
export const getAdminQueueUnlockRecords = (params) => request({ url: '/api/v1/admin/queue/unlock-records', params });

export const getAdminSettlements = (params) => request({ url: '/api/v1/admin/settlements', params });
export const getAdminSettlement = (id) => request({ url: `/api/v1/admin/settlements/${id}` });
export const triggerAdminDailySettlement = (data) => request({ method: 'POST', url: '/api/v1/admin/settlements/daily', data });
export const triggerAdminManualSettlement = (data) => request({ method: 'POST', url: '/api/v1/admin/settlements/manual', data });
export const getAdminSettlementOverflow = (params) => request({ url: '/api/v1/admin/settlements/overflow', params });

export const getAdminFinanceWallets = (params) => request({ url: '/api/v1/admin/finance/wallets', params });
export const getAdminCompanyBalance = () => request({ url: '/api/v1/admin/finance/company-balance' });
export const getAdminFinanceRecords = (params) => request({ url: '/api/v1/admin/finance/records', params });
export const getAdminTrooAssets = () => request({ url: '/api/v1/admin/finance/troo-assets' });
export const adjustAdminFinance = (data) => request({ method: 'POST', url: '/api/v1/admin/finance/adjust', data });

export const getAdminPackageConfig = () => request({ url: '/api/v1/admin/config/packages' });
export const updateAdminPackageConfig = (data) => request({ method: 'PUT', url: '/api/v1/admin/config/packages', data });
export const getAdminCommissionConfig = () => request({ url: '/api/v1/admin/config/commissions' });
export const updateAdminCommissionConfig = (data) => request({ method: 'PUT', url: '/api/v1/admin/config/commissions', data });
export const getAdminSystemConfig = () => request({ url: '/api/v1/admin/config/system' });
export const updateAdminSystemConfig = (data) => request({ method: 'PUT', url: '/api/v1/admin/config/system', data });
export const getAdminTrooPriceSourceConfig = () => request({ url: '/api/v1/admin/config/troo-price-source' });
export const updateAdminTrooPriceSourceConfig = (data) => request({ method: 'PUT', url: '/api/v1/admin/config/troo-price-source', data });

export const getAdminNotificationTemplates = (params) => request({ url: '/api/v1/admin/notifications/templates', params });
export const createAdminNotificationTemplate = (data) => request({ method: 'POST', url: '/api/v1/admin/notifications/templates', data });
export const getAdminNotificationTemplate = (id) => request({ url: `/api/v1/admin/notifications/templates/${id}` });
export const updateAdminNotificationTemplate = (id, data) => request({ method: 'PUT', url: `/api/v1/admin/notifications/templates/${id}`, data });
export const sendAdminNotification = (data) => request({ method: 'POST', url: '/api/v1/admin/notifications/send', data });
export const getAdminNotificationHistory = (params) => request({ url: '/api/v1/admin/notifications/history', params });

export const getAdminTeamReport = (params) => request({ url: '/api/v1/admin/reports/team', params });
export const getAdminCommissionReport = (params) => request({ url: '/api/v1/admin/reports/commission', params });
export const getAdminOperationsReport = (params) => request({ url: '/api/v1/admin/reports/operations', params });
export const exportAdminReport = (data) => request({ method: 'POST', url: '/api/v1/admin/reports/export', data });

