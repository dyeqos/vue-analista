<script setup lang="ts">
import HeaderLayout from './HeaderLayout.vue';
import DrawerLayout from './DrawerLayout.vue';
</script>
<template>
  <q-layout view="hHh Lpr lff">
    <HeaderLayout />

    <DrawerLayout />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
