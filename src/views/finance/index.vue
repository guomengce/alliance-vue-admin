<template>
  <AdminPage title="财务管理" description="集中查看会员钱包、平台储备、TROO 资产与财务流水，并支持人工资金调整。">
    <template #actions><el-button type="primary" :icon="Money" @click="adjustVisible = true">资金调整</el-button></template>
    <KpiGrid :items="kpis" />

    <el-card class="alliance-card admin-table-card" shadow="never">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="会员钱包" name="wallets">
          <el-table v-loading="loading" class="desktop-table" :data="wallets" height="360">
            <el-table-column prop="memberId" label="会员ID" width="120" />
            <el-table-column prop="memberName" label="会员" />
            <el-table-column prop="usdtBalance" label="USDT"><template #default="{ row }">{{ money(row.usdtBalance) }}</template></el-table-column>
            <el-table-column prop="trooBalance" label="TROO"><template #default="{ row }">{{ number(row.trooBalance) }}</template></el-table-column>
            <el-table-column prop="queueBalance" label="排队余额"><template #default="{ row }">{{ money(row.queueBalance) }}</template></el-table-column>
          </el-table>
          <DataCardList :rows="wallets" :fields="walletFields" :title="(row) => row.memberName" :subtitle="(row) => row.memberId" />
        </el-tab-pane>
        <el-tab-pane label="财务流水" name="records">
          <el-table :data="records" height="360">
            <el-table-column prop="id" label="流水号" width="130" />
            <el-table-column prop="memberName" label="会员" />
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="asset" label="资产" width="90" />
            <el-table-column prop="amount" label="金额"><template #default="{ row }">{{ money(row.amount) }}</template></el-table-column>
            <el-table-column prop="fee" label="手续费"><template #default="{ row }">{{ money(row.fee) }}</template></el-table-column>
            <el-table-column label="状态"><template #default="{ row }"><el-tag :type="row.status === 'confirmed' || row.status === 'settled' ? 'success' : 'warning'">{{ row.status }}</el-tag></template></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog v-model="adjustVisible" class="admin-dialog" title="资金调整" width="min(460px, 92vw)">
      <el-form :model="adjustForm" label-width="90px">
        <el-form-item label="会员ID"><el-input v-model="adjustForm.memberId" /></el-form-item>
        <el-form-item label="资产"><el-select v-model="adjustForm.asset"><el-option label="USDT" value="USDT" /><el-option label="TROO" value="TROO" /></el-select></el-form-item>
        <el-form-item label="金额"><el-input-number v-model="adjustForm.amount" :step="100" /></el-form-item>
        <el-form-item label="原因"><el-input v-model="adjustForm.reason" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="adjustVisible = false">取消</el-button><el-button type="primary" @click="submitAdjustment">提交</el-button></template>
    </el-dialog>
  </AdminPage>
</template>

<script setup>
import { Money } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';
import { adjustAdminFinance, getAdminCompanyBalance, getAdminFinanceRecords, getAdminFinanceWallets, getAdminTrooAssets } from '../../api/services';
import AdminPage from '../shared/AdminPage.vue';
import DataCardList from '../shared/DataCardList.vue';
import KpiGrid from '../shared/KpiGrid.vue';

const loading = ref(false);
const activeTab = ref('wallets');
const adjustVisible = ref(false);
const wallets = ref([]);
const records = ref([]);
const balance = ref({});
const troo = ref({});
const adjustForm = reactive({ memberId: 'M10001', asset: 'USDT', amount: 0, reason: '' });
const money = (value) => `${Number(value || 0).toLocaleString()} USDT`;
const number = (value) => Number(value || 0).toLocaleString();

const kpis = computed(() => [
  { label: '公司可用', value: money(balance.value.usdtAvailable), sub: `冻结 ${money(balance.value.usdtFrozen)}`, tone: 'is-green' },
  { label: 'TROO 储备', value: number(troo.value.reserve), sub: `发行 ${number(troo.value.issued)}`, tone: 'is-purple' },
  { label: '溢出池', value: money(balance.value.overflowPool), sub: `手续费 ${money(balance.value.withdrawalFeeIncome)}`, tone: 'is-amber' },
  { label: 'TROO 价格', value: `$${Number(troo.value.price || 0).toFixed(4)}`, sub: `${((troo.value.priceChange24h || 0) * 100).toFixed(2)}%` },
]);

const walletFields = [
  { label: 'USDT', format: (row) => money(row.usdtBalance) },
  { label: 'TROO', format: (row) => number(row.trooBalance) },
  { label: '排队余额', format: (row) => money(row.queueBalance) },
];

async function loadFinance() {
  loading.value = true;
  try {
    const [walletRes, balanceRes, recordsRes, trooRes] = await Promise.all([
      getAdminFinanceWallets({ pageSize: 100 }),
      getAdminCompanyBalance(),
      getAdminFinanceRecords({ pageSize: 100 }),
      getAdminTrooAssets(),
    ]);
    wallets.value = walletRes.data.items;
    balance.value = balanceRes.data;
    records.value = recordsRes.data.items;
    troo.value = trooRes.data;
  } finally {
    loading.value = false;
  }
}

async function submitAdjustment() {
  await adjustAdminFinance({ ...adjustForm });
  ElMessage.success('资金调整已记录');
  adjustVisible.value = false;
  loadFinance();
}

onMounted(loadFinance);
</script>
