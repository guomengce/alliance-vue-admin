<template>
  <el-card class="alliance-card rbac-permission-card" shadow="never">
    <template #header>
      <div class="rbac-card-header">
        <span>权限矩阵</span>
        <small>{{ selectedRole.code }}</small>
      </div>
    </template>

    <div class="rbac-permission-grid">
      <article v-for="permission in permissions" :key="permission.code" class="rbac-permission-item">
        <div>
          <strong>{{ permission.name }}</strong>
          <span>{{ permission.description }}</span>
          <small>{{ permission.code }}</small>
        </div>
        <el-switch
          :model-value="selectedRole.permissions.includes(permission.code)"
          :disabled="selectedRole.code === 'SUPER_ADMIN'"
          @update:model-value="$emit('toggle', permission.code)"
        />
      </article>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { PermissionDefinition, RolePermission } from '../composables/useRbac';

defineProps<{
  selectedRole: RolePermission;
  permissions: PermissionDefinition[];
}>();

defineEmits<{
  toggle: [code: string];
}>();
</script>
