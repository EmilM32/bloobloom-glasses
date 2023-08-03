<script setup lang="ts">
import { Colour, Shape, type Glasses } from '@/interfaces';
import { useCollectionsStore } from '@/stores/useCollections';
import { buildCollectionUrl } from '@/utils/collection-url';
import { useFetch } from '@vueuse/core';
import { useRoute } from 'vue-router';
import SingleGlassItem from '@/components/SingleGlassItem.vue';

const collectionStore = useCollectionsStore();
const collections = collectionStore.getCollections;

const route = useRoute();
const { category } = route.params;

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