import { RouteRecordRaw } from 'vue-router';

const cjRoute: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('../layouts/CjLayout.vue'),
    children: [
      {
        path: 'search-client',
        name: 'cj-search-client',
        component: () => import('../pages/ClientSearchPage.vue'),
      },
      
      {
        path: '',
        name: 'cj-movements',
        component: () => import('../pages/MovementsPage.vue'),
      },
      {
        path: 'report',
        name: 'cj-report',
        component: () => import('../pages/MovementsPage.vue'),
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

export default cjRoute;
