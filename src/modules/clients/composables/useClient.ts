import { Dialog } from 'quasar';
import { storeToRefs } from 'pinia';
import { api } from 'src/boot/axios';

import { useClientStore } from '../store/useClientStore';

import { IClient } from '../interfaces/client.interface';
import { IClientSearch } from '../interfaces/client-search.interface';

const getClientResponse = async (): Promise<IClient[]> => {
  const { data } = await api.post<IClient[]>('/client/list', {});
  return data;
};

const saveClientResponse = async (obj: IClient): Promise<IClient> => {
  const { data } = await api.post<IClient>('/client/save', obj);
  return data;
};
const updateClientResponse = async (obj: IClient): Promise<IClient[]> => {
  const { data } = await api.post<IClient[]>('/client/update', obj);
  return data;
};
const deleteClientResponse = async (obj: IClient): Promise<IClient[]> => {
  const { data } = await api.post<IClient[]>('/client/delete', obj);
  return data;
};

const searchClientResponse = async (obj: IClientSearch): Promise<IClient> => {
  const { data } = await api.post<IClient>('/client/search', obj);
  return data;
};

const useClient = () => {
  const store = useClientStore();
  const { showModalCreate } = storeToRefs(store);

  const getClients = async () => {
    const data = await getClientResponse();
    store.setClientsStore(data);
  };

  const saveClient = async () => {
    await saveClientResponse(store.getClientStore().value);
    await getClients();
    showModalCreate.value = false;
    store.resetClient();
  };

  const updateClient = async () => {
    await updateClientResponse(store.getClientStore().value);
    await getClients();
    showModalCreate.value = false;
    store.resetClient();
  };

  const deleteClient = async (client: IClient) => {
    Dialog.create({
      title: 'Confirmación',
      message: '¿Seguro de Eliminar?',
      persistent: true,
      cancel: {
        label: 'Cancelar',
      },
      ok: {
        label: 'Aceptar',
        color: 'primary',
      },
    }).onOk(async () => {
      await deleteClientResponse(client);
      getClients();
    });
  };

  const showModifyClient = (client: IClient) => {
    showModalCreate.value = true;
    store.setClientStore(client);
  };

  const searchClient = async () => {
    const client = await searchClientResponse(
      store.getClientSearchStore().value
    );
    const clientList: IClient[] = [];
    if (client) {
      clientList.push(client);
      store.setClientStore(client);
      store.setClientsStore(clientList);
    }
  };

  return {
    showModalCreate,
    getClients,
    saveClient,
    updateClient,
    deleteClient,
    showModifyClient,
    searchClient,
    getClientsStore: store.getClientsStore,
    getClientStore: store.getClientStore,
    getClientSearchStore: store.getClientSearchStore,
    resetClient: store.resetClient,
    resetListClient: store.resetListClient,
    resetSearchClient: store.resetSearchClient,
  };
};

export default useClient;
