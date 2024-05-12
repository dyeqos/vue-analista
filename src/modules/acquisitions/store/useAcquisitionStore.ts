import { ComputedRef, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { IAcquisition } from '../interfaces/acquisition.interface';

export const useAcquisitionStore = defineStore('acquisitionStore', () => {
  //state
  const acquisitionList = ref<IAcquisition[]>([]);
  const acquisition = ref<IAcquisition>({
    id: null,
    amount: null,
    branchs: null,
    createDate: null,
    currencyType: null,
    numberAccount: null,
    productType: null,
    clientId: null,
  });
  const showModalCreate = ref(false);

  return {
    //state
    acquisition,
    acquisitionList,
    showModalCreate,
    setAcquisitionsStore(data: IAcquisition[]): void {
      acquisitionList.value = data;
    },
    getAcquisitionsStore(): ComputedRef<IAcquisition[]> {
      return computed(() => acquisitionList.value);
    },
    setAcquisitionStore(data: IAcquisition): void {
      acquisition.value = data;
    },
    getAcquisitionStore(): ComputedRef<IAcquisition> {
      return computed(() => acquisition.value);
    },
    resetAcquisition(): void {
      acquisition.value = {
        id: null,
        amount: null,
        branchs: null,
        createDate: null,
        currencyType: null,
        numberAccount: null,
        productType: null,
        clientId: null,
      };
    },
    resetAcquisitionList(): void {
      acquisitionList.value = [];
    },
  };
});
