<template>
  <article class="plan-card" :class="{ 'plan-card--disabled': !isEnabled }">
    <section class="plan-card__identity">
      <div class="plan-card__title-row">
        <h3>{{ plan.name }}</h3>
        <el-tag class="plan-status-tag" :type="isEnabled ? 'success' : 'danger'">
          {{ isEnabled ? '可售卖 (启用)' : '锁定中 (停用)' }}
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
        <span>佣金现金上限</span>
        <strong>{{ formatMoney(plan.commissionLimit) }} <small>U</small></strong>
      </div>
      <div class="plan-stat plan-stat--purple">
        <span>赠送倍率</span>
        <strong>{{ formatBonusRatio(plan.giftRatio) }}</strong>
      </div>
      <div class="plan-stat plan-stat--amber">
        <span>TROO 分配</span>
        <strong>{{ plan.buyRatio }}% <small>/</small> {{ plan.queueRatio }}%</strong>
      </div>
    </section>

    <section class="plan-card__actions" aria-label="套餐操作">
      <el-button class="plan-action-button plan-action-button--config" @click="$emit('edit', plan)">
        <el-icon><Edit /></el-icon>
        <span>调整套餐结构</span>
      </el-button>
      <el-button
        class="plan-action-button"
        :class="isEnabled ? 'plan-action-button--danger' : 'plan-action-button--success'"
        @click="$emit('toggle', plan)"
      >
        {{ isEnabled ? '关闭停售' : '上架启用' }}
      </el-button>
    </section>
  </article>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { Plan } from '@/types';
import { formatBonusRatio, formatMoney } from '../composables/planMappers';

const props = defineProps({
  plan: {
    type: Object as PropType<Plan>,
    required: true,
  },
});

defineEmits<{
  edit: [plan: Plan];
  toggle: [plan: Plan];
}>();

const isEnabled = computed(() => props.plan.status === 'enabled');
const displayCode = computed(() => String(props.plan.code || props.plan.id).toUpperCase());
</script>
