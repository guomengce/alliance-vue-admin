<template>
  <AdminPage title="权限管理" description="管理后台角色、权限矩阵和运营账号启停状态。">
    <KpiGrid :items="kpis" />
    <div class="rbac-grid">
      <el-card class="alliance-card admin-table-card" shadow="never">
        <template #header>管理账号</template>
        <el-table :data="accounts" height="420">
          <el-table-column prop="name" label="账号" />
          <el-table-column prop="role" label="角色" />
          <el-table-column prop="lastLogin" label="最近登录" width="170" />
          <el-table-column label="状态" width="100"><template #default="{ row }"><el-tag :type="row.enabled ? 'success' : 'info'">{{ row.enabled ? '启用' : '停用' }}</el-tag></template></el-table-column>
        </el-table>
      </el-card>
      <el-card class="alliance-card" shadow="never">
        <template #header>权限矩阵</template>
        <div class="permission-list">
          <div v-for="role in roles" :key="role.name" class="permission-item">
            <div>
              <strong>{{ role.name }}</strong>
              <span>{{ role.desc }}</span>
            </div>
            <el-tag>{{ role.permissions.length }} 项权限</el-tag>
          </div>
        </div>
      </el-card>
    </div>
  </AdminPage>
</template>

<script setup>
import AdminPage from '../shared/AdminPage.vue';
import KpiGrid from '../shared/KpiGrid.vue';

const accounts = [
  { name: 'super.admin', role: 'SUPER_ADMIN', lastLogin: '2026-05-28 12:10', enabled: true },
  { name: 'finance.director', role: 'FINANCE_DIR', lastLogin: '2026-05-28 09:44', enabled: true },
  { name: 'risk.officer', role: 'RISK_OFFICER', lastLogin: '2026-05-27 18:20', enabled: true },
  { name: 'operator.01', role: 'OPERATOR', lastLogin: '2026-05-26 16:32', enabled: false },
];
const roles = [
  { name: 'SUPER_ADMIN', desc: '全同盟最高管理权限', permissions: ['all'] },
  { name: 'FINANCE_DIR', desc: '财务、结算、报表管理', permissions: ['finance', 'settlement', 'reports'] },
  { name: 'RISK_OFFICER', desc: '订单与队列风控审阅', permissions: ['orders', 'queue'] },
  { name: 'OPERATOR', desc: '会员、套餐、通知运营', permissions: ['users', 'plans', 'broadcast'] },
];
const kpis = [
  { label: '管理账号', value: `${accounts.length} 个`, sub: '当前后台账号' },
  { label: '启用账号', value: `${accounts.filter((item) => item.enabled).length} 个`, sub: '允许登录', tone: 'is-green' },
  { label: '角色数量', value: `${roles.length} 个`, sub: '权限模型', tone: 'is-purple' },
];
</script>

<style scoped lang="scss">
.rbac-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(360px, 0.8fr);
  gap: 16px;
}

.permission-list {
  display: grid;
  gap: 12px;
}

.permission-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px;
  border: 1px solid var(--alliance-border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);

  strong,
  span {
    display: block;
  }

  strong {
    color: #fff;
    font-family: var(--alliance-mono);
  }

  span {
    margin-top: 5px;
    color: var(--alliance-dim);
    font-size: 12px;
  }
}

@media (max-width: 900px) {
  .rbac-grid {
    grid-template-columns: 1fr;
  }
}
</style>
