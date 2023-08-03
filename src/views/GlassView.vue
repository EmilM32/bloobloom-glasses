<script setup lang="ts">
import { useCollectionsStore } from '@/stores/useCollections';
import { buildCollectionUrl } from '@/utils/collection-url';
import SingleGlassItem from '@/components/SingleGlassItem.vue';
import { useFiltersStore } from '@/stores/useFilters';
import { ITEMS_PER_PAGE } from '@/constans';
import { watch } from 'vue';

const collectionStore = useCollectionsStore();
const collections = collectionStore.collections;

const filtersStore = useFiltersStore();

watch(filtersStore, () => {
  const url = buildCollectionUrl(filtersStore.category, {
    page: {
      limit: ITEMS_PER_PAGE,
      number: 1,
    },
    filters: {
      colour: filtersStore.colours,
      shape: filtersStore.shapes,
    }
  });

  collectionStore.fetchGlasses(url);
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1px] bg-black border-black border-b">
    <SingleGlassItem v-for="item in collectionStore.glasses" :key="`glass-item-${item.id}`" :title="item.name"
      :variants="item.glass_variants" class="bg-white" />
  </div>
</template>