<script lang="ts" setup>
import { QTableProps } from 'quasar';
import useClient from 'src/modules/clients/composables/useClient';
import { IClient } from 'src/modules/clients/interfaces/client.interface';

const { getClientsStore } = useClient();

const columns: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'Id Cliente',
    align: 'left',
    field: (row: IClient) => row.id,
  },
  {
    name: 'name',
    label: 'Nombre',
    align: 'left',
    field: (row: IClient) => row.name,
  },
  {
    name: 'firstLastName',
    label: 'Apellido Paterno',
    align: 'left',
    field: (row: IClient) => row.firstLastName,
  },
  {
    name: 'secondLastName',
    label: 'Apellido Materno',
    align: 'left',
    field: (row: IClient) => row.secondLastName,
  },
  {
    name: 'documentType',
    label: 'Tipo de Documento',
    align: 'left',
    field: (row: IClient) => row.documentType,
    format: (val) => (val === 1 ? 'Carnet Identidad' : 'Carnet Extranjero'),
  },
  {
    name: 'documentNumber',
    label: 'Número de Documento',
    align: 'left',
    field: (row: IClient) => row.documentNumber,
  },
  {
    name: 'birthday',
    label: 'Fecha Nacimiento',
    align: 'left',
    field: (row: IClient) => row.birthday,
  },
];
</script>
<template>
  <div v-if="getClientsStore().value.length > 0">
    <q-table :rows="getClientsStore().value" :columns="columns"></q-table>
  </div>
</template>
