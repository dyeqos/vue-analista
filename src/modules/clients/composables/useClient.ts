import { Dialog, Loading, Notify } from 'quasar';
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
    Loading.show();
    const data = await getClientResponse();
    store.setClientsStore(data);
    Loading.hide();
  };

  const saveClient = async () => {
    Loading.show();
    await saveClientResponse(store.getClientStore().value);
    await getClients();
    showModalCreate.value = false;
    store.resetClient();
    Loading.hide();
  };

  const updateClient = async () => {
    Loading.show();
    await updateClientResponse(store.getClientStore().value);
    await getClients();
    showModalCreate.value = false;
    store.resetClient();
    Loading.hide();
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
      try {
        Loading.show();
        await deleteClientResponse(client);
        getClients();
      } catch (e: any) {
        Notify.create({
          message: e.response.data,
          position: 'top-right',
          color: 'red',
        });
      }finally{
        Loading.hide();
      }
    });
  };

  const showModifyClient = (client: IClient) => {
    showModalCreate.value = true;
    store.setClientStore(client);
  };

  const searchClient = async () => {
    Loading.show();
    const client = await searchClientResponse(
      store.getClientSearchStore().value
    );
    const clientList: IClient[] = [];
    if (client) {
      clientList.push(client);
      store.setClientStore(client);
      store.setClientsStore(clientList);
    }
    Loading.hide();
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
