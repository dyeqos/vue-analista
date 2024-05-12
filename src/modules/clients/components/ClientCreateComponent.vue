<script lang="ts" setup>
import useClient from '../composables/useClient';

const {
  showModalCreate,
  resetClient,
  getClientStore,
  saveClient,
  updateClient,
} = useClient();

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
const genderList = [
  {
    value: 'M',
    description: 'Masculino',
  },
  {
    value: 'F',
    description: 'Femenino',
  },
];
</script>
<template>
  <q-dialog v-model="showModalCreate" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-form
        @submit="
          getClientStore().value.id == null ? saveClient() : updateClient()
        "
      >
        <q-card-section class="bg-secondary text-black">
          <div class="text-h6">
            {{ getClientStore().value.id == null ? 'Nuevo' : 'Modificar' }}
            Cliente
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-none">
          <q-input
            v-model="getClientStore().value.name"
            label="Nombre"
            :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
            dense
          />
          <q-input
            v-model="getClientStore().value.firstLastName"
            label="Primer Apellido"
            :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
            dense
          />
          <q-input
            v-model="getClientStore().value.secondLastName"
            label="Segundo Apellido"
            dense
          />
          <q-select
            v-model="getClientStore().value.documentType"
            :options="documentTypeList"
            option-value="value"
            option-label="description"
            map-options
            dense
            emit-value
            label="Tipo de Documento"
            :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
          />
          <q-input
            v-model="getClientStore().value.documentNumber"
            label="Número de Documento"
            dense
            :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
          />
          <q-input
            v-model="getClientStore().value.birthday"
            label="Fecha Nacimiento"
            dense
            mask="date"
            :rules="[
              (v) =>
                /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v) ||
                'El campo es requerido',
            ]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="getClientStore().value.birthday">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Cerrar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            v-model="getClientStore().value.gender"
            :options="genderList"
            option-value="value"
            option-label="description"
            map-options
            emit-value
            dense
            :rules="[(value:string) => value!==''&&value != null || 'El campo es requerido']"
            label="Género"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            color="secondary"
            text-color="primary"
            label="Cancelar"
            @click="resetClient"
          />
          <q-btn
            color="primary"
            :label="getClientStore().value.id == null ? 'GUARDAR' : 'MODIFICAR'"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
