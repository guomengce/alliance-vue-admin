import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import {
  createAdminPackage,
  getAdminPackages,
  updateAdminPackage,
  updateAdminPackageStatus,
} from '../../../api/services';
import {
  createDefaultPlanForm,
  mapApiPackageToPlan,
  mapPlanFormToPayload,
  normalizeRatioPair,
} from './planMappers.mjs';

export function usePlans() {
  const loading = ref(false);
  const editorVisible = ref(false);
  const plans = ref([]);
  const editingPlan = ref(null);
  const form = reactive(createDefaultPlanForm());

  const replaceForm = (nextForm) => {
    Object.keys(form).forEach((key) => delete form[key]);
    Object.assign(form, nextForm);
  };

  async function loadPlans() {
    loading.value = true;
    try {
      const res = await getAdminPackages({ pageSize: 100 });
      plans.value = (res.data.items || []).map(mapApiPackageToPlan);
    } finally {
      loading.value = false;
    }
  }

  function openCreateEditor() {
    editingPlan.value = null;
    replaceForm(createDefaultPlanForm());
    editorVisible.value = true;
  }

  function openEditEditor(plan) {
    editingPlan.value = plan;
    replaceForm({ ...createDefaultPlanForm(), ...plan });
    editorVisible.value = true;
  }

  function closeEditor() {
    editorVisible.value = false;
  }

  function updateRatioPair(changedField, value) {
    Object.assign(form, normalizeRatioPair(changedField, value));
  }

  async function savePlan() {
    if (!form.name) {
      ElMessage.warning('请输入套餐名称');
      return;
    }
    if (Number(form.price) <= 0) {
      ElMessage.warning('认购金额必须大于 0');
      return;
    }
    if (Number(form.commissionLimit) <= 0) {
      ElMessage.warning('佣金额度必须大于 0');
      return;
    }

    const payload = mapPlanFormToPayload(form);
    if (form.id) {
      await updateAdminPackage(form.id, payload);
      ElMessage.success('套餐参数已更新');
    } else {
      await createAdminPackage(payload);
      ElMessage.success('新套餐已创建');
    }

    editorVisible.value = false;
    await loadPlans();
  }

  async function togglePlanStatus(plan) {
    const nextStatus = plan.status === 'enabled' ? 'disabled' : 'enabled';
    await updateAdminPackageStatus(plan.id, { status: nextStatus });
    ElMessage.success(nextStatus === 'enabled' ? '套餐已启用上架' : '套餐已下架关停');
    await loadPlans();
  }

  onMounted(loadPlans);

  return {
    loading,
    editorVisible,
    plans,
    editingPlan,
    form,
    closeEditor,
    loadPlans,
    openCreateEditor,
    openEditEditor,
    savePlan,
    togglePlanStatus,
    updateRatioPair,
  };
}
