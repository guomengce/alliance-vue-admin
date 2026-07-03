<template>
  <el-dialog
    v-model="visible"
    class="admin-dialog"
    :title="form.id ? '编辑模板' : '新增模板'"
    width="min(560px, 92vw)"
  >
    <el-form :model="form" label-width="90px">
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type">
          <el-option label="佣金" value="commission" />
          <el-option label="结算" value="settlement" />
          <el-option label="补池提醒" value="replenishment" />
        </el-select>
      </el-form-item>
      <el-form-item label="渠道">
        <el-select v-model="form.channel">
          <el-option label="站内信" value="in_app" />
          <el-option label="邮件" value="email" />
          <el-option label="短信" value="sms" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" :rows="5" />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="enabled" active-text="启用" inactive-text="停用" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="$emit('save')">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { NotificationTemplate } from '../composables/useBroadcast';

defineProps<{
  form: NotificationTemplate;
}>();

defineEmits<{
  save: [];
}>();

const visible = defineModel<boolean>({ required: true });
const enabled = defineModel<boolean>('enabled', { required: true });
</script>
