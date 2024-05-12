import { ComputedRef, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { IClient } from '../interfaces/client.interface';
import { IClientSearch } from '../interfaces/client-search.interface';

export const useClientStore = defineStore('clientStore', () => {
  //state
  const clientList = ref<IClient[]>([]);
  const client = ref<IClient>({
    id: null,
    birthday: null,
    documentNumber: null,
    documentType: null,
    firstLastName: null,
    gender: null,
    name: null,
    secondLastName: null,
  });
  const clientSearch = ref<IClientSearch>({
    documentNumber: null,
    documentType: null,
  });
  const showModalCreate = ref(false);

  return {
    //state
    client,
    clientList,
    clientSearch,
    showModalCreate,
    setClientsStore(data: IClient[]): void {
      clientList.value = data;
    },
    getClientsStore(): ComputedRef<IClient[]> {
      return computed(() => clientList.value);
    },
    setClientStore(data: IClient): void {
      client.value = data;
    },
    getClientStore(): ComputedRef<IClient> {
      return computed(() => client.value);
    },
    getClientSearchStore(): ComputedRef<IClientSearch> {
      return computed(() => clientSearch.value);
    },
    resetClient(): void {
      client.value = {
        id: null,
        birthday: null,
        documentNumber: null,
        documentType: null,
        firstLastName: null,
        gender: null,
        name: null,
        secondLastName: null,
      };
    },
    resetListClient(): void {
      clientList.value = [];
    },
    resetSearchClient(): void {
      clientSearch.value = {
        documentNumber: null,
        documentType: null,
      };
    },
  };
});
