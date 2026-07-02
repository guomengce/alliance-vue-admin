<template>
  <el-card class="alliance-card queue-calibration-form" shadow="never">
    <template #header>
      <div class="queue-calibration-form__header">
        <Tools />
        <span>手动修正锁定余额</span>
      </div>
    </template>
    <el-form :model="form" label-width="140px">
      <el-form-item label="原始锁定总额">
        <el-input :model-value="originalLockedAmount" disabled />
      </el-form-item>
      <el-form-item label="当前余额">
        <el-input-number v-model="form.currentLocked" :min="0" :precision="2" />
      </el-form-item>
      <el-form-item label="已释出金额">
        <el-input-number v-model="form.unlockedAmount" :min="0" :precision="2" />
      </el-form-item>
      <el-form-item>
        <div class="queue-calibration-form__actions">
          <el-button @click="$emit('cancel')">取消</el-button>
          <el-button type="primary" @click="handleSave">保存修正</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Tools } from '@element-plus/icons-vue';

const props = defineProps({
  account: { type: Object, required: true },
});

const emit = defineEmits(['cancel', 'save']);

const form = reactive({
  currentLocked: props.account.lockedAmount || 0,
  unlockedAmount: props.account.unlockedAmount || 0,
});

const originalLockedAmount = props.account.lockedAmount || 0;

function handleSave() {
  const sum = form.currentLocked + form.unlockedAmount;
  if (Math.abs(sum - originalLockedAmount) > 0.01) {
    if (!confirm(`当前修正后的总额 ${sum} USDT 与原始总额 ${originalLockedAmount} USDT 不一致，确定继续保存吗？`)) {
      return;
    }
  }
  emit('save', {
    currentLocked: form.currentLocked,
    unlockedAmount: form.unlockedAmount,
  });
}
</script>
