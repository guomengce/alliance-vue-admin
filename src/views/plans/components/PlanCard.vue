<template>
  <article class="plan-card" :class="{ 'plan-card--disabled': !isEnabled }">
    <section class="plan-card__identity">
      <div class="plan-card__title-row">
        <h3>{{ plan.name }}</h3>
        <el-tag class="plan-status-tag" :type="isEnabled ? 'success' : 'danger'">
          {{ isEnabled ? '可售中 (启用)' : '锁仓中 (停用)' }}
        </el-tag>
      </div>
      <p class="plan-card__code">
        套餐标识代码：<strong>{{ displayCode }}</strong>
      </p>
      <p class="plan-card__description">{{ plan.description }}</p>
    </section>

    <section class="plan-card__stats" aria-label="套餐参数">
      <div class="plan-stat">
        <span>起购门槛</span>
        <strong>{{ formatMoney(plan.price) }} <small>U</small></strong>
      </div>
      <div class="plan-stat plan-stat--green">
        <span>佣金释放限额</span>
        <strong>{{ formatMoney(plan.commissionLimit) }} <small>U</small></strong>
      </div>
      <div class="plan-stat plan-stat--purple">
        <span>充值额外赠送</span>
        <strong>{{ formatBonusRatio(plan.giftRatio) }}</strong>
      </div>
      <div class="plan-stat plan-stat--amber">
        <span>TROO 变现/排队</span>
        <strong>{{ plan.buyRatio }}% <small>/</small> {{ plan.queueRatio }}%</strong>
      </div>
    </section>

    <section class="plan-card__actions" aria-label="套餐操作">
      <el-button class="plan-action-button plan-action-button--config" @click="$emit('edit', plan)">
        <el-icon><Edit /></el-icon>
        <span>配置参数</span>
      </el-button>
      <el-button
        class="plan-action-button"
        :class="isEnabled ? 'plan-action-button--danger' : 'plan-action-button--success'"
        @click="$emit('toggle', plan)"
      >
        {{ isEnabled ? '下架关停' : '启用上架' }}
      </el-button>
    </section>
  </article>
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { formatBonusRatio, formatMoney } from '../composables/planMappers.mjs';

const props = defineProps({
  plan: {
    type: Object,
    required: true,
  },
});

defineEmits(['edit', 'toggle']);

const isEnabled = computed(() => props.plan.status === 'enabled');
const displayCode = computed(() => String(props.plan.code || props.plan.id).toUpperCase());
</script>
