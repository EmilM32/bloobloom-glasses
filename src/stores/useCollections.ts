import type { Collection, Glass, Glasses } from '@/interfaces'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'

interface CollectionsState {
  _collections: Collection[]
  _glasses: Glass[]
  _page: number
  _isFetching: boolean
  _collectionTotalCount: number
}

export const useCollectionsStore = defineStore('collections', {
  state: (): CollectionsState => ({
    _collections: [],
    _glasses: [],
    _page: 1,
    _isFetching: false,
    _collectionTotalCount: 0
  }),
  getters: {
    collections: (state) => {
      return state._collections
    },
    collectionsSerialized: (state) => {
      const sunglasses = state._collections.filter((collection) => {
        return (
          collection.configuration_name.includes('sunglasses') &&
          !collection.configuration_name.includes('all')
        )
      })

      const spectacles = state._collections.filter((collection) => {
        return (
          collection.configuration_name.includes('spectacles') &&
          !collection.configuration_name.includes('all')
        )
      })

      return { sunglasses, spectacles }
    },
    glasses: (state) => {
      return state._glasses
    },
    page: (state) => {
      return state._page
    },
    isFetching: (state) => {
      return state._isFetching
    }
  },
  actions: {
    setCollections(collections: Collection[]) {
      this._collections = collections
    },
    async fetchGlasses(url: string) {
      try {
        this._isFetching = true
        const { data } = await useFetch<Glasses>(url).json()
        this._glasses = data.value.glasses
        this._collectionTotalCount = data.value.meta.total_count
      } catch (error) {
        let message = 'Something went wrong'
        if (error instanceof Error) message = error.message
        throw new Error(message)
      } finally {
        this._isFetching = false
      }
    },
    async fetchMoreGlasses(url: string) {
      try {
        if (this._glasses.length === this._collectionTotalCount) return

        this._isFetching = true
        const { data } = await useFetch<Glasses>(url).json()
        this._glasses.push(...data.value.glasses)
        this._collectionTotalCount = data.value.meta.total_count
      } catch (error) {
        let message = 'Something went wrong'
        if (error instanceof Error) message = error.message
        throw new Error(message)
      } finally {
        this._isFetching = false
      }
    },
    incrementPage() {
      this._page++
    },
    resetPage() {
      this._page = 1
    },
    resetTotalCount() {
      this._collectionTotalCount = 0
    }
  }
})
