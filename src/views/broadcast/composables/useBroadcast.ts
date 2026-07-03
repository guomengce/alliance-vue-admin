import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {
  createAdminNotificationTemplate,
  getAdminNotificationHistory,
  getAdminNotificationTemplates,
  sendAdminNotification,
  updateAdminNotificationTemplate,
} from '../../../api/services';

export type TemplateStatus = 'enabled' | 'disabled';
export type TemplateType = 'commission' | 'settlement' | 'replenishment';
export type TemplateChannel = 'in_app' | 'email' | 'sms';

export interface NotificationTemplate {
  id?: string;
  name: string;
  type: TemplateType;
  channel: TemplateChannel;
  title: string;
  content: string;
  status: TemplateStatus;
  updatedAt?: string;
}

export interface NotificationHistory {
  id: string;
  templateId: string;
  targetMemberId: string;
  channel: TemplateChannel;
  status: string;
  sentAt: string;
}

export interface BroadcastSendForm {
  templateId: string;
  targetMemberId: string;
  channel: TemplateChannel;
  title: string;
  content: string;
}

function createEmptyTemplate(): NotificationTemplate {
  return {
    name: '',
    type: 'commission',
    channel: 'in_app',
    title: '',
    content: '',
    status: 'enabled',
  };
}

export function useBroadcast() {
  const loading = ref(false);
  const editorVisible = ref(false);
  const templates = ref<NotificationTemplate[]>([]);
  const history = ref<NotificationHistory[]>([]);
  const templateForm = reactive<NotificationTemplate>(createEmptyTemplate());
  const sendForm = reactive<BroadcastSendForm>({
    templateId: '',
    targetMemberId: 'all',
    channel: 'in_app',
    title: '',
    content: '',
  });

  const replenishmentTemplate = computed(() => templates.value.find((item) => item.type === 'replenishment'));
  const templateEnabled = computed({
    get: () => templateForm.status === 'enabled',
    set: (value: boolean) => {
      templateForm.status = value ? 'enabled' : 'disabled';
    },
  });

  function typeLabel(type: TemplateType) {
    const labels: Record<TemplateType, string> = {
      commission: '佣金',
      settlement: '结算',
      replenishment: '补池提醒',
    };
    return labels[type] || type;
  }

  function channelLabel(channel: TemplateChannel) {
    const labels: Record<TemplateChannel, string> = {
      in_app: '站内信',
      email: '邮件',
      sms: '短信',
    };
    return labels[channel] || channel;
  }

  async function loadNotifications() {
    loading.value = true;
    try {
      const [templateRes, historyRes] = await Promise.all([
        getAdminNotificationTemplates({ pageSize: 100 }),
        getAdminNotificationHistory({ pageSize: 100 }),
      ]);
      templates.value = templateRes.data.items;
      history.value = historyRes.data.items;
      if (!sendForm.templateId && templates.value[0]) {
        sendForm.templateId = templates.value[0].id || '';
        syncSelectedTemplate();
      }
    } finally {
      loading.value = false;
    }
  }

  function syncSelectedTemplate() {
    const selected = templates.value.find((item) => item.id === sendForm.templateId);
    if (!selected) return;
    sendForm.channel = selected.channel;
    sendForm.title = selected.title;
    sendForm.content = selected.content;
  }

  function resetTemplateForm(next: NotificationTemplate) {
    Object.assign(templateForm, createEmptyTemplate(), next);
  }

  function openEditor(row?: NotificationTemplate) {
    resetTemplateForm(row ? { ...row } : createEmptyTemplate());
    editorVisible.value = true;
  }

  async function saveTemplate() {
    if (!templateForm.name || !templateForm.title) {
      ElMessage.warning('请填写模板名称和标题');
      return;
    }

    const payload = { ...templateForm };
    if (templateForm.id) {
      await updateAdminNotificationTemplate(templateForm.id, payload);
    } else {
      await createAdminNotificationTemplate(payload);
    }
    ElMessage.success('通知模板已保存');
    editorVisible.value = false;
    await loadNotifications();
  }

  async function sendNotification() {
    if (!sendForm.templateId) {
      ElMessage.warning('请先选择发送模板');
      return;
    }

    await sendAdminNotification({ ...sendForm });
    ElMessage.success('通知已发送');
    await loadNotifications();
  }

  onMounted(loadNotifications);

  return {
    loading,
    editorVisible,
    templates,
    history,
    templateForm,
    sendForm,
    replenishmentTemplate,
    templateEnabled,
    typeLabel,
    channelLabel,
    loadNotifications,
    syncSelectedTemplate,
    openEditor,
    saveTemplate,
    sendNotification,
  };
}
