import { Dialog, Loading, Notify } from 'quasar';
import { storeToRefs } from 'pinia';
import { api } from 'src/boot/axios';
import { useAcquisitionStore } from '../store/useAcquisitionStore';
import { IAcquisition } from '../interfaces/acquisition.interface';
import { IClient } from '../../clients/interfaces/client.interface';

const getAccountsResponse = async (obj: IClient): Promise<IAcquisition[]> => {
  const { data } = await api.post<IAcquisition[]>('/account/list/client', obj);
  return data;
};

const saveAccountResponse = async (
  obj: IAcquisition
): Promise<IAcquisition> => {
  const { data } = await api.post<IAcquisition>('/account/save', obj);
  return data;
};
const updateAccountResponse = async (
  obj: IAcquisition
): Promise<IAcquisition> => {
  const { data } = await api.post<IAcquisition>('/account/update', obj);
  return data;
};
const deleteAccountResponse = async (obj: IAcquisition): Promise<boolean> => {
  const { data } = await api.post<boolean>('/account/delete', obj);
  return data;
};

const useAcquisition = () => {
  const store = useAcquisitionStore();
  const { showModalCreate } = storeToRefs(store);

  const getAccountsByClient = async (obj: IClient) => {
    Loading.show();
    const data = await getAccountsResponse(obj);
    store.setAcquisitionsStore(data);
    Loading.hide();
  };

  const saveAccount = async (id: number) => {
    Loading.show();
    store.getAcquisitionStore().value.clientId = id;
    const data = await saveAccountResponse(store.getAcquisitionStore().value);
    store.getAcquisitionsStore().value.push(data);
    store.resetAcquisition();
    Loading.hide();
  };

  const updateAccount = async () => {
    Loading.show();
    const data = await updateAccountResponse(store.getAcquisitionStore().value);
    const accountList = store.getAcquisitionsStore().value.map((aux) => {
      if (aux.id == data.id) {
        return data;
      } else {
        return aux;
      }
    });
    store.setAcquisitionsStore(accountList);
    store.resetAcquisition();
    Loading.hide();
  };

  const deleteAccount = async (account: IAcquisition) => {
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
        await deleteAccountResponse(account);
        const accountsList: IAcquisition[] = [];
        store.getAcquisitionsStore().value.forEach((aux) => {
          if (aux.id != account.id) {
            accountsList.push(aux);
          }
        });
        store.setAcquisitionsStore(accountsList);
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

  const showModifyAccount = (data: IAcquisition) => {
    showModalCreate.value = true;
    store.setAcquisitionStore(data);
  };

  return {
    showModalCreate,
    getAccountsByClient,
    saveAccount,
    updateAccount,
    deleteAccount,
    showModifyAccount,
    getAccountsStore: store.getAcquisitionsStore,
    getAccountStore: store.getAcquisitionStore,
    resetAcquisition: store.resetAcquisition,
    resetAcquisitionList: store.resetAcquisitionList,
  };
};

export default useAcquisition;
