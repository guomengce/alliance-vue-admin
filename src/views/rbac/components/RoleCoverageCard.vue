<template>
  <el-card class="alliance-card rbac-side-card" shadow="never">
    <template #header>
      <div class="rbac-card-header">
        <span>角色覆盖率</span>
        <small>ROLE COVERAGE</small>
      </div>
    </template>

    <div class="rbac-role-list">
      <article
        v-for="role in roles"
        :key="role.code"
        class="rbac-role-item"
        :class="{ active: role.code === selectedRoleCode }"
        @click="selectedRoleCode = role.code"
      >
        <div>
          <strong>{{ role.name }}</strong>
          <span>{{ role.desc }}</span>
        </div>
        <el-progress :percentage="getRoleCoverage(role)" :show-text="false" />
        <small>{{ role.permissions.length }} / {{ permissionCount }} 权限</small>
      </article>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { RolePermission } from '../composables/useRbac';

defineProps<{
  roles: RolePermission[];
  permissionCount: number;
  getRoleCoverage: (role: RolePermission) => number;
}>();

const selectedRoleCode = defineModel<string>('selectedRoleCode', { required: true });
</script>
