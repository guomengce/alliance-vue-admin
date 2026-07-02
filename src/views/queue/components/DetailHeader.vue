<template>
  <div class="queue-detail-header">
    <el-button :icon="Back" @click="$emit('back')">返回排队代表名册</el-button>
    <div class="queue-detail-header__title">
      <h2>排队存证及直推触发细节审核簿</h2>
      <span class="queue-detail-header__owner">OWNER UID: {{ account.memberId }} / Name: {{ account.memberName }}</span>
    </div>
    <el-button v-if="!isEditingData" type="primary" :icon="Tools" @click="$emit('calibrate')">启动数据人工修正</el-button>
    <el-button v-else type="warning" @click="$emit('calibrate')">取消编辑</el-button>
  </div>
</template>

<script setup lang="ts">
import { Back, Tools } from '@element-plus/icons-vue';

defineProps({
  account: { type: Object, required: true },
  isEditingData: { type: Boolean, default: false },
});

defineEmits(['back', 'calibrate']);
</script>
