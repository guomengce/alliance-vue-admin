<template>
  <el-card class="alliance-card broadcast-panel" shadow="never">
    <template #header>
      <div class="broadcast-panel__title">
        <div>
          <h3>广播消息创建</h3>
          <p>面向全部会员或指定会员发送运营通知</p>
        </div>
        <el-tag type="success">在线</el-tag>
      </div>
    </template>

    <el-form class="broadcast-form" label-position="top" :model="form">
      <el-form-item label="发送模板">
        <el-select v-model="form.templateId" @change="$emit('sync-template')">
          <el-option
            v-for="item in templates"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="目标会员">
        <el-input v-model="form.targetMemberId" placeholder="all 或会员编号，如 M10001" />
      </el-form-item>
      <el-form-item label="通知渠道">
        <el-select v-model="form.channel">
          <el-option label="站内信" value="in_app" />
          <el-option label="邮件" value="email" />
          <el-option label="短信" value="sms" />
        </el-select>
      </el-form-item>
      <el-form-item label="通知标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="通知正文">
        <el-input v-model="form.content" type="textarea" :rows="6" />
      </el-form-item>
    </el-form>

    <el-button type="primary" class="broadcast-send" :icon="Promotion" @click="$emit('send')">
      发送通知
    </el-button>
  </el-card>
</template>

<script setup lang="ts">
import { Promotion } from '@element-plus/icons-vue';
import type { BroadcastSendForm, NotificationTemplate } from '../composables/useBroadcast';

defineProps<{
  templates: NotificationTemplate[];
  form: BroadcastSendForm;
}>();

defineEmits<{
  'sync-template': [];
  send: [];
}>();
</script>
