<template>
  <article class="parameters-panel parameters-panel--source">
    <div>
      <div class="parameters-panel__title parameters-panel__title--cyan">
        <Connection />
        <h4>TROO 股票价 Yahoo API 参数</h4>
      </div>
      <p class="parameters-panel__desc">
        指定调用的 Yahoo Finance 跨界股票 API 端点，系统按 D+1 交易收盘均价自动加点。
      </p>

      <el-form class="parameters-form" label-position="top" :model="trooConfig">
        <el-form-item label="数据提供方">
          <el-input v-model="trooConfig.provider" placeholder="Yahoo Finance" />
        </el-form-item>

        <el-form-item label="API Endpoint Query URL">
          <el-input
            v-model="trooConfig.endpoint"
            type="textarea"
            :rows="3"
            placeholder="https://query1.finance.yahoo.com/v8/finance/chart/TROO-USD"
          />
        </el-form-item>

        <el-form-item label="刷新间隔">
          <div class="parameters-inline-field">
            <el-input-number v-model="trooConfig.refreshSeconds" :min="10" controls-position="right" />
            <span class="parameters-unit">秒</span>
          </div>
        </el-form-item>

        <el-form-item label="兜底价格">
          <div class="parameters-inline-field">
            <el-input-number v-model="trooConfig.fallbackPrice" :min="0" :step="0.01" controls-position="right" />
            <span class="parameters-unit">USDT</span>
          </div>
        </el-form-item>

        <div class="parameters-debug">
          <span>当前调试反馈</span>
          <strong>HTTP 200 Connected</strong>
        </div>

        <el-form-item label="结算时间">
          <el-time-picker v-model="systemConfig.settlementTime" value-format="HH:mm" format="HH:mm" />
        </el-form-item>

        <el-form-item label="KYC 人工审核">
          <el-switch v-model="systemConfig.kycManualReview" />
        </el-form-item>
      </el-form>
    </div>

    <el-button class="parameters-save parameters-save--cyan" @click="$emit('save')">
      实时抓取与校验
    </el-button>
  </article>
</template>

<script setup lang="ts">
import { Connection } from '@element-plus/icons-vue';
import type { SystemConfig, TrooConfig } from '../composables/useParameters';

defineProps<{
  trooConfig: TrooConfig;
  systemConfig: SystemConfig;
}>();

defineEmits<{
  save: [];
}>();
</script>
