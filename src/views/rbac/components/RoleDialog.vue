<template>
  <el-dialog v-model="visible" class="admin-dialog rbac-dialog" title="新增安全角色" width="min(520px, 92vw)">
    <el-form :model="draft" label-position="top">
      <el-form-item label="角色名称">
        <el-input v-model="draft.name" placeholder="Global Clearing Officer" />
      </el-form-item>
      <el-form-item label="唯一角色编码">
        <el-input v-model="draft.code" placeholder="CLEARING_OFFICER" />
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="draft.desc" type="textarea" :rows="3" placeholder="描述该角色的授权边界" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="$emit('create')">建立角色</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineProps<{
  draft: { name: string; code: string; desc: string };
}>();

defineEmits<{
  create: [];
}>();

const visible = defineModel<boolean>({ required: true });
</script>
