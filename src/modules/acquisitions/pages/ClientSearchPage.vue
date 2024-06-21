<script lang="ts" setup>
import useClient from '../../clients/composables/useClient';
import ClientTable from '../components/ClientTableComponent.vue';
import { useRouter } from 'vue-router';
const {
  getClientSearchStore,
  searchClient,
  getClientsStore,
  resetSearchClient,
} = useClient();
const { push } = useRouter();

const documentTypeList = [
  {
    value: 1,
    description: 'Carnet Identidad',
  },
  {
    value: 2,
    description: 'Carnet Extranjero',
  },
];
</script>
<template>
  <q-card class="q-ma-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-icon class="q-mx-auto" flat round name="mdi-account-group" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Captaciones</q-item-label>
        <q-item-label caption> Gestión de Captaciones </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section class="q-pa-md">
      <q-form @submit="searchClient">
        <q-select
          v-model="getClientSearchStore().value.documentType"
          :options="documentTypeList"
          option-value="value"
          option-label="description"
          map-options
          emit-value
          label="Tipo de Documento"
          :rules="[(value:string) => value!==''&& value != null || 'El campo es requerido']"
          dense
        />
        <q-input
          v-model="getClientSearchStore().value.documentNumber"
          label="Número de Documento"
          :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
          dense
        />
        <q-btn
          v-close-popup
          color="secondary"
          text-color="primary"
          label="Limpiar"
          class="q-mr-md"
          @click="resetSearchClient"
        />
        <q-btn
          v-close-popup
          color="primary"
          label="Buscar"
          class="q-my-md"
          type="submit"
        />
      </q-form>
      <ClientTable></ClientTable>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn
        v-close-popup
        color="primary"
        label="Cuentas"
        :disable="getClientsStore().value.length == 0"
        @click="push({ name: 'accounts-client' })"
      />
    </q-card-actions>
  </q-card>
</template>
