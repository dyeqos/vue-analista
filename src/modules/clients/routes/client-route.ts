import { RouteRecordRaw } from 'vue-router';

const clientRoute: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('../layouts/ClientLayout.vue'),
    children: [
      {
        path: '',
        name: 'client',
        component: () => import('../pages/ClientPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default clientRoute;
