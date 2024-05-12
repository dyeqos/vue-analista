<script lang="ts" setup>
import MenuList, { MenuItemInterface } from './MenuList.vue';
import { useMainMenu } from '../stores/main-menu.store';
import { storeToRefs } from 'pinia';

const menuList: MenuItemInterface[] = [
  {
    title: 'Clientes',
    caption: 'Módulo de Clientes',
    icon: 'mdi-view-dashboard',
    link: '#/client',
  },

  {
    title: 'Captaciones',
    caption: 'Módulo de Captaciones',
    icon: 'mdi-bank',
    link: '#/acquisition/search-client',
  },
  {
    title: 'Cajas',
    caption: 'Procesos de Cajas',
    icon: 'mdi-view-list',
    children: [
      {
        title: 'Depósitos',
        caption: 'Entrada y Salida',
        icon: 'mdi-store-cog-outline',
        link: '#/movement/search-client',
      },
      // {
      //   title: 'Reportes',
      //   caption: 'Reportes de Movimientos',
      //   icon: 'mdi-store',
      //   link: '#/movement/report',
      // },
    ],
  },
];

const store = useMainMenu();
const { state } = storeToRefs(store);
</script>
<template>
  <q-drawer v-model="state" show-if-above bordered>
    <q-list>
      <q-item-label header> Módulos </q-item-label>

      <MenuList v-for="link in menuList" :key="link.title" v-bind="link" />
    </q-list>
  </q-drawer>
</template>
