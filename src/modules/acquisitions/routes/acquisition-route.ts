import { RouteRecordRaw } from 'vue-router';

const acquisitionRoute: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('../layouts/AcquisitionLayout.vue'),
    children: [
      {
        path: 'search-client',
        name: 'search-client',
        component: () => import('../pages/ClientSearchPage.vue'),
      },
      {
        path: 'accounts-client',
        name: 'accounts-client',
        component: () => import('../pages/AccountsPage.vue'),
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

export default acquisitionRoute;
