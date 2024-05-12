<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import MovementTable from '../components/MovementsTableComponent.vue';

import useClient from 'src/modules/clients/composables/useClient';
import useMovement from '../composables/useMovement';
import useAcquisition from '../../acquisitions/composables/useAcquisition';

const { push } = useRouter();
const { resetClient, resetListClient, resetSearchClient, getClientStore } =
  useClient();

const {
  getMovementStore,
  saveMovement,
  resetMovement,
  resetMovementList,
  getMovementsByClient,
} = useMovement();

const { getAccountsByClient, getAccountsStore, resetAcquisitionList } =
  useAcquisition();

const returnSearchClient = () => {
  push({ name: 'cj-search-client' });
};
onMounted(async () => {
  if (getClientStore().value.id == null) {
    returnSearchClient();
  }
  await getAccountsByClient(getClientStore().value);
  await getMovementsByClient(getClientStore().value);
});
onUnmounted(() => {
  resetClient();
  resetListClient();
  resetSearchClient();
  resetMovement();
  resetMovementList();
  resetAcquisitionList();
});

const movementTypeList = [
  {
    value: 1,
    description: 'Ingreso',
  },
  {
    value: 2,
    description: 'Egreso',
  },
];
const currencyTypeList = [
  {
    value: 1,
    description: 'Bolivianos',
  },
  {
    value: 2,
    description: 'Dólares',
  },
];
</script>
<template>
  <q-form @submit="saveMovement">
    <div class="row">
      <q-select
        class="col-4 q-px-xs"
        v-model="getMovementStore().value.accountId"
        :options="
          getAccountsStore().value.map((aux) => {
            return { value: aux.id, description: aux.numberAccount };
          })
        "
        option-value="value"
        option-label="description"
        map-options
        emit-value
        label="Cuenta Cliente"
        :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
        dense
      />
      <q-select
        class="col-4 q-px-xs"
        v-model="getMovementStore().value.movementType"
        :options="movementTypeList"
        option-value="value"
        option-label="description"
        map-options
        emit-value
        label="Tipo de Movimiento"
        :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
        dense
      />
      <q-select
        class="col-4 q-px-xs"
        v-model="getMovementStore().value.currencyType"
        :options="currencyTypeList"
        option-value="value"
        option-label="description"
        map-options
        emit-value
        label="Moneda"
        :rules="[(value:string) => value!==''&& value != null || 'El campo es requerido']"
        dense
      />
      <q-input
        class="col-4 q-px-xs"
        v-model="getMovementStore().value.amount"
        label="Monto"
        :rules="[(value:string) => value!==''&& value != null || 'El campo es requerido']"
        dense
      />
    </div>
    <q-btn class="q-my-md" color="primary" label="Procesar" type="submit" />
  </q-form>
  <Suspense>
    <MovementTable></MovementTable>
  </Suspense>

  <q-separator />
  <q-card-actions align="right">
    <q-btn
      class="q-mt-md"
      color="secondary"
      label="Volver"
      text-color="primary"
      @click="push({ name: 'cj-search-client' })"
    />
  </q-card-actions>
</template>
