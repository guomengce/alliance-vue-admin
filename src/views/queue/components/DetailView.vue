<template>
  <div class="queue-detail-view">
    <DetailHeader :account="account" :is-editing="isEditingData" @back="$emit('back')" @calibrate="$emit('calibrate')" />

    <AmountStats v-if="!isEditingData" :account="account" :format-number="formatNumber" />

    <CalibrationForm v-else :account="account" @cancel="$emit('cancel-edit')" @save="$emit('save-calibration', $event)" />

    <div class="queue-detail-view__main">
      <div class="queue-detail-view__left">
        <TriggerHistory :records="records" :format-number="formatNumber" />
      </div>
      <div class="queue-detail-view__right">
        <RiskGuide />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { QueueAccount, QueueUnlockRecord } from '@/types';
import AmountStats from './AmountStats.vue';
import CalibrationForm from './CalibrationForm.vue';
import DetailHeader from './DetailHeader.vue';
import RiskGuide from './RiskGuide.vue';
import TriggerHistory from './TriggerHistory.vue';

defineProps({
  account: { type: Object as PropType<QueueAccount>, required: true },
  records: { type: Array as PropType<QueueUnlockRecord[]>, default: () => [] },
  formatNumber: { type: Function as PropType<(value: unknown) => string>, required: true },
  isEditingData: { type: Boolean, default: false },
});

defineEmits(['back', 'calibrate', 'cancel-edit', 'save-calibration']);
</script>
