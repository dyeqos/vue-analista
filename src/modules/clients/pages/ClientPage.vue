<script lang="ts" setup>
import { onUnmounted } from 'vue';
import useClient from '../composables/useClient';
import ClientTable from '../components/ClientTableComponent.vue';
import ClientCreate from '../components/ClientCreateComponent.vue';

const { showModalCreate, resetClient, resetListClient } = useClient();

onUnmounted(() => {
  resetClient();
  resetListClient();
});
</script>
<template>
  <q-btn
    class="q-mb-md"
    label="Crear"
    color="primary"
    @click="showModalCreate = true"
  />

  <Suspense>
    <ClientTable></ClientTable>
  </Suspense>
  <ClientCreate></ClientCreate>
</template>
