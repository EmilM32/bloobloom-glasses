<script setup lang="ts">
import { Colour, Shape, type Glasses } from '@/interfaces';
import { useCollectionsStore } from '@/stores/useCollections';
import { buildCollectionUrl } from '@/utils/collection-url';
import { useFetch } from '@vueuse/core';
import { useRoute } from 'vue-router';

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
    colour: [Colour.Black],
    shape: [Shape.Rectangle],
  }
});

const { isFetching, data, error } = useFetch<Glasses>(url).json();
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>