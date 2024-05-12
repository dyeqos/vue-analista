import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainMenu = defineStore('mainMenuStore', () => {
  const state = ref(true);

  return {
    state,
  };
});
