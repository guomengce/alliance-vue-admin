<template>
  <AdminPage title="通知管理" description="维护通知模板、广播渠道与人工发送记录，用于结算、佣金、补池提醒等运营触达">
    <template #actions>
      <el-button :icon="Promotion" @click="sendVisible = true">手动发送</el-button>
      <el-button type="primary" :icon="Plus" @click="openEditor()">新增模板</el-button>
    </template>

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>通知模板</template>
      <el-table v-loading="loading" class="desktop-table" :data="templates">
        <el-table-column prop="name" label="模板名称" min-width="160" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="channel" label="渠道" width="110" />
        <el-table-column prop="title" label="标题" min-width="180" />
        <el-table-column label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status === 'enabled' ? 'success' : 'info'">{{ row.status === 'enabled' ? '启用' : '停用' }}</el-tag></template></el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" width="170" />
        <el-table-column label="操作" width="100"><template #default="{ row }"><el-button link type="primary" @click="openEditor(row)">编辑</el-button></template></el-table-column>
      </el-table>
      <DataCardList :rows="templates" :fields="templateFields" :title="(row) => row.name" :subtitle="(row) => row.title">
        <template #actions="{ row }"><el-button size="small" type="primary" @click="openEditor(row)">编辑</el-button></template>
      </DataCardList>
    </el-card>

    <el-card class="alliance-card admin-table-card" shadow="never">
      <template #header>发送历史</template>
      <el-table :data="history" height="260">
        <el-table-column prop="id" label="消息ID" width="130" />
        <el-table-column prop="templateId" label="模板" />
        <el-table-column prop="targetMemberId" label="目标会员" />
        <el-table-column prop="channel" label="渠道" />
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag type="success">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column prop="sentAt" label="发送时间" width="170" />
      </el-table>
    </el-card>

    <el-dialog v-model="editorVisible" class="admin-dialog" :title="templateForm.id ? '编辑模板' : '新增模板'" width="min(560px, 92vw)">
      <el-form :model="templateForm" label-width="90px">
        <el-form-item label="名称"><el-input v-model="templateForm.name" /></el-form-item>
        <el-form-item label="类型"><el-select v-model="templateForm.type"><el-option label="佣金" value="commission" /><el-option label="结算" value="settlement" /><el-option label="补池提醒" value="replenishment" /></el-select></el-form-item>
        <el-form-item label="渠道"><el-select v-model="templateForm.channel"><el-option label="站内信" value="in_app" /><el-option label="邮件" value="email" /><el-option label="短信" value="sms" /></el-select></el-form-item>
        <el-form-item label="标题"><el-input v-model="templateForm.title" /></el-form-item>
        <el-form-item label="内容"><el-input v-model="templateForm.content" type="textarea" :rows="4" /></el-form-item>
        <el-form-item label="状态"><el-switch v-model="templateEnabled" active-text="启用" inactive-text="停用" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="editorVisible = false">取消</el-button><el-button type="primary" @click="saveTemplate">保存</el-button></template>
    </el-dialog>

    <el-dialog v-model="sendVisible" class="admin-dialog" title="手动发送" width="min(460px, 92vw)">
      <el-form :model="sendForm" label-width="90px">
        <el-form-item label="模板"><el-select v-model="sendForm.templateId"><el-option v-for="item in templates" :key="item.id" :label="item.name" :value="item.id" /></el-select></el-form-item>
        <el-form-item label="目标会员"><el-input v-model="sendForm.targetMemberId" placeholder="M10001 或 all" /></el-form-item>
        <el-form-item label="渠道"><el-select v-model="sendForm.channel"><el-option label="站内信" value="in_app" /><el-option label="邮件" value="email" /><el-option label="短信" value="sms" /></el-select></el-form-item>
      </el-form>
      <template #footer><el-button @click="sendVisible = false">取消</el-button><el-button type="primary" @click="sendNotification">发送</el-button></template>
    </el-dialog>
  </AdminPage>
</template>

<script setup lang="ts">
import { Plus, Promotion } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';
import {
  createAdminNotificationTemplate,
  getAdminNotificationHistory,
  getAdminNotificationTemplates,
  sendAdminNotification,
  updateAdminNotificationTemplate,
} from '../../api/services';
import AdminPage from '../shared/AdminPage.vue';
import DataCardList from '../shared/DataCardList.vue';

const loading = ref(false);
const editorVisible = ref(false);
const sendVisible = ref(false);
const templates = ref([]);
const history = ref([]);
const templateForm = reactive({});
const sendForm = reactive({ templateId: '', targetMemberId: 'all', channel: 'in_app' });
const templateEnabled = computed({
  get: () => templateForm.status !== 'disabled',
  set: (value) => { templateForm.status = value ? 'enabled' : 'disabled'; },
});

const templateFields = [
  { label: '类型', prop: 'type' },
  { label: '渠道', prop: 'channel' },
  { label: '状态', format: (row) => (row.status === 'enabled' ? '启用' : '停用') },
  { label: '更新时间', prop: 'updatedAt' },
];

async function loadNotifications() {
  loading.value = true;
  try {
    const [templateRes, historyRes] = await Promise.all([
      getAdminNotificationTemplates({ pageSize: 100 }),
      getAdminNotificationHistory({ pageSize: 100 }),
    ]);
    templates.value = templateRes.data.items;
    history.value = historyRes.data.items;
    if (!sendForm.templateId && templates.value[0]) sendForm.templateId = templates.value[0].id;
  } finally {
    loading.value = false;
  }
}

function openEditor(row) {
  Object.keys(templateForm).forEach((key) => delete templateForm[key]);
  Object.assign(templateForm, row || { name: '', type: 'commission', channel: 'in_app', title: '', content: '', status: 'enabled' });
  editorVisible.value = true;
}

async function saveTemplate() {
  if (templateForm.id) await updateAdminNotificationTemplate(templateForm.id, { ...templateForm });
  else await createAdminNotificationTemplate({ ...templateForm });
  ElMessage.success('通知模板已保存');
  editorVisible.value = false;
  loadNotifications();
}

async function sendNotification() {
  await sendAdminNotification({ ...sendForm });
  ElMessage.success('通知已发送');
  sendVisible.value = false;
  loadNotifications();
}

onMounted(loadNotifications);
</script>
