<template>
  <el-menu :default-active="activePath" class="admin-shell__menu" router>
    <el-menu-item v-for="item in items" :key="item.path" :index="item.path" @click="$emit('navigate', item.path)">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
interface NavItem {
  path: string;
  label: string;
  icon?: any;
}
defineEmits<{ navigate: [path: string] }>();
defineProps<{
  items: NavItem[];
  activePath: string;
}>();
</script>
