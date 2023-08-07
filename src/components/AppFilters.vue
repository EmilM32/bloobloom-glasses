<script setup lang="ts">
import { AvailableFilters, Colour, Shape } from '@/interfaces';
import { useFiltersStore } from '@/stores/useFilters';
import { computed, onMounted } from 'vue';
import { useUrlSearchParams } from '@vueuse/core'

onMounted(() => {
  const params = useUrlSearchParams();
  const colourParams = params.colour as string;
  const shapeParams = params.shape as string;

  if (colourParams) {
    const colours = colourParams.split(',');
    colours.forEach((colour) => {
      filtersStore.addColour(colour);
    });
  }

  if (shapeParams) {
    const shapes = shapeParams.split(',');
    shapes.forEach((shape) => {
      filtersStore.addShape(shape);
    });
  }
});

const props = defineProps<{
  activeFilter?: AvailableFilters;
}>();

const colours = Object.keys(Colour)
const shapes = Object.keys(Shape)

const items = computed<string[]>(() => {
  if (props.activeFilter === AvailableFilters.Colour) return colours;
  if (props.activeFilter === AvailableFilters.Shape) return shapes;
  return [];
});

const filtersStore = useFiltersStore();
const filters = computed(() => props.activeFilter === AvailableFilters.Colour ? filtersStore.colours : filtersStore.shapes);
const addFilter = computed(() => props.activeFilter === AvailableFilters.Colour ? filtersStore.addColour : filtersStore.addShape);
const removeFilter = computed(() => props.activeFilter === AvailableFilters.Colour ? filtersStore.removeColour : filtersStore.removeShape);

/**
 * Toggles the selected filter based on the active filter type.
 * @param {string} item - The selected filter item.
 */
const toggleFilter = (item: string) => {
  const value = props.activeFilter === AvailableFilters.Colour ? Colour[item as keyof typeof Colour] : Shape[item as keyof typeof Shape];
  if (filters.value.includes(value)) {
    removeFilter.value(value);
  } else {
    addFilter.value(value);
  }
};

/**
 * Determines whether to show an underline for the given filter item.
 * @param {string} item - The filter item to check.
 * @returns {boolean} - Whether to show an underline for the given filter item.
 */
const showUnderline = (item: string): boolean => {
  const value = props.activeFilter === AvailableFilters.Colour ? Colour[item as keyof typeof Colour] : Shape[item as keyof typeof Shape];
  return filters.value.includes(value);
};
</script>

<template>
  <div class="md:flex gap-4 md:justify-evenly pt-5 pb-5 flex-wrap grid grid-cols-2 text-center">
    <span v-for="item in items" :key="`filter-${item}`" class="cursor-pointer"
      :class="{ 'underline': showUnderline(item) }" @click="toggleFilter(item)">
      {{ item }}
    </span>
  </div>
</template>