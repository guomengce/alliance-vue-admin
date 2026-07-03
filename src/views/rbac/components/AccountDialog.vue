<template>
  <el-dialog v-model="visible" class="admin-dialog rbac-dialog" title="新增后台账号" width="min(520px, 92vw)">
    <el-form :model="draft" label-position="top">
      <el-form-item label="账号">
        <el-input v-model="draft.username" placeholder="finance_ops_mary" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="draft.nickname" placeholder="Representative Mary" />
      </el-form-item>
      <el-form-item label="安全邮箱">
        <el-input v-model="draft.email" placeholder="mary@alliance.system" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="draft.role">
          <el-option v-for="role in roles" :key="role.code" :label="`${role.name} (${role.code})`" :value="role.code" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="$emit('create')">授权并激活</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { RolePermission } from '../composables/useRbac';

defineProps<{
  draft: { username: string; nickname: string; email: string; role: string };
  roles: RolePermission[];
}>();

defineEmits<{
  create: [];
}>();

const visible = defineModel<boolean>({ required: true });
</script>
