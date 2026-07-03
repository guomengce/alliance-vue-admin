<template>
  <el-dialog v-model="visible" class="admin-dialog finance-adjust-dialog" title="资金调整" width="min(460px, 92vw)">
    <el-form :model="form" label-width="90px">
      <el-form-item label="会员 ID"><el-input v-model="form.memberId" /></el-form-item>
      <el-form-item label="资产">
        <el-select v-model="form.asset">
          <el-option label="USDT" value="USDT" />
          <el-option label="TROO" value="TROO" />
        </el-select>
      </el-form-item>
      <el-form-item label="金额"><el-input-number v-model="form.amount" :step="100" /></el-form-item>
      <el-form-item label="原因"><el-input v-model="form.reason" /></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="$emit('submit')">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FinanceAdjustForm } from '../composables/useFinance';

defineProps<{
  form: FinanceAdjustForm;
}>();

defineEmits<{
  submit: [];
}>();

const visible = defineModel<boolean>({ required: true });
</script>
