<script setup lang="ts">
import { type Glasses } from '@/interfaces';
import { useCollectionsStore } from '@/stores/useCollections';
import { buildCollectionUrl } from '@/utils/collection-url';
import { useFetch } from '@vueuse/core';
import SingleGlassItem from '@/components/SingleGlassItem.vue';
import { useFiltersStore } from '@/stores/useFilters';

const collectionStore = useCollectionsStore();
const collections = collectionStore.getCollections;

const filtersStore = useFiltersStore();
const category = filtersStore.getCategory;

const url = buildCollectionUrl(category as string, {
  page: {
    limit: 12,
    number: 1,
  },
  filters: {
    colour: [],
    shape: [],
  }
});

const { isFetching, data, error } = useFetch<Glasses>(url).json();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1px] bg-black border-black border-b">
    <SingleGlassItem v-for="item in data?.glasses" :key="`glass-item-${item.id}`" :title="item.name"
      :variants="item.glass_variants" class="bg-white" />
  </div>
</template>