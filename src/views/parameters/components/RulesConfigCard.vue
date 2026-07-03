<template>
  <article class="parameters-panel parameters-panel--rules">
    <div>
      <div class="parameters-panel__title parameters-panel__title--amber">
        <Operation />
        <h4>锁定与出金手续费扣取参数</h4>
      </div>
      <p class="parameters-panel__desc">
        对提现硬性手续费封顶限制、下级买入触发排队释放比例和套餐入账规则进行统一设置。
      </p>

      <el-form class="parameters-form" label-position="top" :model="packageConfig">
        <el-form-item label="提现硬手续费封顶限制 (USDT)">
          <div class="parameters-inline-field">
            <el-input-number v-model="systemConfig.withdrawalFee" :min="0" controls-position="right" />
            <span class="parameters-unit">USDT</span>
          </div>
        </el-form-item>

        <el-form-item label="L1 直推下级成交触发排队释放率 (%)">
          <div class="parameters-inline-field">
            <el-input-number
              :model-value="toPercent(commissionConfig.unlockRatio)"
              :min="0"
              :max="100"
              controls-position="right"
              @update:model-value="$emit('set-commission-percent', 'unlockRatio', $event)"
            />
            <span class="parameters-unit">%</span>
          </div>
        </el-form-item>

        <el-form-item label="即时 TROO 比例">
          <el-slider
            :model-value="toPercent(packageConfig.instantTrooRatio)"
            :min="0"
            :max="100"
            :step="1"
            show-input
            @update:model-value="$emit('set-package-percent', 'instantTrooRatio', $event)"
          />
        </el-form-item>

        <el-form-item label="队列锁定比例">
          <el-slider
            :model-value="toPercent(packageConfig.queueLockRatio)"
            :min="0"
            :max="100"
            :step="1"
            show-input
            @update:model-value="$emit('set-package-percent', 'queueLockRatio', $event)"
          />
        </el-form-item>

        <el-form-item label="启用套餐">
          <el-select v-model="packageConfig.enabledPackageCodes" multiple>
            <el-option v-for="code in packageCodes" :key="code" :label="`Package ${code}`" :value="code" />
          </el-select>
        </el-form-item>

        <el-form-item label="补池提醒阈值">
          <div class="parameters-inline-field">
            <el-input-number
              :model-value="toPercent(systemConfig.replenishmentReminderThreshold)"
              :min="0"
              :max="100"
              controls-position="right"
              @update:model-value="$emit('set-system-percent', 'replenishmentReminderThreshold', $event)"
            />
            <span class="parameters-unit">%</span>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <el-button class="parameters-save parameters-save--ghost" @click="$emit('save')">
      确认比例修改
    </el-button>
  </article>
</template>

<script setup lang="ts">
import { Operation } from '@element-plus/icons-vue';
import type { CommissionConfig, PackageConfig, SystemConfig } from '../composables/useParameters';

defineProps<{
  packageConfig: PackageConfig;
  commissionConfig: CommissionConfig;
  systemConfig: SystemConfig;
  packageCodes: string[];
  toPercent: (value: number) => number;
}>();

defineEmits<{
  'set-package-percent': [key: 'instantTrooRatio' | 'queueLockRatio', value: number | number[]];
  'set-commission-percent': [key: 'unlockRatio', value: number | undefined];
  'set-system-percent': [key: 'replenishmentReminderThreshold', value: number | undefined];
  save: [];
}>();
</script>
