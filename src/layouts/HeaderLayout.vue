<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMainMenu } from '../stores/main-menu.store';

const store = useMainMenu();
const { state } = storeToRefs(store);
const toggleLeftDrawer = () => {
  state.value = !state.value;
};
</script>

<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="mdi-menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> Diego Calvi Luna </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
</template>
