import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getAdminMemberDownlines, getAdminMembers, reviewAdminMemberKyc } from '../../../api/services';

export interface AdminMember {
  id: string;
  memberNo: string;
  nickname: string;
  email: string;
  phone: string;
  inviterId: string | null;
  status: 'active' | 'disabled' | 'frozen';
  level: string;
  joinedAt: string;
  totalOrderAmount: number;
  teamSize: number;
  kyc: {
    l1?: 'approved' | 'pending' | 'not_submitted';
    l2?: 'approved' | 'pending' | 'not_submitted';
  };
  wallet: {
    usdtBalance: number;
    trooBalance: number;
    queueBalance: number;
  };
}

type KycFilter = 'all' | 'pending' | 'approved';

export function useUsers() {
  const loading = ref(false);
  const members = ref<AdminMember[]>([]);
  const selectedMember = ref<AdminMember | null>(null);
  const selectedDownlines = ref<AdminMember[]>([]);
  const drawerVisible = ref(false);
  const activeTab = ref<'profile' | 'wallet' | 'team'>('profile');
  const filters = reactive({
    keyword: '',
    kyc: 'all' as KycFilter,
  });

  const filteredMembers = computed(() => {
    const keyword = filters.keyword.trim().toLowerCase();
    return members.value.filter((member) => {
      const keywordMatch =
        !keyword ||
        [member.id, member.memberNo, member.nickname, member.email, member.phone, member.level].some((field) =>
          String(field || '').toLowerCase().includes(keyword),
        );

      const kycMatch =
        filters.kyc === 'all' ||
        (filters.kyc === 'pending' && member.kyc?.l2 === 'pending') ||
        (filters.kyc === 'approved' && member.kyc?.l2 === 'approved');

      return keywordMatch && kycMatch;
    });
  });

  async function loadMembers() {
    loading.value = true;
    try {
      const res = await getAdminMembers({ pageSize: 100 });
      members.value = res.data.items || [];
    } finally {
      loading.value = false;
    }
  }

  async function openMember(member: AdminMember) {
    selectedMember.value = member;
    activeTab.value = 'profile';
    drawerVisible.value = true;
    const res = await getAdminMemberDownlines(member.id, { pageSize: 50 });
    selectedDownlines.value = res.data.items || [];
  }

  async function approveKyc(member: AdminMember) {
    if (member.kyc?.l2 !== 'pending') return;
    await reviewAdminMemberKyc(member.id, { level: 'l2', status: 'approved', reviewer: 'admin' });
    ElMessage.success(`会员 ${member.id} 的 KYC L2 已审核通过`);
    await loadMembers();
    if (selectedMember.value?.id === member.id) {
      selectedMember.value = members.value.find((item) => item.id === member.id) || selectedMember.value;
    }
  }

  function formatNumber(value: unknown) {
    return Number(value || 0).toLocaleString();
  }

  function getKycText(member: AdminMember) {
    if (member.kyc?.l2 === 'approved') return 'L2 已通过';
    if (member.kyc?.l2 === 'pending') return 'L2 待审';
    if (member.kyc?.l1 === 'approved') return 'L1 已通过';
    return '未提交';
  }

  function getKycTone(member: AdminMember) {
    if (member.kyc?.l2 === 'approved') return 'success';
    if (member.kyc?.l2 === 'pending') return 'warning';
    if (member.kyc?.l1 === 'approved') return 'purple';
    return 'muted';
  }

  function getStatusText(status: string) {
    const map: Record<string, string> = {
      active: '正常活跃',
      frozen: '冻结受限',
      disabled: '注销禁用',
    };
    return map[status] || status;
  }

  onMounted(loadMembers);

  return {
    loading,
    filters,
    filteredMembers,
    selectedMember,
    selectedDownlines,
    drawerVisible,
    activeTab,
    formatNumber,
    getKycText,
    getKycTone,
    getStatusText,
    loadMembers,
    openMember,
    approveKyc,
  };
}
