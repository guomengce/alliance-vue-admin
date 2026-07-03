import { computed, reactive } from 'vue';

export type LogLevel = 'info' | 'warn' | 'risk';

export interface LogRow {
  time: string;
  operator: string;
  module: string;
  action: string;
  level: LogLevel;
  ip: string;
}

const logs: LogRow[] = [
  { time: '2026-05-28 14:02:11', operator: 'super.admin', module: 'settlement', action: '触发 D+1 日结任务', level: 'info', ip: '10.0.0.12' },
  { time: '2026-05-28 13:44:20', operator: 'finance.director', module: 'finance', action: '提交会员 M10001 资金调整', level: 'warn', ip: '10.0.0.18' },
  { time: '2026-05-28 11:18:03', operator: 'risk.officer', module: 'orders', action: '标记订单 ORD-7004 为异常复核', level: 'risk', ip: '10.0.0.21' },
  { time: '2026-05-28 09:30:43', operator: 'operator.01', module: 'broadcast', action: '发送结算完成通知模板', level: 'info', ip: '10.0.0.35' },
];

export function useLogs() {
  const filters = reactive({ keyword: '', level: '' as LogLevel | '' });

  const filteredLogs = computed(() => logs.filter((item) => {
    const keyword = filters.keyword.toLowerCase();
    const matchKeyword =
      !keyword ||
      [item.operator, item.module, item.action].some((field) => field.toLowerCase().includes(keyword));

    return matchKeyword && (!filters.level || item.level === filters.level);
  }));

  const kpis = [
    { label: '今日日志', value: `${logs.length} 条`, sub: '后台审计事件' },
    { label: '风控事件', value: `${logs.filter((item) => item.level === 'risk').length} 条`, sub: '需要关注', tone: 'is-danger' },
    { label: '警告事件', value: `${logs.filter((item) => item.level === 'warn').length} 条`, sub: '资金或权限动作', tone: 'is-amber' },
  ];

  const mobileFields = [
    { label: '模块', prop: 'module' },
    { label: '级别', format: (row: LogRow) => row.level.toUpperCase() },
    { label: 'IP', prop: 'ip' },
  ];

  const levelType = (level: LogLevel) => ({ info: 'success', warn: 'warning', risk: 'danger' }[level]);

  return {
    filters,
    filteredLogs,
    kpis,
    mobileFields,
    levelType,
  };
}
