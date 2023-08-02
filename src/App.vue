<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useFetch } from '@vueuse/core';
import AppHeader from './components/AppHeader.vue';
import AppLoading from './components/AppLoading.vue';
import { type Collections } from './interfaces';
import { BASE_URL } from '@/constans';
import { useCollectionsStore } from './stores/useCollections';

const collectionStore = useCollectionsStore();

const { isFetching, data, onFetchFinally } = useFetch<Collections>(BASE_URL).json();

onFetchFinally(() => {
  if (!data.value) return;
  collectionStore.setCollections(data.value.collections);
});
</script>

<template>
  <AppHeader v-if="!isFetching" />
  <AppLoading v-if="isFetching" />
  <RouterView v-else />
</template>