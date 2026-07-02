<template>
  <section id="admin_plans_view" class="plans-view">
    <div class="plans-panel">
      <header class="plans-header">
        <div>
          <h2>套餐管理 (Admin Plans Portal)</h2>
          <p>配置系统各理财档位的本金认购上限、佣金额度配售池具体值、TROO股票买入、排队与额外赠送比率。</p>
        </div>
        <el-button class="plans-create-button" type="primary" @click="openCreateEditor">
          <el-icon><Plus /></el-icon>
          <span>创建新理财套餐</span>
        </el-button>
      </header>

      <div v-loading="loading" class="plans-grid">
        <PlanCard
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
          @edit="openEditEditor"
          @toggle="togglePlanStatus"
        />
      </div>

      <PlanGuide />
    </div>

    <PlanEditorModal
      v-model="editorVisible"
      :form="form"
      :editing="Boolean(editingPlan)"
      @ratio-change="updateRatioPair"
      @save="savePlan"
    />
  </section>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import PlanCard from './components/PlanCard.vue';
import PlanEditorModal from './components/PlanEditorModal.vue';
import PlanGuide from './components/PlanGuide.vue';
import { usePlans } from './composables/usePlans.mjs';

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
