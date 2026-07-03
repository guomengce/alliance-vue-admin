<template>
  <AdminPage
    title="通知管理"
    description="维护通知模板、广播渠道与人工发送记录"
  >
    <template #actions>
      <el-button :icon="Refresh" @click="loadNotifications">刷新</el-button>
      <el-button type="primary" :icon="Plus" @click="openEditor()">新增模板</el-button>
    </template>

    <section v-loading="loading" class="broadcast-view">
      <div class="broadcast-grid">
        <BroadcastComposer
          :templates="templates"
          :form="sendForm"
          @sync-template="syncSelectedTemplate"
          @send="sendNotification"
        />

        <ReplenishmentTemplateCard
          :template="replenishmentTemplate"
          @edit="openEditor"
        />
      </div>

      <TemplateTable
        :templates="templates"
        :type-label="typeLabel"
        :channel-label="channelLabel"
        @edit="openEditor"
      />

      <HistoryTable
        :history="history"
        :channel-label="channelLabel"
      />

      <TemplateEditorDialog
        v-model="editorVisible"
        :form="templateForm"
        v-model:enabled="templateEnabled"
        @save="saveTemplate"
      />
    </section>
  </AdminPage>
</template>

<script setup lang="ts">
import { Plus, Refresh } from '@element-plus/icons-vue';
import AdminPage from '../shared/AdminPage.vue';
import BroadcastComposer from './components/BroadcastComposer.vue';
import HistoryTable from './components/HistoryTable.vue';
import ReplenishmentTemplateCard from './components/ReplenishmentTemplateCard.vue';
import TemplateEditorDialog from './components/TemplateEditorDialog.vue';
import TemplateTable from './components/TemplateTable.vue';
import { useBroadcast } from './composables/useBroadcast';

const {
  loading,
  editorVisible,
  templates,
  history,
  templateForm,
  sendForm,
  replenishmentTemplate,
  templateEnabled,
  typeLabel,
  channelLabel,
  loadNotifications,
  syncSelectedTemplate,
  openEditor,
  saveTemplate,
  sendNotification,
} = useBroadcast();
</script>
