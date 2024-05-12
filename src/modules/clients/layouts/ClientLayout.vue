<script lang="ts" setup></script>
<template>
  <q-card class="q-ma-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-icon class="q-mx-auto" flat round name="mdi-account-group" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Clientes</q-item-label>
        <q-item-label caption>Gestión de Clientes</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section class="q-pa-md">
      <RouterView />
    </q-card-section>
  </q-card>
</template>
