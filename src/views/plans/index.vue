<template>
  <AdminPage
    title="套餐管理"
    description="配置所有认购层级的本金门槛、佣金限额、TROO 买入/排队比例和赠送倍率。"
  >
    <template #actions>
      <el-button class="plans-create-button" type="primary" :icon="Plus" @click="openCreateEditor">
        创建新套餐
      </el-button>
    </template>

    <section class="plans-view">
      <div class="plans-panel">
        <header class="plans-header">
          <div>
            <h2>套餐管理 (Admin Plans Portal)</h2>
            <p>
              Configure the principal amount thresholds, commission cap limits, buy/queue percentages,
              and bonus multiplier settings for all subscription tiers.
            </p>
          </div>
        </header>

        <PlanGuide />

        <div v-loading="loading" class="plans-grid">
          <el-empty v-if="!plans.length && !loading" description="暂无套餐配置" />
          <PlanCard
            v-for="plan in plans"
            :key="plan.id"
            :plan="plan"
            @edit="openEditEditor"
            @toggle="togglePlanStatus"
          />
        </div>
      </div>
    </section>

    <PlanEditorModal
      v-model="editorVisible"
      :form="form"
      :editing="!!editingPlan"
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
