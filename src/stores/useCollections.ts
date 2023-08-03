import type { Collection, Glass, Glasses } from '@/interfaces';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';

interface CollectionsState {
  _collections: Collection[];
  _glasses: Glass[];
}

export const useCollectionsStore = defineStore('collections', {
  state: (): CollectionsState => ({
    _collections: [],
    _glasses: []
  }),
  getters: {
    collections: (state) => {
      return state._collections;
    },
    glasses: (state) => {
      return state._glasses;
    },
  },
  actions: {
    setCollections(collections: Collection[]) {
      this._collections = collections;
    },
    async fetchGlasses(url: string) {
      try {
        const { data } = await useFetch<Glasses>(url).json();
        this._glasses = data.value.glasses;
      } catch (error) {
        let message = 'Something went wrong';
        if (error instanceof Error) message = error.message;
        throw new Error(message);
      }
    },
  },
})
