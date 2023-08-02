<script setup lang="ts">
import { useCollectionsStore } from '@/stores/useCollections';
import { useRoute } from 'vue-router';

const route = useRoute();
const { category } = route.params;

const collectionStore = useCollectionsStore();

const collections = collectionStore.getCollections;

const collectionTitle = collections.find((collection) => collection.configuration_name === category)?.name || 'Not found';
</script>

<template>
  <div class="h-14 border-black border-b flex items-center justify-between">
    <div class="ml-10 hover:underline cursor-pointer">MENU</div>
  </div>
  <div class="grid md:grid-cols-3 grid-cols-1 border-black border-b">
    <div class="hidden md:block"></div>
    <div
      class="text-3xl font-bold flex justify-center items-center border-black md:border-r md:border-l border-b md:border-b-0">
      {{ collectionTitle }}</div>
    <div class="flex flex-row">
      <div class="border-black border-r md:w-1/4 w-1/2 flex justify-center items-center cursor-pointer">COLOUR</div>
      <div class="border-black md:border-r md:w-1/4 w-1/2 flex justify-center items-center cursor-pointer">SHAPE</div>
    </div>
  </div>
</template>
