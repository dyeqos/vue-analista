import { api } from 'src/boot/axios';
import { useMovementStore } from '../store/useMovementStore';
import { IMovement } from '../interfaces/movement.interface';
import { IClient } from 'src/modules/clients/interfaces/client.interface';
import useClient from 'src/modules/clients/composables/useClient';

const getMovementsClientResponse = async (
  obj: IClient
): Promise<IMovement[]> => {
  const { data } = await api.post<IMovement[]>('/movement/list/client', obj);
  return data;
};

const saveMovementResponse = async (obj: IMovement): Promise<IMovement> => {
  const { data } = await api.post<IMovement>('/movement/save', obj);
  return data;
};

const useMovement = () => {
  const store = useMovementStore();
  const { getClientStore } = useClient();
  const getMovementsByClient = async (obj: IClient) => {
    const data = await getMovementsClientResponse(obj);
    store.setMovementsStore(data);
  };

  const saveMovement = async () => {
    await saveMovementResponse(store.getMovementStore().value);
    getMovementsByClient(getClientStore().value);
    store.resetMovement();
  };

  return {
    getMovementsByClient,
    saveMovement,

    getMovementsStore: store.getMovementsStore,
    getMovementStore: store.getMovementStore,
    resetMovement: store.resetMovement,
    resetMovementList: store.resetMovementList,
  };
};

export default useMovement;
