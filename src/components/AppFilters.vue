<script setup lang="ts">
import { AvailableFilters, Colour, Shape } from '@/interfaces';
import { computed, ref } from 'vue';

const props = defineProps<{
  activeFilter?: AvailableFilters;
}>();

const colours = Object.keys(Colour)
const shapes = Object.keys(Shape)

const selectedColours = ref<string[]>([]);
const selectedShapes = ref<string[]>([]);

const items = computed<string[]>(() => {
  if (props.activeFilter === AvailableFilters.Colour) return colours;
  if (props.activeFilter === AvailableFilters.Shape) return shapes;
  return [];
});

/**
 * Toggles the selected filter based on the active filter type.
 * @param {string} item - The selected filter item.
 */
const toggleFilter = (item: string) => {
  const value = props.activeFilter === AvailableFilters.Colour ? Colour[item as keyof typeof Colour] : Shape[item as keyof typeof Shape];
  const selectedValues = props.activeFilter === AvailableFilters.Colour ? selectedColours : selectedShapes;
  if (selectedValues.value.includes(value)) {
    selectedValues.value = selectedValues.value.filter((selectedValue) => selectedValue !== value);
  } else {
    selectedValues.value.push(value);
  }
};

/**
 * Determines whether to show an underline for the given filter item.
 * @param {string} item - The filter item to check.
 * @returns {boolean} - Whether to show an underline for the given filter item.
 */
const showUnderline = (item: string): boolean => {
  if (props.activeFilter === AvailableFilters.Colour) {
    return selectedColours.value.includes(Colour[item as keyof typeof Colour]);
  } else if (props.activeFilter === AvailableFilters.Shape) {
    return selectedShapes.value.includes(Shape[item as keyof typeof Shape]);
  }
  return false;
};
</script>

<template>
  <div class="flex gap-4 justify-evenly pt-5 pb-5">
    <span v-for="item in items" :key="item" class="cursor-pointer" :class="{ 'underline': showUnderline(item) }"
      @click="toggleFilter(item)">
      {{ item }}
    </span>
  </div>
</template>