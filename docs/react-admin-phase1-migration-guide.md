# React Admin Phase 1 Migration Guide

目标：将 React 源项目中的 `AdminOrdersView.tsx`、`AdminCommissionsView.tsx`、`AdminQueueView.tsx`、`AdminSettlementView.tsx` 迁移到当前 Vue + Element Plus 项目，按套餐管理页的模式组件化，并最大限度还原 React 客户确认过的视觉。

## 全局规则

- 不要把 Tailwind 长 class 原样塞进 Vue 组件。
- 通用 Element Plus 样式只写在 `src/styles/reset.css`。
- 模块私有样式写在 `src/styles/modules/<module>.css`，并在 `src/styles/index.css` 中 import。
- 每个页面入口 `index.vue` 只负责组装组件和调用 composable。
- 业务展示卡、说明面板、移动端卡片用普通 Vue 组件 + 模块 CSS 还原；表单、输入、按钮、弹窗、标签优先用 Element Plus。
- 桌面端保留密集表格或 grid-table，移动端必须改成 stacked cards，不能横向溢出。

## 已准备好的通用 reset

`src/styles/reset.css` 已覆盖这些 Element Plus 基础组件：

- `el-button`：12px 圆角、点击缩放、紫色渐变 primary、绿色 success。
- `el-input`、`el-textarea`、`el-input-number`、`el-select`：深色底、紫色 hover 边框、12px 圆角。
- `el-tag`：圆形胶囊状态标签，success/danger 颜色已贴近 React。
- `el-dialog`、`el-overlay`：深色圆角弹窗、黑色毛玻璃遮罩。
- `el-card`：深色面板基础。
- `el-table`：深色透明表格、暗色表头、hover 行。
- `el-tabs`：紫色激活态。
- `el-loading`、`el-message-box`：深色环境适配。

后续模块 CSS 不要重复写这些基础样式，除非某个模块有特殊布局。

## 跨模块复用视觉组件

建议四个模块统一使用以下组件命名和接口。可以按需放在各模块 `components/` 中；如果第二阶段复用变多，再上移到 `src/views/shared/`。

### MetricSummaryCard.vue

用途：佣金管理顶部三张统计卡、其他模块后续也可复用。

Props：
- `label: string`
- `value: string | number`
- `tone: 'purple' | 'amber' | 'red' | 'green'`
- `icon?: Component`

样式要点：
- 背景 `#1c1824`
- 边框 `rgba(255,255,255,.05)`
- 圆角 `16px`
- label 为 10px uppercase，value 为 20px 粗体 mono。

### StatusPill.vue

用途：所有状态胶囊。

Props：
- `status: string`
- `text: string`
- `tone: 'success' | 'warning' | 'danger' | 'purple' | 'muted'`
- `pulse?: boolean`

实现：
- 内部用 `el-tag` 或普通 `span` 都可以。
- pending/待审核/待结算状态需要 `animate-pulse` 等价动画，可在模块 CSS 中定义。

### AuditOverlay.vue

用途：佣金详情弹窗、结算详情弹窗；订单详情和排队详情是独立详情页，不建议用弹窗。

Props：
- `modelValue: boolean`
- `title: string`
- `subtitle?: string`

Slots：
- `default`
- `footer`

实现：
- 用 `el-dialog`。
- header 自定义，右上角关闭按钮，主体可滚动，最大高度 `90vh`。

### SearchBox.vue

用途：订单详情佣金搜索、佣金列表搜索、排队详情触发记录搜索。

Props：
- `modelValue: string`
- `placeholder: string`

实现：
- 用 `el-input`，前置搜索图标，非空时出现清空按钮。

### MobileDataCard.vue

用途：所有移动端列表。

Props：
- `title`
- `subtitle`
- `statusText`
- `statusTone`
- `fields: Array<{ label, value, tone? }>`

Slots：
- `actions`

样式要点：
- 背景 `rgba(29,25,37,.4)`
- border `rgba(255,255,255,.05)`
- 圆角 `16px`
- 字号 9-12px，重要金额用 mono + 颜色。

## orders 订单管理

React 源文件：`D:\項目\22 troo\alliance-system\src\components\AdminOrdersView.tsx`

当前 React 页面结构：
- 列表页 `admin_orders_view`
- 详情页 `admin_orders_detail_view`
- 列表页有导出按钮、桌面表格、移动卡片。
- 详情页不是弹窗，是整页切换，有返回按钮。
- pending 订单在详情页顶部有黄色 warning action block，可确认到账或驳回。
- 详情页包含两列信息卡：资金流向与交易校对、TROO 股票认购份额转拨明细。
- 详情页底部有佣金分拨明细，桌面为 5 列 grid-table，移动为卡片。

建议文件：
- `src/views/orders/index.vue`
- `src/views/orders/components/OrderListHeader.vue`
- `src/views/orders/components/OrderTable.vue`
- `src/views/orders/components/OrderMobileList.vue`
- `src/views/orders/components/OrderDetailView.vue`
- `src/views/orders/components/OrderPendingActions.vue`
- `src/views/orders/components/OrderFinanceCard.vue`
- `src/views/orders/components/OrderStockCard.vue`
- `src/views/orders/components/OrderCommissionTrace.vue`
- `src/views/orders/composables/useOrders.mjs`
- `src/styles/modules/orders.css`

入口职责：
- `selectedOrder` 为空时显示列表。
- `selectedOrder` 有值时显示 `OrderDetailView`。

移动端要求：
- `< 768px` 隐藏桌面表格，显示订单卡片。
- 详情页中的资金卡和股票卡改成单列。
- 佣金分拨表格改成卡片列表。

数据字段映射：
- React `uid` 对应当前接口 `memberId/memberName`。
- React `planName` 对应 `packageName`。
- React `amount` 对应 `amount`。
- React `status` 的 `confirmed/pending/cancelled` 可映射当前 `paid/pending/failed/refunded`，展示文案按 React：
  - confirmed：完成/已交割
  - pending：待审核入账
  - cancelled：已中止作废
- `paymentChannel`、`txid`、`cashFlowTrack`、`stockConversion`、`commissionAllocations` 当前接口若没有，先在 mapper 中给默认展示值，不要让 UI 空白。

## commissions 佣金管理

React 源文件：`D:\項目\22 troo\alliance-system\src\components\AdminCommissionsView.tsx`

当前 React 页面结构：
- 顶部 3 张统计卡。
- 主面板标题“佣金列表”。
- 搜索框。
- 四个 tab chip：全部明细、已入池划账、额度池阻塞、受阻拦截回笼。
- 列表桌面端为表格，移动端为卡片。
- 点击查看打开详情 overlay。
- overlay 可滚动，含基础事实、分润源头追踪、异常报告、人工处理区。

建议文件：
- `src/views/commissions/index.vue`
- `src/views/commissions/components/CommissionSummaryGrid.vue`
- `src/views/commissions/components/CommissionFilterTabs.vue`
- `src/views/commissions/components/CommissionTable.vue`
- `src/views/commissions/components/CommissionMobileList.vue`
- `src/views/commissions/components/CommissionDetailOverlay.vue`
- `src/views/commissions/components/CommissionOriginPanel.vue`
- `src/views/commissions/components/CommissionExceptionPanel.vue`
- `src/views/commissions/composables/useCommissions.mjs`
- `src/views/commissions/composables/commissionMappers.mjs`
- `src/styles/modules/commissions.css`

状态文案：
- `credited`：已入池划账，绿色。
- `pending`：待日终划账，黄色且 pulse。
- `pool_insufficient`：额度不足阻塞，黄色/橙色。
- `failed`：广播回滚失败，红色。
- `intercepted`：拦截回笼存池，红色。

移动端要求：
- 每条佣金卡顶部显示 `id` 和 `orderId`。
- 中间两列显示代理人 UID 和金额。
- 底部左侧状态，右侧“查看”按钮。

注意：
- React 中 `overflowLogs` 会映射成 `intercepted` 类型记录。Vue 实现也应在 composable 中统一合并普通佣金和溢出回笼记录。

## queue 排队管理

React 源文件：`D:\項目\22 troo\alliance-system\src\components\AdminQueueView.tsx`

当前 React 页面结构：
- 列表页 `admin_queue_view`。
- 详情页 `queue_roster_detail_page`。
- 列表页顶部有两列说明面板：排队与交割核心机制指南、智能校对账务监控。
- 列表桌面端为表格，移动端为卡片。
- 点击“记录详情”进入整页详情。
- 详情页顶部返回条。
- 详情页左侧主区域：三张锁仓金额统计卡、手动修正表单、触发记录搜索和列表。
- 详情页右侧说明卡：智能校对监控规范、结算风控提示。

建议文件：
- `src/views/queue/index.vue`
- `src/views/queue/components/QueueGuidePanel.vue`
- `src/views/queue/components/QueueRosterTable.vue`
- `src/views/queue/components/QueueRosterMobileList.vue`
- `src/views/queue/components/QueueDetailView.vue`
- `src/views/queue/components/QueueDetailHeader.vue`
- `src/views/queue/components/QueueAmountStats.vue`
- `src/views/queue/components/QueueCalibrationForm.vue`
- `src/views/queue/components/QueueTriggerHistory.vue`
- `src/views/queue/components/QueueRiskGuide.vue`
- `src/views/queue/composables/useQueueRoster.mjs`
- `src/styles/modules/queue.css`

交互：
- `selectedRoster` 为空显示列表，有值显示详情页。
- `isEditingData` 控制三张统计卡与手动修正表单切换。
- 保存修正时，如果 `current + unlocked !== original`，需要确认提示。
- 修正后插入一条 `TRIG-CAL-xxxx` 记录。

移动端要求：
- 列表页卡片展示 UID、昵称、触发次数、初始锁定、锁定余额、已释出。
- 详情页触发历史表格改为卡片，每卡展示触发 ID、时间、解锁金额、直推成员 UID、订单号。

## settlement 结算管理

React 源文件：`D:\項目\22 troo\alliance-system\src\components\AdminSettlementView.tsx`

当前 React 页面结构：
- 单页列表 + 详情 overlay。
- 顶部标题和“启动全盟结算对账”按钮。
- 顶部说明面板：D+1 轧账时序规则、额度匮乏拦截、手动风控干预，以及右侧审计小卡。
- 列表桌面端为表格，移动端为卡片。
- 点击“校准/精算审核校准”打开详情 overlay。
- overlay 展示结算成员、结算期、预拨、可用额度池、实到账、溢漏回笼。
- 额度不足时显示红色警报。
- overlay 有两个操作：通知会员佣金额池枯竭、人工补发并强制轧账。

建议文件：
- `src/views/settlement/index.vue`
- `src/views/settlement/components/SettlementHeader.vue`
- `src/views/settlement/components/SettlementWorkflowGuide.vue`
- `src/views/settlement/components/SettlementTable.vue`
- `src/views/settlement/components/SettlementMobileList.vue`
- `src/views/settlement/components/SettlementAuditOverlay.vue`
- `src/views/settlement/components/SettlementCapacityWarning.vue`
- `src/views/settlement/composables/useSettlement.mjs`
- `src/views/settlement/composables/settlementMappers.mjs`
- `src/styles/modules/settlement.css`

状态文案：
- `fully_settled`：全额派发，绿色。
- `clipped`：超额溢流截断/超额扣税，红色。
- `stalled_exception`：待人工干预，深红 + amber 文案 + pulse。
- `low_capacity_notified`：已推警告邮件，紫色。

移动端要求：
- 每张卡顶部显示 memberUid/nickname 和状态。
- 中间 2x2 字段：预拨虚增应得、可用佣金池限额、实派到账、溢扣平台准备金。
- 底部右侧按钮打开 overlay。

## 模块 CSS 写法约束

每个模块 CSS 只写自己的布局和业务块，不重复 Element 基础样式。建议类名：

- orders：`.orders-view`、`.orders-panel`、`.orders-table-wrap`、`.order-mobile-card`、`.order-detail`、`.order-audit-card`、`.order-commission-trace`
- commissions：`.commissions-view`、`.commission-summary-grid`、`.commission-filter-tabs`、`.commission-mobile-card`、`.commission-detail-overlay`
- queue：`.queue-view`、`.queue-guide-grid`、`.queue-roster-card`、`.queue-detail`、`.queue-calibration-form`、`.queue-trigger-card`
- settlement：`.settlement-view`、`.settlement-guide-grid`、`.settlement-mobile-card`、`.settlement-audit`

响应式断点：

```css
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}

@media (min-width: 769px) {
  .desktop-only {
    display: block;
  }

  .mobile-only {
    display: none;
  }
}
```

如果使用 `el-table`，移动端不要强行显示表格，必须另写卡片组件。

## 给实现 AI 的顺序

1. 先迁移 `orders`，因为它包含“列表页/详情页切换 + 桌面表格 + 移动卡片 + 详情 grid-table”，是最完整模板。
2. 再迁移 `commissions`，复用统计卡、tab chip、详情 overlay。
3. 再迁移 `queue`，复用列表/详情页切换和搜索卡片。
4. 最后迁移 `settlement`，复用说明面板、详情 overlay、状态胶囊。

每做完一个模块都必须：
- `npm run build`
- 桌面宽度检查列表和详情。
- 手机宽度检查是否无横向滚动、按钮不挤压、文字不重叠。
