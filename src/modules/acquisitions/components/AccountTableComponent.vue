<script lang="ts" setup>
import { QTableProps } from 'quasar';

import useAcquisition from '../composables/useAcquisition';
import { IAcquisition } from '../interfaces/acquisition.interface';
import useClient from 'src/modules/clients/composables/useClient';

const {
  getAccountsByClient,
  getAccountsStore,
  showModifyAccount,
  deleteAccount,
} = useAcquisition();
const { getClientStore } = useClient();

if (getClientStore().value.id != null) {
  await getAccountsByClient(getClientStore().value);
}

const columns: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'Id Cuenta',
    align: 'left',
    field: (row: IAcquisition) => row.id,
  },
  {
    name: 'createDate',
    label: 'Fecha Creación',
    align: 'left',
    field: (row: IAcquisition) => row.createDate,
  },
  {
    name: 'branch',
    label: 'Sucursal',
    align: 'left',
    field: (row: IAcquisition) => row.branchs,
    format: (val) =>
      val === 1 ? 'La Paz' : val === 2 ? 'Cochabamba' : 'Santa Cruz',
  },
  {
    name: 'productType',
    label: 'Producto',
    align: 'left',
    field: (row: IAcquisition) => row.productType,
    format: (val) =>
      val === 1 ? 'Cuenta Corriente' : val === 2 ? 'Caja de Ahorro' : 'DPF',
  },
  {
    name: 'currencyType',
    label: 'Moneda',
    align: 'left',
    field: (row: IAcquisition) => row.currencyType,
    format: (val) => (val === 1 ? 'Bolivianos' : 'Dólares'),
  },
  {
    name: 'numberAccount',
    label: 'Número de Cuenta',
    align: 'left',
    field: (row: IAcquisition) => row.numberAccount,
  },
  {
    name: 'amount',
    label: 'Saldo en Cuenta',
    align: 'left',
    field: (row: IAcquisition) => row.amount,
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
  <q-table :rows="getAccountsStore().value" :columns="columns"
    ><template v-slot:body-cell-action="props">
      <q-td :props="props">
        <q-btn
          dense
          round
          flat
          color="grey"
          @click="showModifyAccount({ ...props.row })"
          icon="edit"
        ></q-btn>
        <q-btn
          dense
          round
          flat
          color="grey"
          @click="deleteAccount(props.row)"
          icon="delete"
        ></q-btn>
      </q-td> </template
  ></q-table>
</template>
