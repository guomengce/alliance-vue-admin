export function getDashboardSummary(): Promise<any>;
export function getDashboardMembers(params?: any): Promise<any>;
export function getDashboardOrders(params?: any): Promise<any>;
export function getDashboardCommissions(params?: any): Promise<any>;
export function getDashboardTrooPrice(): Promise<any>;

export function getAdminMembers(params?: any): Promise<any>;
export function getAdminMember(id: string): Promise<any>;
export function updateAdminMemberStatus(id: string, data: any): Promise<any>;
export function reviewAdminMemberKyc(id: string, data: any): Promise<any>;
export function getAdminMemberDownlines(id: string, params?: any): Promise<any>;

export function getAdminPackages(params?: any): Promise<any>;
export function createAdminPackage(data: any): Promise<any>;
export function getAdminPackage(id: string): Promise<any>;
export function updateAdminPackage(id: string, data: any): Promise<any>;
export function updateAdminPackageStatus(id: string, data: any): Promise<any>;

export function getAdminOrders(params?: any): Promise<any>;
export function getAdminOrder(id: string): Promise<any>;
export function updateAdminOrderStatus(id: string, data: any): Promise<any>;
export function getAdminOrderStatistics(params?: any): Promise<any>;

export function getAdminCommissionPool(params?: any): Promise<any>;
export function getAdminCommissionDistribution(params?: any): Promise<any>;
export function getAdminCommissionOverflow(params?: any): Promise<any>;
export function getAdminCommissionStatistics(params?: any): Promise<any>;
export function settleAdminCommissions(data: any): Promise<any>;

export function getAdminQueueAccounts(params?: any): Promise<any>;
export function getAdminQueueAccount(id: string): Promise<any>;
export function getAdminQueueLockedAmount(): Promise<any>;
export function getAdminQueueUnlockRecords(params?: any): Promise<any>;

export function getAdminSettlements(params?: any): Promise<any>;
export function getAdminSettlement(id: string): Promise<any>;
export function triggerAdminDailySettlement(data: any): Promise<any>;
export function triggerAdminManualSettlement(data: any): Promise<any>;
export function getAdminSettlementOverflow(params?: any): Promise<any>;

export function getAdminFinanceWallets(params?: any): Promise<any>;
export function getAdminCompanyBalance(): Promise<any>;
export function getAdminFinanceRecords(params?: any): Promise<any>;
export function getAdminTrooAssets(): Promise<any>;
export function adjustAdminFinance(data: any): Promise<any>;

export function getAdminPackageConfig(): Promise<any>;
export function updateAdminPackageConfig(data: any): Promise<any>;
export function getAdminCommissionConfig(): Promise<any>;
export function updateAdminCommissionConfig(data: any): Promise<any>;
export function getAdminSystemConfig(): Promise<any>;
export function updateAdminSystemConfig(data: any): Promise<any>;
export function getAdminTrooPriceSourceConfig(): Promise<any>;
export function updateAdminTrooPriceSourceConfig(data: any): Promise<any>;

export function getAdminNotificationTemplates(params?: any): Promise<any>;
export function createAdminNotificationTemplate(data: any): Promise<any>;
export function getAdminNotificationTemplate(id: string): Promise<any>;
export function updateAdminNotificationTemplate(id: string, data: any): Promise<any>;
export function sendAdminNotification(data: any): Promise<any>;
export function getAdminNotificationHistory(params?: any): Promise<any>;

export function getAdminTeamReport(params?: any): Promise<any>;
export function getAdminCommissionReport(params?: any): Promise<any>;
export function getAdminOperationsReport(params?: any): Promise<any>;
export function exportAdminReport(data: any): Promise<any>;
