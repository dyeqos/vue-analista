<script lang="ts" setup>
import useAcquisition from '../composables/useAcquisition';
import useClient from 'src/modules/clients/composables/useClient';

const {
  showModalCreate,
  getAccountStore,
  resetAcquisition,
  saveAccount,
  updateAccount,
} = useAcquisition();

const { getClientStore } = useClient();
const productTypeList = [
  {
    value: 1,
    description: 'Cuenta Corriente',
  },
  {
    value: 2,
    description: 'Caja de Ahorro',
  },

  {
    value: 3,
    description: 'Depósito Plazo Fijo',
  },
];
const currencyList = [
  {
    value: 1,
    description: 'Bolivianos',
  },
  {
    value: 2,
    description: 'Dólares Americanos',
  },
];
const branchList = [
  {
    value: 1,
    description: 'La Paz',
  },
  {
    value: 2,
    description: 'Cochabamba',
  },
  {
    value: 3,
    description: 'Santa Cruz',
  },
];
</script>
<template>
  <q-dialog v-model="showModalCreate" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="bg-secondary text-black">
        <div class="text-h6">
          {{ getAccountStore().value.id == null ? 'Nueva' : 'Modificar' }}
          Cuenta
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none">
        <q-form>
          <q-select
            v-model="getAccountStore().value.productType"
            :options="productTypeList"
            option-value="value"
            option-label="description"
            map-options
            emit-value
            label="Producto"
            :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
            dense
          />
          <q-input
            v-model="getAccountStore().value.numberAccount"
            label="Número de Cuenta"
            :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
            dense
          />
          <q-select
            v-model="getAccountStore().value.currencyType"
            :options="currencyList"
            option-value="value"
            option-label="description"
            map-options
            emit-value
            label="Moneda"
            :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
            dense
          />
          <q-select
            v-model="getAccountStore().value.branchs"
            :options="branchList"
            option-value="value"
            option-label="description"
            map-options
            emit-value
            label="Sucursal"
            :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
            dense
          />
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          v-close-popup
          color="secondary"
          text-color="primary"
          label="Cancelar"
          @click="resetAcquisition"
        />
        <q-btn
          v-if="getAccountStore().value.id == null"
          v-close-popup
          color="primary"
          label="Guardar"
          @click="saveAccount(getClientStore().value.id || 0)"
        />
        <q-btn
          v-else
          v-close-popup
          color="primary"
          label="Modificar"
          @click="updateAccount()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
