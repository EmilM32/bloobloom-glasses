import { defineStore } from 'pinia';

interface FiltersState {
  category: string;
  colours: string[];
  shapes: string[];
}

export const useFiltersStore = defineStore('filters', {
  state: (): FiltersState => ({
    category: '',
    colours: [],
    shapes: [],
  }),
  getters: {
    getCategory: (state) => {
      return state.category;
    },
    getColours: (state) => {
      return state.colours;
    },
    getShapes: (state) => {
      return state.shapes;
    },
  },
  actions: {
    setCategory(category: string) {
      this.category = category;
    },
    addColour(colour: string) {
      this.colours.push(colour);
    },
    removeColour(colour: string) {
      this.colours = this.colours.filter((c) => c !== colour);
    },
    addShape(shape: string) {
      this.shapes.push(shape);
    },
    removeShape(shape: string) {
      this.shapes = this.shapes.filter((s) => s !== shape);
    },
  },
})
