<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import AccountTable from '../components/AccountTableComponent.vue';
import ModalAccount from '../components/AccountCreateComponent.vue';
import useAcquisition from '../composables/useAcquisition';
import useClient from 'src/modules/clients/composables/useClient';

const { push } = useRouter();
const { showModalCreate, resetAcquisition, resetAcquisitionList } =
  useAcquisition();
const { resetClient, resetListClient, resetSearchClient, getClientStore } =
  useClient();

const returnSearchClient = () => {
  push({ name: 'search-client' });
};

onMounted(() => {
  if (getClientStore().value.id == null) {
    returnSearchClient();
  }
});
onUnmounted(() => {
  resetAcquisition();
  resetAcquisitionList();
  resetClient();
  resetListClient();
  resetSearchClient();
});
</script>
<template>
  <q-card class="q-ma-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-icon class="q-mx-auto" flat round name="mdi-account-group" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Cuentas del Cliente</q-item-label>
        <q-item-label caption> Gestión de Cuentas del Cliente</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section class="q-pa-md">
      <q-btn
        class="q-mb-md"
        label="Crear"
        color="primary"
        @click="showModalCreate = true"
      />
      <Suspense>
        <AccountTable></AccountTable>
      </Suspense>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn
        v-close-popup
        color="secondary"
        label="Volver"
        text-color="primary"
        @click="returnSearchClient"
      />
    </q-card-actions>
  </q-card>
  <ModalAccount></ModalAccount>
</template>
