import { ComputedRef, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { IMovement } from '../interfaces/movement.interface';

export const useMovementStore = defineStore('movementStore', () => {
  //state
  const movementList = ref<IMovement[]>([]);
  const movement = ref<IMovement>({
    id: null,
    movementType: null,
    currencyType: null,
    amount: null,
    dateTime: null,
    accountId: null,
    numberAccount: null,
  });

  return {
    //state
    movement,
    movementList,
    setMovementsStore(data: IMovement[]): void {
      movementList.value = data;
    },
    getMovementsStore(): ComputedRef<IMovement[]> {
      return computed(() => movementList.value);
    },
    setMovementStore(data: IMovement): void {
      movement.value = data;
    },
    getMovementStore(): ComputedRef<IMovement> {
      return computed(() => movement.value);
    },
    resetMovement(): void {
      movement.value = {
        id: null,
        movementType: null,
        currencyType: null,
        amount: null,
        dateTime: null,
        accountId: null,
        numberAccount: null,
      };
    },
    resetMovementList(): void {
      movementList.value = [];
    },
  };
});
