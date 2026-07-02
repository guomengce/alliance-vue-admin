<template>
  <el-dialog
    :model-value="modelValue"
    class="plan-editor-dialog"
    width="min(560px, 92vw)"
    append-to-body
    :show-close="false"
    @close="$emit('update:modelValue', false)"
  >
    <template #header>
      <div class="plan-editor__header">
        <div class="plan-editor__icon">
          <el-icon><Operation /></el-icon>
        </div>
        <div>
          <h3>{{ editing ? '修改理财套餐配置参数' : '创建配置全新流动性理财套餐' }}</h3>
          <p>请仔细填写各项数值参数，确认提交后系统认购渠道将即时生效更新</p>
        </div>
        <button class="plan-editor__close" type="button" title="关闭" @click="$emit('update:modelValue', false)">
          <el-icon><Close /></el-icon>
        </button>
      </div>
    </template>

    <div class="plan-editor__body">
      <label class="plan-field">
        <span>套餐标识名称</span>
        <el-input v-model="form.name" placeholder="例如: 套餐 F (尊享至尊)" />
      </label>

      <label class="plan-field">
        <span>套餐功能描述/规则介绍</span>
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="3"
          placeholder="请输入该理财套餐对会员展示的具体功能描述与收益锁定解锁规则介绍..."
        />
      </label>

      <div class="plan-editor__grid">
        <label class="plan-field">
          <span>认购基础理财金额(USDT)</span>
          <el-input-number v-model="form.price" :min="0" :step="100" controls-position="right" />
        </label>
        <label class="plan-field">
          <span>佣金额度绝对数值(USDT)</span>
          <el-input-number v-model="form.commissionLimit" :min="0" :step="1000" controls-position="right" />
        </label>
      </div>

      <section class="plan-editor__ratios">
        <p>TROO 股票赠送、买入及排队精算设置</p>
        <div class="plan-editor__ratio-grid">
          <label class="plan-ratio-box">
            <span>股票赠送加成</span>
            <el-select v-model="form.giftRatio">
              <el-option label="1.00 (不赠送)" :value="1" />
              <el-option label="1.05 (+5%)" :value="1.05" />
              <el-option label="1.10 (+10%)" :value="1.1" />
              <el-option label="1.15 (+15%)" :value="1.15" />
              <el-option label="1.20 (+20%)" :value="1.2" />
              <el-option label="1.25 (+25%)" :value="1.25" />
              <el-option label="1.30 (+30%)" :value="1.3" />
            </el-select>
          </label>
          <label class="plan-ratio-box">
            <span>股票买入比例 (%)</span>
            <el-input-number
              :model-value="form.buyRatio"
              :min="0"
              :max="100"
              controls-position="right"
              @update:model-value="$emit('ratio-change', 'buy', $event)"
            />
          </label>
          <label class="plan-ratio-box">
            <span>股票排队比例 (%)</span>
            <el-input-number
              :model-value="form.queueRatio"
              :min="0"
              :max="100"
              controls-position="right"
              @update:model-value="$emit('ratio-change', 'queue', $event)"
            />
          </label>
        </div>
        <small>联动精算提示：系统自动保证 [买入比例] 与 [排队比例] 两项权和等于 100% 满仓交割（当前已设定为 {{ form.buyRatio }}% / {{ form.queueRatio }}%）</small>
      </section>
    </div>

    <template #footer>
      <div class="plan-editor__footer">
        <el-button @click="$emit('update:modelValue', false)">取消</el-button>
        <el-button type="success" @click="$emit('save')">
          {{ editing ? '保存并更新配置' : '确认无误，对外创建发布' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Close, Operation } from '@element-plus/icons-vue';

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  editing: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue', 'ratio-change', 'save']);
</script>
