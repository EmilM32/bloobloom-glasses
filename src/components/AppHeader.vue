<script setup lang="ts">
import { useCollectionsStore } from '@/stores/useCollections'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppFilters from './AppFilters.vue'
import AppNavigation from './AppNavigation.vue'
import { AvailableFilters } from '@/interfaces'
import { useFiltersStore } from '@/stores/useFilters'

const route = useRoute()
const { category } = route.params

const filtersStore = useFiltersStore()

filtersStore.setCategory(category as string)

const collectionStore = useCollectionsStore()
const collections = collectionStore.collections

const getTitleByKey = (key: string): string => {
  return (
    collections.find((collection) => collection.configuration_name === key)?.name || 'Not found'
  )
}

const colourFilterActive = ref(false)
const shapeFilterActive = ref(false)
const showFilersPanel = computed(() => colourFilterActive.value || shapeFilterActive.value)

const toggleColourFilter = () => {
  colourFilterActive.value = !colourFilterActive.value
  shapeFilterActive.value = false
}

const toggleShapeFilter = () => {
  shapeFilterActive.value = !shapeFilterActive.value
  colourFilterActive.value = false
}

const activeFilter = computed<AvailableFilters | undefined>(() => {
  if (colourFilterActive.value) return AvailableFilters.Colour
  if (shapeFilterActive.value) return AvailableFilters.Shape
  return undefined
})
</script>

<template>
  <AppNavigation />

  <div class="grid md:grid-cols-3 grid-cols-1 border-black border-b mt-14">
    <div class="hidden md:block"></div>
    <div
      class="p-3 text-3xl font-bold flex justify-center items-center text-center border-black md:border-r md:border-l border-b md:border-b-0"
    >
      {{ getTitleByKey(filtersStore.category) }}
    </div>
    <div class="flex flex-row">
      <div
        @click="toggleColourFilter"
        class="border-black border-r md:w-1/4 w-1/2 flex justify-center items-center cursor-pointer"
        :class="{ underline: colourFilterActive }"
      >
        COLOUR
      </div>
      <div
        @click="toggleShapeFilter"
        class="border-black md:border-r md:w-1/4 w-1/2 flex justify-center items-center cursor-pointer"
        :class="{ underline: shapeFilterActive }"
      >
        SHAPE
      </div>
    </div>
  </div>
  <div v-show="showFilersPanel" class="border-b border-black">
    <AppFilters :active-filter="activeFilter" />
  </div>
</template>
