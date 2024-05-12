<script lang="ts" setup>
import { useRouter } from 'vue-router';
import useClient from '../../clients/composables/useClient';
import ClientTable from '../components/ClientTableComponent.vue';
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
  <q-card-actions align="right">
    <q-btn
      color="primary"
      label="Movimiento"
      :disable="getClientsStore().value.length == 0"
      @click="push({ name: 'cj-movements' })"
    />
  </q-card-actions>
</template>
