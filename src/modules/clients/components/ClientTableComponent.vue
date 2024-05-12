<script lang="ts" setup>
import { QTableProps } from 'quasar';
import useClient from '../composables/useClient';
import { IClient } from '../interfaces/client.interface';

const { getClients, getClientsStore, showModifyClient, deleteClient } =
  useClient();
await getClients();

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
  {
    name: 'action',
    align: 'center',
    label: '',
    field: '',
  },
];
</script>
<template>
  <q-table :rows="getClientsStore().value" :columns="columns" row-key="id"
    ><template v-slot:body-cell-action="props">
      <q-td :props="props">
        <q-btn
          dense
          round
          flat
          color="grey"
          @click="showModifyClient(props.row)"
          icon="edit"
        ></q-btn>
        <q-btn
          dense
          round
          flat
          color="grey"
          @click="deleteClient(props.row)"
          icon="delete"
        ></q-btn>
      </q-td> </template
  ></q-table>
</template>
