<template>
  <AdminPage title="套餐管理" description="配置认购套餐、佣金额度、TROO 买入比例与排队锁仓比例">
    <template #actions>
      <el-button type="primary" :icon="Plus" @click="openCreateEditor">新增套餐</el-button>
    </template>

    <div v-loading="loading" class="plans-page">
      <section class="plans-grid">
        <PlanCard
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
          @edit="openEditEditor"
          @toggle="togglePlanStatus"
        />
      </section>

      <PlanGuide />
    </div>

    <PlanEditorModal
      v-model="editorVisible"
      :form="form"
      :editing="Boolean(editingPlan)"
      @ratio-change="updateRatioPair"
      @save="savePlan"
    />
  </AdminPage>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import AdminPage from '../shared/AdminPage.vue';
import PlanCard from './components/PlanCard.vue';
import PlanEditorModal from './components/PlanEditorModal.vue';
import PlanGuide from './components/PlanGuide.vue';
import { usePlans } from './composables/usePlans';

const {
  loading,
  editorVisible,
  plans,
  editingPlan,
  form,
  openCreateEditor,
  openEditEditor,
  savePlan,
  togglePlanStatus,
  updateRatioPair,
} = usePlans();
</script>
