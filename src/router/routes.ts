import { RouteRecordRaw } from 'vue-router';
import acquisitionRoute from 'src/modules/acquisitions/routes/acquisition-route';
import clientRoute from 'src/modules/clients/routes/client-route';
import cjRoute from 'src/modules/cj/routes/cj-route';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/client',
    component: () => import('layouts/MainLayout.vue'),
    children: clientRoute,
  },
  {
    path: '/acquisition',
    component: () => import('layouts/MainLayout.vue'),
    children: acquisitionRoute,
  },
  {
    path: '/movement',
    component: () => import('layouts/MainLayout.vue'),
    children: cjRoute,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
