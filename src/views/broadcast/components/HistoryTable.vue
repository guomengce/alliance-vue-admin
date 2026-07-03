<template>
  <el-card class="alliance-card admin-table-card broadcast-history" shadow="never">
    <template #header>
      <div class="broadcast-panel__title">
        <div>
          <h3>发送历史</h3>
          <p>最近人工和系统触达记录</p>
        </div>
      </div>
    </template>

    <el-table :data="history" height="260">
      <el-table-column prop="id" label="消息 ID" width="130" />
      <el-table-column prop="templateId" label="模板" />
      <el-table-column prop="targetMemberId" label="目标会员" />
      <el-table-column label="渠道">
        <template #default="{ row }">{{ channelLabel(row.channel) }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-tag type="success">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sentAt" label="发送时间" width="170" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import type { NotificationHistory, TemplateChannel } from '../composables/useBroadcast';

defineProps<{
  history: NotificationHistory[];
  channelLabel: (channel: TemplateChannel) => string;
}>();
</script>
