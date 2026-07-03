<template>
  <el-card class="alliance-card broadcast-panel" shadow="never">
    <template #header>
      <div class="broadcast-panel__title">
        <div>
          <h3>补池提醒模板</h3>
          <p>低余额预警的快捷维护入口</p>
        </div>
        <el-button link type="primary" @click="$emit('edit', template)">编辑</el-button>
      </div>
    </template>

    <div class="broadcast-template-preview">
      <div class="broadcast-status">
        <span>{{ template?.name || '暂无补池模板' }}</span>
        <el-tag :type="template?.status === 'enabled' ? 'success' : 'info'">
          {{ template?.status === 'enabled' ? '启用' : '停用' }}
        </el-tag>
      </div>
      <div class="broadcast-template-preview__body">
        {{ template?.content || '请新增 replenishment 类型模板后再维护提醒内容。' }}
      </div>
      <el-button :disabled="!template" @click="$emit('edit', template)">
        保存模板内容
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { NotificationTemplate } from '../composables/useBroadcast';

defineProps<{
  template?: NotificationTemplate;
}>();

defineEmits<{
  edit: [template?: NotificationTemplate];
}>();
</script>
