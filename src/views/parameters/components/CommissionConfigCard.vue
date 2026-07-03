<template>
  <article class="parameters-panel parameters-panel--commission">
    <div>
      <div class="parameters-panel__title parameters-panel__title--purple">
        <Coin />
        <h4>L1 - L5 直推及团队分派比例 (%)</h4>
      </div>
      <p class="parameters-panel__desc">
        分别对应第一至五代推荐上线可获得的返比。默认按照各级 U 等值比例计算。
      </p>

      <div class="parameters-levels">
        <div v-for="level in levels" :key="level.key" class="parameters-level">
          <div>
            <strong>{{ level.label }} 级代理派佣比</strong>
            <span>{{ level.description }}</span>
          </div>
          <div class="parameters-number">
            <el-input-number
              :model-value="toPercent(config.ratios[level.key])"
              :min="0"
              :max="100"
              :precision="0"
              controls-position="right"
              @update:model-value="$emit('set-ratio', level.key, $event)"
            />
            <em>%</em>
          </div>
        </div>
      </div>
    </div>

    <el-button type="primary" class="parameters-save" @click="$emit('save')">
      锁定分成占比
    </el-button>
  </article>
</template>

<script setup lang="ts">
import { Coin } from '@element-plus/icons-vue';
import type { CommissionConfig, CommissionLevel, LevelKey } from '../composables/useParameters';

defineProps<{
  levels: CommissionLevel[];
  config: CommissionConfig;
  toPercent: (value: number) => number;
}>();

defineEmits<{
  'set-ratio': [key: LevelKey, value: number | undefined];
  save: [];
}>();
</script>
