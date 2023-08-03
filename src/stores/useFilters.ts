import { defineStore } from 'pinia';

interface FiltersState {
  _category: string;
  _colours: string[];
  _shapes: string[];
}

export const useFiltersStore = defineStore('filters', {
  state: (): FiltersState => ({
    _category: '',
    _colours: [],
    _shapes: [],
  }),
  getters: {
    category: (state) => {
      return state._category;
    },
    colours: (state) => {
      return state._colours;
    },
    shapes: (state) => {
      return state._shapes;
    },
  },
  actions: {
    setCategory(category: string) {
      this._category = category;
    },
    addColour(colour: string) {
      this._colours.push(colour);
    },
    removeColour(colour: string) {
      this._colours = this._colours.filter((c) => c !== colour);
    },
    addShape(shape: string) {
      this._shapes.push(shape);
    },
    removeShape(shape: string) {
      this._shapes = this._shapes.filter((s) => s !== shape);
    },
  },
})
