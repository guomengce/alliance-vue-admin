import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

export interface AdminAccount {
  id: string;
  username: string;
  nickname: string;
  role: string;
  email: string;
  status: 'active' | 'suspended' | 'isolated';
  lastLoginTime: string;
}

export interface RolePermission {
  name: string;
  code: string;
  desc: string;
  permissions: string[];
}

export interface PermissionDefinition {
  code: string;
  name: string;
  description: string;
}

export type RbacTab = 'accounts' | 'permissions';

export function useRbac() {
  const permissionInventory: PermissionDefinition[] = [
    { code: 'USER_MANAGE', name: '用户档案管理', description: '查询、修改、冻结与解冻平台同盟用户状态' },
    { code: 'PLAN_MANAGE', name: '套餐资产配置', description: '创建、设定、上架与下架流动性质押及 TROO 兑换套餐' },
    { code: 'ORDER_AUDIT', name: '订单风控审计', description: '审核订单到账、取消或驳回待处理认购支付状态' },
    { code: 'COMMISSION_FINALIZE', name: '五代佣金核对', description: '查看和核销由交易触发的穿透式推广返佣分拨' },
    { code: 'QUEUE_CALIBRATE', name: '排队解锁纠偏', description: '手动对账并调整特定用户锁仓排队可释放额度' },
    { code: 'FINANCE_SETTLE', name: '提币结算硬锁', description: '审核平台提币、出金划扣和会员钱包财务底账' },
    { code: 'SYSTEM_PARAM', name: '系统核心参数', description: '修改联盟分成率、锁仓释放阈值及风控参数' },
    { code: 'RBAC_CONCLUDE', name: '安全权限管理', description: '管理后台账号、封禁和角色权限绑定' },
  ];

  const roles = ref<RolePermission[]>([
    { name: '超级系统管理员', code: 'SUPER_ADMIN', desc: '全同盟最高系统权限', permissions: permissionInventory.map((item) => item.code) },
    { name: '财务核销总监', code: 'FINANCE_DIR', desc: '佣金、财务、结算和报表权限', permissions: ['COMMISSION_FINALIZE', 'FINANCE_SETTLE', 'ORDER_AUDIT'] },
    { name: '风控审计官', code: 'RISK_OFFICER', desc: '订单与排队风险核验', permissions: ['ORDER_AUDIT', 'QUEUE_CALIBRATE'] },
    { name: '运营专员', code: 'OPERATOR', desc: '用户、套餐和通知运营', permissions: ['USER_MANAGE', 'PLAN_MANAGE'] },
  ]);

  const accounts = ref<AdminAccount[]>([
    { id: 'ACC-001', username: 'admin_master', nickname: '联盟架构师 Jack', role: 'SUPER_ADMIN', email: 'jack@alliance.system', status: 'active', lastLoginTime: '2026-06-01 09:30:11' },
    { id: 'ACC-002', username: 'finance_settler_01', nickname: '首席财务官 Linda', role: 'FINANCE_DIR', email: 'linda@alliance.system', status: 'active', lastLoginTime: '2026-06-01 08:15:22' },
    { id: 'ACC-003', username: 'risk_auditor_alpha', nickname: '高级风控专员 Garry', role: 'RISK_OFFICER', email: 'garry@alliance.system', status: 'active', lastLoginTime: '2026-05-31 16:45:09' },
    { id: 'ACC-004', username: 'temp_ops_tester', nickname: '临时运营测试 Tester', role: 'OPERATOR', email: 'test@alliance.system', status: 'suspended', lastLoginTime: '2026-05-20 11:02:44' },
  ]);

  const activeTab = ref<RbacTab>('accounts');
  const keyword = ref('');
  const selectedRoleCode = ref('SUPER_ADMIN');
  const accountDialogVisible = ref(false);
  const roleDialogVisible = ref(false);
  const draftAccount = reactive({ username: '', nickname: '', email: '', role: 'OPERATOR' });
  const draftRole = reactive({ name: '', code: '', desc: '' });
  const tabOptions = [
    { label: '管理账号', value: 'accounts' },
    { label: '权限矩阵', value: 'permissions' },
  ];

  const selectedRole = computed(() => roles.value.find((role) => role.code === selectedRoleCode.value) || roles.value[0]);
  const filteredAccounts = computed(() => {
    const query = keyword.value.trim().toLowerCase();
    if (!query) return accounts.value;
    return accounts.value.filter((account) =>
      [account.username, account.nickname, account.email, account.role].some((field) => field.toLowerCase().includes(query)));
  });

  const kpis = computed(() => [
    { label: '管理账号', value: `${accounts.value.length} 个`, sub: '当前后台账号' },
    { label: '启用账号', value: `${accounts.value.filter((item) => item.status === 'active').length} 个`, sub: '允许登录', tone: 'is-green' },
    { label: '角色数量', value: `${roles.value.length} 个`, sub: '权限模型', tone: 'is-purple' },
    { label: '权限令牌', value: `${permissionInventory.length} 项`, sub: '可授权范围', tone: 'is-amber' },
  ]);

  function getRoleCoverage(role: RolePermission) {
    return Math.round((role.permissions.length / permissionInventory.length) * 100);
  }

  function getStatusText(status: AdminAccount['status']) {
    const map = {
      active: '已启用',
      suspended: '已停用',
      isolated: '隔离中',
    };
    return map[status];
  }

  function getStatusTone(status: AdminAccount['status']) {
    const map = {
      active: 'success',
      suspended: 'warning',
      isolated: 'danger',
    };
    return map[status];
  }

  function toggleAccount(account: AdminAccount) {
    if (account.username === 'admin_master') {
      ElMessage.warning('主管理员账号不可停用');
      return;
    }
    account.status = account.status === 'active' ? 'suspended' : 'active';
  }

  function openEdit(account: AdminAccount) {
    ElMessage.info(`编辑账号：${account.username}`);
  }

  function togglePermission(code: string) {
    if (selectedRole.value.code === 'SUPER_ADMIN') return;
    const permissions = selectedRole.value.permissions;
    if (permissions.includes(code)) {
      selectedRole.value.permissions = permissions.filter((item) => item !== code);
    } else {
      selectedRole.value.permissions = [...permissions, code];
    }
  }

  function createAccount() {
    if (!draftAccount.username || !draftAccount.nickname || !draftAccount.email) {
      ElMessage.warning('请填写完整账号信息');
      return;
    }
    accounts.value.push({
      id: `ACC-${String(accounts.value.length + 1).padStart(3, '0')}`,
      username: draftAccount.username,
      nickname: draftAccount.nickname,
      role: draftAccount.role,
      email: draftAccount.email,
      status: 'active',
      lastLoginTime: '未曾登录',
    });
    Object.assign(draftAccount, { username: '', nickname: '', email: '', role: 'OPERATOR' });
    accountDialogVisible.value = false;
  }

  function createRole() {
    if (!draftRole.name || !draftRole.code) {
      ElMessage.warning('请填写角色名称和编码');
      return;
    }
    const code = draftRole.code.toUpperCase().replace(/\s+/g, '_');
    roles.value.push({ name: draftRole.name, code, desc: draftRole.desc || '自定义安全角色', permissions: [] });
    selectedRoleCode.value = code;
    Object.assign(draftRole, { name: '', code: '', desc: '' });
    roleDialogVisible.value = false;
    activeTab.value = 'permissions';
  }

  return {
    permissionInventory,
    roles,
    activeTab,
    keyword,
    selectedRoleCode,
    accountDialogVisible,
    roleDialogVisible,
    draftAccount,
    draftRole,
    tabOptions,
    selectedRole,
    filteredAccounts,
    kpis,
    getRoleCoverage,
    getStatusText,
    getStatusTone,
    toggleAccount,
    openEdit,
    togglePermission,
    createAccount,
    createRole,
  };
}
