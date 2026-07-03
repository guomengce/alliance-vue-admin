import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '../layouts/AdminLayout.vue';
import AuthView from '../views/auth/AuthView.vue';
import BroadcastView from '../views/broadcast/index.vue';
import CommissionView from '../views/commissions/index.vue';
import DashboardView from '../views/dashboard/index.vue';
import FinanceView from '../views/finance/index.vue';
import LogsView from '../views/logs/index.vue';
import OrdersView from '../views/orders/index.vue';
import ParametersView from '../views/parameters/index.vue';
import PlansView from '../views/plans/index.vue';
import ProfileView from '../views/profile/index.vue';
import QueueView from '../views/queue/index.vue';
import RbacView from '../views/rbac/index.vue';
import ReportsView from '../views/reports/index.vue';
import SettlementView from '../views/settlement/index.vue';
import UsersView from '../views/users/index.vue';

const routes = [
  { path: '/', redirect: '/admin/dashboard' },
  { path: '/login', component: AuthView, meta: { authMode: 'login' } },
  { path: '/register', redirect: '/login' },
  { path: '/forgot-password', redirect: '/login' },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'users', name: 'users', component: UsersView },
      { path: 'plans', name: 'plans', component: PlansView },
      { path: 'orders', name: 'orders', component: OrdersView },
      { path: 'commissions', name: 'commissions', component: CommissionView },
      { path: 'queue', name: 'queue', component: QueueView },
      { path: 'settlement', name: 'settlement', component: SettlementView },
      { path: 'finance', name: 'finance', component: FinanceView },
      { path: 'parameters', name: 'parameters', component: ParametersView },
      { path: 'broadcast', name: 'broadcast', component: BroadcastView },
      { path: 'rbac', name: 'rbac', component: RbacView },
      { path: 'reports', name: 'reports', component: ReportsView },
      { path: 'logs', name: 'logs', component: LogsView },
      { path: 'profile', name: 'profile', component: ProfileView },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/admin/dashboard',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
