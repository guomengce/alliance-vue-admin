<template>
  <el-drawer
    :model-value="modelValue"
    class="admin-drawer users-detail-drawer"
    direction="rtl"
    :size="drawerSize"
    :with-header="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-if="member">
      <div class="users-detail">
        <div class="users-detail__topline">
          <el-button text :icon="ArrowLeft" @click="$emit('update:modelValue', false)">返回联盟正式注册代表名册</el-button>
          <span>SECURE CLIENT OVERLAY CONTROL</span>
        </div>

        <section class="users-detail__hero">
          <div class="users-avatar users-avatar--large">{{ avatar }}</div>
          <div>
            <h2>{{ member.nickname || '未设置昵称' }}</h2>
            <p>UID: {{ member.id }} / {{ member.memberNo }}</p>
            <div class="users-detail__hero-tags">
              <StatusPill :text="getKycText(member)" :tone="getKycTone(member)" :pulse="member.kyc?.l2 === 'pending'" />
              <span :class="['users-state-text', `users-state-text--${member.status}`]">{{ getStatusText(member.status) }}</span>
            </div>
          </div>
        </section>

        <el-tabs :model-value="activeTab" class="users-detail-tabs" @update:model-value="$emit('update:activeTab', $event as any)">
          <el-tab-pane label="基本资料 & 状态标定" name="profile">
            <div class="users-detail-grid">
              <div class="users-detail-field">
                <span>Nickname</span>
                <strong>{{ member.nickname || '未设置昵称' }}</strong>
              </div>
              <div class="users-detail-field">
                <span>Email</span>
                <strong>{{ member.email || '-' }}</strong>
              </div>
              <div class="users-detail-field">
                <span>Phone Number</span>
                <strong>{{ member.phone || '-' }}</strong>
              </div>
              <div class="users-detail-field">
                <span>Sponsor Referrer</span>
                <strong>{{ member.inviterId || '999001 (SYS)' }}</strong>
              </div>
              <div class="users-detail-field">
                <span>Registration Date</span>
                <strong>{{ member.joinedAt }}</strong>
              </div>
              <div class="users-detail-field">
                <span>Tier</span>
                <strong>{{ member.level }}</strong>
              </div>
            </div>

            <div v-if="member.kyc?.l2 === 'pending'" class="users-detail-audit">
              <p>该会员的 KYC L2 资料正在等待终审。</p>
              <el-button type="success" @click="$emit('approve-kyc', member)">确认通过 L2 审核</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="钱包资产核拨调整" name="wallet">
            <div class="users-wallet-grid">
              <div>
                <span>USDT Available</span>
                <strong>USDT {{ formatNumber(member.wallet.usdtBalance) }}</strong>
              </div>
              <div>
                <span>TROO Balance</span>
                <strong>{{ formatNumber(member.wallet.trooBalance) }} U</strong>
              </div>
              <div>
                <span>Queue Locked</span>
                <strong>USDT {{ formatNumber(member.wallet.queueBalance) }}</strong>
              </div>
              <div>
                <span>Total Subscription</span>
                <strong>USDT {{ formatNumber(member.totalOrderAmount) }}</strong>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="直属下线团队节点" name="team">
            <div class="users-team-list">
              <div v-if="!downlines.length" class="users-team-empty">暂无直属下线节点</div>
              <div v-for="downline in downlines" :key="downline.id" class="users-team-row">
                <div>
                  <strong>{{ downline.id }}</strong>
                  <span>{{ downline.nickname }}</span>
                </div>
                <span>L{{ (downline as any).level || 1 }}</span>
                <strong>USDT {{ formatNumber(downline.totalOrderAmount) }}</strong>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import StatusPill from '../../shared/StatusPill.vue';
import type { AdminMember } from '../composables/useUsers';

const props = defineProps<{
  modelValue: boolean;
  activeTab: 'profile' | 'wallet' | 'team';
  member: AdminMember | null;
  downlines: AdminMember[];
  formatNumber: (value: unknown) => string;
  getKycText: (member: AdminMember) => string;
  getKycTone: (member: AdminMember) => string;
  getStatusText: (status: string) => string;
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
  'update:activeTab': [value: 'profile' | 'wallet' | 'team'];
  'approve-kyc': [member: AdminMember];
}>();

const avatar = computed(() => (props.member?.nickname || props.member?.id || 'U').slice(0, 1).toUpperCase());
const drawerSize = computed(() => (window.innerWidth < 760 ? '100%' : '720px'));
</script>
