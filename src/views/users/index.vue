<template>
  <AdminPage title="用户管理" description="检索全网会员账户、KYC 状态、团队规模与钱包资产，并执行风控状态调整。">
    <KpiGrid :items="kpis" />

    <el-card class="alliance-card admin-table-card" shadow="never">
      <div class="admin-toolbar">
        <el-form :model="filters" inline>
          <el-form-item>
            <el-input v-model="filters.keyword" :prefix-icon="Search" clearable placeholder="会员编号 / 昵称 / 手机号" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="filters.status" clearable placeholder="状态" style="width: 130px">
              <el-option label="启用" value="active" />
              <el-option label="禁用" value="disabled" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" :icon="Refresh" @click="loadMembers">刷新</el-button>
      </div>

      <el-table v-loading="loading" class="desktop-table" :data="filteredMembers" height="560">
        <el-table-column prop="memberNo" label="会员编号" width="140" />
        <el-table-column prop="nickname" label="昵称" min-width="130" />
        <el-table-column prop="phone" label="手机号" min-width="150" />
        <el-table-column prop="level" label="等级" width="100" />
        <el-table-column prop="teamSize" label="团队" width="90" />
        <el-table-column prop="totalOrderAmount" label="累计订单" width="130">
          <template #default="{ row }">{{ money(row.totalOrderAmount) }}</template>
        </el-table-column>
        <el-table-column label="KYC" width="140">
          <template #default="{ row }">
            <el-tag :type="kycType(row.kyc?.l2)" size="small">L2 {{ kycText(row.kyc?.l2) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <el-switch :model-value="row.status === 'active'" inline-prompt active-text="启" inactive-text="禁" @change="toggleStatus(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="openDetail(row)">详情</el-button>
            <el-button link type="success" @click="reviewKyc(row, 'approved')">通过</el-button>
            <el-button link type="warning" @click="reviewKyc(row, 'rejected')">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>

      <DataCardList
        :rows="filteredMembers"
        :fields="mobileFields"
        :title="(row) => row.nickname"
        :subtitle="(row) => row.memberNo"
      >
        <template #actions="{ row }">
          <el-button size="small" type="primary" @click="openDetail(row)">详情</el-button>
          <el-button size="small" @click="toggleStatus(row)">{{ row.status === 'active' ? '禁用' : '启用' }}</el-button>
        </template>
      </DataCardList>
    </el-card>

    <el-drawer v-model="drawerVisible" class="admin-drawer" title="会员详情" size="min(620px, 92vw)">
      <template v-if="selectedMember">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="会员编号">{{ selectedMember.memberNo }}</el-descriptions-item>
          <el-descriptions-item label="昵称">{{ selectedMember.nickname }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ selectedMember.email }}</el-descriptions-item>
          <el-descriptions-item label="邀请人">{{ selectedMember.inviterId || '无' }}</el-descriptions-item>
          <el-descriptions-item label="USDT">{{ money(selectedMember.wallet?.usdtBalance) }}</el-descriptions-item>
          <el-descriptions-item label="TROO">{{ number(selectedMember.wallet?.trooBalance) }}</el-descriptions-item>
        </el-descriptions>
        <h3 class="section-heading">五级下线</h3>
        <el-table :data="downlines" height="320">
          <el-table-column prop="level" label="层级" width="80">
            <template #default="{ row }">L{{ row.level }}</template>
          </el-table-column>
          <el-table-column prop="memberNo" label="会员编号" />
          <el-table-column prop="nickname" label="昵称" />
          <el-table-column prop="status" label="状态">
            <template #default="{ row }">
              <el-tag :type="row.status === 'active' ? 'success' : 'danger'" size="small">{{ statusText(row.status) }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-drawer>
  </AdminPage>
</template>

<script setup>
import { Search, Refresh } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';
import {
  getAdminMember,
  getAdminMemberDownlines,
  getAdminMembers,
  reviewAdminMemberKyc,
  updateAdminMemberStatus,
} from '../../api/services';
import AdminPage from '../shared/AdminPage.vue';
import DataCardList from '../shared/DataCardList.vue';
import KpiGrid from '../shared/KpiGrid.vue';

const loading = ref(false);
const drawerVisible = ref(false);
const members = ref([]);
const selectedMember = ref(null);
const downlines = ref([]);
const filters = reactive({ keyword: '', status: '' });

const money = (value) => `${Number(value || 0).toLocaleString()} USDT`;
const number = (value) => Number(value || 0).toLocaleString();
const statusText = (status) => ({ active: '启用', disabled: '禁用' }[status] || status);
const kycText = (status) => ({ approved: '已通过', pending: '待审核', rejected: '已驳回', not_submitted: '未提交' }[status] || '未提交');
const kycType = (status) => ({ approved: 'success', pending: 'warning', rejected: 'danger' }[status] || 'info');

const filteredMembers = computed(() => members.value.filter((item) => {
  const keyword = filters.keyword.toLowerCase();
  const keywordMatch = !keyword || [item.memberNo, item.nickname, item.phone].some((field) => String(field).toLowerCase().includes(keyword));
  return keywordMatch && (!filters.status || item.status === filters.status);
}));

const kpis = computed(() => [
  { label: '全网会员', value: `${members.value.length.toLocaleString()} 人`, sub: '当前样本账户总量' },
  { label: '已启用账户', value: `${members.value.filter((item) => item.status === 'active').length} 人`, sub: '可正常访问系统', tone: 'is-green' },
  { label: '待审核 KYC', value: `${members.value.filter((item) => item.kyc?.l2 === 'pending').length} 人`, sub: '等待运营复核', tone: 'is-amber' },
  { label: '团队总人数', value: number(members.value.reduce((sum, item) => sum + item.teamSize, 0)), sub: '五级网络汇总', tone: 'is-purple' },
]);

const mobileFields = [
  { label: '手机号', format: (row) => row.phone },
  { label: '等级', format: (row) => row.level },
  { label: '团队', format: (row) => `${row.teamSize} 人` },
  { label: '订单', format: (row) => money(row.totalOrderAmount) },
  { label: '状态', format: (row) => statusText(row.status) },
];

async function loadMembers() {
  loading.value = true;
  try {
    const res = await getAdminMembers({ pageSize: 100 });
    members.value = res.data.items;
  } finally {
    loading.value = false;
  }
}

async function openDetail(row) {
  drawerVisible.value = true;
  const [detailRes, downlineRes] = await Promise.all([
    getAdminMember(row.id),
    getAdminMemberDownlines(row.id, { pageSize: 100 }),
  ]);
  selectedMember.value = detailRes.data;
  downlines.value = downlineRes.data.items;
}

async function toggleStatus(row) {
  const nextStatus = row.status === 'active' ? 'disabled' : 'active';
  await updateAdminMemberStatus(row.id, { status: nextStatus });
  ElMessage.success(`会员已${nextStatus === 'active' ? '启用' : '禁用'}`);
  loadMembers();
}

async function reviewKyc(row, status) {
  await reviewAdminMemberKyc(row.id, { level: 'l2', status, reviewer: 'admin' });
  ElMessage.success(status === 'approved' ? 'KYC 已通过' : 'KYC 已驳回');
  loadMembers();
}

onMounted(loadMembers);
</script>

<style scoped lang="scss">
.section-heading {
  margin: 22px 0 12px;
  color: #fff;
  font-size: 15px;
}
</style>
