import { defineStore } from 'pinia'
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('history')

interface FiltersState {
  _category: string
  _colours: string[]
  _shapes: string[]
}

export const useFiltersStore = defineStore('filters', {
  state: (): FiltersState => ({
    _category: '',
    _colours: [],
    _shapes: []
  }),
  getters: {
    category: (state) => {
      return state._category
    },
    colours: (state) => {
      return state._colours
    },
    shapes: (state) => {
      return state._shapes
    }
  },
  actions: {
    setCategory(category: string) {
      this._category = category
    },
    addColour(colour: string) {
      this._colours.push(colour)

      if (!params?.colour?.includes(colour)) {
        params.colour = this._colours.join(',')
      }
    },
    removeColour(colour: string) {
      this._colours = this._colours.filter((c) => c !== colour)
      if (this._colours.length) {
        params.colour = this._colours.join(',')
      } else {
        delete params.colour
      }
    },
    addShape(shape: string) {
      this._shapes.push(shape)

      if (!params?.shape?.includes(shape)) {
        params.shape = this._shapes.join(',')
      }
    },
    removeShape(shape: string) {
      this._shapes = this._shapes.filter((s) => s !== shape)
      if (this._shapes.length) {
        params.shape = this._shapes.join(',')
      } else {
        delete params.shape
      }
    }
  }
})
