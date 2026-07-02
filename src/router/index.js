import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '../layouts/AdminLayout.vue';
import CommissionView from '../views/commissions/index.vue';
import DashboardView from '../views/dashboard/index.vue';
import OrdersView from '../views/orders/index.vue';
import PlansView from '../views/plans/index.vue';
import QueueView from '../views/queue/index.vue';
import SettlementView from '../views/settlement/index.vue';

const routes = [
  { path: '/', redirect: '/admin/dashboard' },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'plans', name: 'plans', component: PlansView },
      { path: 'orders', name: 'orders', component: OrdersView },
      { path: 'commissions', name: 'commissions', component: CommissionView },
      { path: 'queue', name: 'queue', component: QueueView },
      { path: 'settlement', name: 'settlement', component: SettlementView },
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

