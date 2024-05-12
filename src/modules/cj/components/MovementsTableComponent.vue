<script lang="ts" setup>
import { QTableProps } from 'quasar';

import useMovement from '../composables/useMovement';
import { IMovement } from '../interfaces/movement.interface';

const { getMovementsStore } = useMovement();

const columns: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'Id Movimiento',
    align: 'left',
    field: (row: IMovement) => row.id,
  },
  {
    name: 'dateTime',
    label: 'Fecha Creación',
    align: 'left',
    field: (row: IMovement) => row.dateTime,
  },
  {
    name: 'numberAccount',
    label: 'Número de Cuenta',
    align: 'left',
    field: (row: IMovement) => row.numberAccount,
  },
  {
    name: 'movementType',
    label: 'Tipo Movimiento',
    align: 'left',
    field: (row: IMovement) => row.movementType,
    format: (val) => (val === 1 ? 'Ingreso' : 'Egreso'),
  },
  {
    name: 'currencyType',
    label: 'Moneda',
    align: 'left',
    field: (row: IMovement) => row.currencyType,
    format: (val) => (val === 1 ? 'Bolivianos' : 'Dólares'),
  },
  {
    name: 'amount',
    label: 'Monto',
    align: 'left',
    field: (row: IMovement) => row.amount,
  },
];
</script>
<template>
  <q-table :rows="getMovementsStore().value" :columns="columns"></q-table>
</template>
