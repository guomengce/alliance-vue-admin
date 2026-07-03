<template>
  <el-card class="alliance-card admin-table-card broadcast-history" shadow="never">
    <template #header>
      <div class="broadcast-panel__title">
        <div>
          <h3>通知模板</h3>
          <p>配置不同业务触达场景的标题、正文和渠道</p>
        </div>
      </div>
    </template>

    <el-table class="broadcast-desktop-table" :data="templates">
      <el-table-column prop="name" label="模板名称" min-width="170" />
      <el-table-column label="类型" width="130">
        <template #default="{ row }">{{ typeLabel(row.type) }}</template>
      </el-table-column>
      <el-table-column label="渠道" width="110">
        <template #default="{ row }">{{ channelLabel(row.channel) }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="210" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'enabled' ? 'success' : 'info'">
            {{ row.status === 'enabled' ? '启用' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="170" />
      <el-table-column label="操作" width="100" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="$emit('edit', row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="broadcast-mobile-list">
      <article v-for="item in templates" :key="item.id" class="broadcast-mobile-card">
        <div class="broadcast-mobile-card__head">
          <div>
            <h4>{{ item.name }}</h4>
            <p>{{ item.title }}</p>
          </div>
          <el-tag :type="item.status === 'enabled' ? 'success' : 'info'">
            {{ item.status === 'enabled' ? '启用' : '停用' }}
          </el-tag>
        </div>
        <p>{{ typeLabel(item.type) }} / {{ channelLabel(item.channel) }} / {{ item.updatedAt }}</p>
        <el-button size="small" type="primary" @click="$emit('edit', item)">编辑</el-button>
      </article>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { NotificationTemplate, TemplateChannel, TemplateType } from '../composables/useBroadcast';

defineProps<{
  templates: NotificationTemplate[];
  typeLabel: (type: TemplateType) => string;
  channelLabel: (channel: TemplateChannel) => string;
}>();

defineEmits<{
  edit: [template: NotificationTemplate];
}>();
</script>
