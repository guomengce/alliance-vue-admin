import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {
  exportAdminReport,
  getAdminCommissionReport,
  getAdminOperationsReport,
  getAdminTeamReport,
} from '../../../api/services';

export interface TeamReportRow {
  date: string;
  rootMemberId: string;
  levels: number;
  totalMembers: number;
  activeMembers: number;
  orderAmount: number;
}

export interface CommissionReportRow {
  date: string;
  level: number;
  amount: number;
  count: number;
}

export interface OperationsReportRow {
  date: string;
  deposits: number;
  withdrawals: number;
  orderAmount: number;
  settlementStatus: string;
}

export type ReportTab = 'team' | 'commission' | 'operations';
export type ExportFormat = 'xlsx' | 'csv';

export function useReports() {
  const loading = ref(false);
  const activeTab = ref<ReportTab>('team');
  const filters = reactive({ date: '2026-05-28', format: 'xlsx' as ExportFormat });
  const team = ref<TeamReportRow[]>([]);
  const commission = ref<CommissionReportRow[]>([]);
  const operations = ref<OperationsReportRow[]>([]);
  const money = (value: unknown) => `${Number(value || 0).toLocaleString()} USDT`;

  async function loadReports() {
    loading.value = true;
    try {
      const [teamRes, commissionRes, operationsRes] = await Promise.all([
        getAdminTeamReport({ pageSize: 100, date: filters.date }),
        getAdminCommissionReport({ pageSize: 100, date: filters.date }),
        getAdminOperationsReport({ pageSize: 100, date: filters.date }),
      ]);
      team.value = teamRes.data.items;
      commission.value = commissionRes.data.items;
      operations.value = operationsRes.data.items;
    } finally {
      loading.value = false;
    }
  }

  async function exportReport() {
    const res = await exportAdminReport({
      reportType: activeTab.value,
      format: filters.format,
      date: filters.date,
    });
    ElMessage.success(`导出已生成：${res.data.exportId}`);
  }

  onMounted(loadReports);

  return {
    loading,
    activeTab,
    filters,
    team,
    commission,
    operations,
    money,
    loadReports,
    exportReport,
  };
}
