<template>
  <div class="settlement-mobile-list">
    <article
      v-for="settlement in settlements"
      :key="settlement.id"
      class="settlement-mobile-card"
      :class="{ 'settlement-mobile-card--warning': settlement.overflowAmount > 0 }"
    >
      <div class="settlement-mobile-card__header">
        <div>
          <strong>{{ settlement.memberName || `结算节点 ${settlement.id}` }}</strong>
          <span>{{ settlement.contactEmail || `${String(settlement.id).toLowerCase()}@audit.local` }}</span>
        </div>
        <span>{{ settlement.id }}</span>
      </div>

      <div class="settlement-mobile-card__fields">
        <div class="settlement-mobile-card__field">
          <span class="settlement-mobile-card__field-label">预期派发</span>
          <span class="settlement-mobile-card__field-value">U {{ formatNumber(settlement.commissionAmount) }}</span>
        </div>
        <div class="settlement-mobile-card__field">
          <span class="settlement-mobile-card__field-label">可用额度</span>
          <span class="settlement-mobile-card__field-value" :class="{ 'settlement-mobile-card__field-value--red': getPoolCapacity(settlement) <= 0 }">
            U {{ formatNumber(Math.max(getPoolCapacity(settlement), 0)) }}
          </span>
        </div>
        <div class="settlement-mobile-card__field">
          <span class="settlement-mobile-card__field-label">实际拨付</span>
          <span class="settlement-mobile-card__field-value settlement-mobile-card__field-value--green">
            U {{ formatNumber(getActualAmount(settlement)) }}
          </span>
        </div>
        <div class="settlement-mobile-card__field">
          <span class="settlement-mobile-card__field-label">截留拦截</span>
          <span class="settlement-mobile-card__field-value settlement-mobile-card__field-value--amber">
            U {{ formatNumber(settlement.overflowAmount) }}
          </span>
        </div>
      </div>

      <div class="settlement-mobile-card__actions">
        <StatusPill :text="getStatusText(settlement.status)" :tone="getStatusTone(settlement.status)" />
        <el-button size="small" @click="$emit('view', settlement)">穿透诊断</el-button>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import StatusPill from '../../shared/StatusPill.vue';

defineProps<{
  settlements: any[];
  formatNumber: (value: unknown) => string;
  getStatusText: (status: string) => string;
  getStatusTone: (status: string) => string;
}>();

defineEmits<{ view: [settlement: any] }>();

function getPoolCapacity(settlement: any) {
  return Number(settlement.poolCapacity ?? settlement.commissionAmount ?? 0);
}

function getActualAmount(settlement: any) {
  return Number(settlement.actualAmount ?? Math.max(settlement.commissionAmount - settlement.overflowAmount, 0));
}
</script>
