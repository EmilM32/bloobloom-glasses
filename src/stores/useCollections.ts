import type { Collection, Glass } from '@/interfaces';
import { defineStore } from 'pinia';

interface CollectionsState {
  collections: Collection[];
  glasses: Glass[];
}

export const useCollectionsStore = defineStore('collections', {
  state: (): CollectionsState => ({
    collections: [],
    glasses: []
  }),
  getters: {
    getCollections: (state) => {
      return state.collections;
    }
  },
  actions: {
    setCollections(collections: Collection[]) {
      this.collections = collections;
    }
  },
})
