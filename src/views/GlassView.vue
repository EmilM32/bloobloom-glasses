<script setup lang="ts">
import { useCollectionsStore } from '@/stores/useCollections';
import { buildCollectionUrl } from '@/utils/collection-url';
import SingleGlassItem from '@/components/SingleGlassItem.vue';
import AppLoading from '@/components/AppLoading.vue';
import { useFiltersStore } from '@/stores/useFilters';
import { ITEMS_PER_PAGE } from '@/constans';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const collectionStore = useCollectionsStore();
const collections = collectionStore.collections;

const filtersStore = useFiltersStore();

const getCollectionUrl = () => {
  return buildCollectionUrl(filtersStore.category, {
    page: {
      limit: ITEMS_PER_PAGE,
      number: collectionStore.page,
    },
    filters: {
      colour: filtersStore.colours,
      shape: filtersStore.shapes,
    }
  });
};

watch(filtersStore, () => {
  collectionStore.resetPage();
  collectionStore.resetTotalCount();
  collectionStore.fetchGlasses(getCollectionUrl());
});

const scrollComponent = ref<HTMLElement | null>(null);

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

const isLoading = computed<boolean>(() => {
  return collectionStore.isFetching;
})

const handleScroll = () => {
  let element = scrollComponent.value!
  if (element.getBoundingClientRect().bottom <= (window.innerHeight + 150) && !isLoading.value) {
    collectionStore.incrementPage();
    collectionStore.fetchMoreGlasses(getCollectionUrl());
  }
}
</script>

<template>
  <div ref="scrollComponent">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1px] bg-black border-black border-b">
      <SingleGlassItem v-for="item in collectionStore.glasses" :key="`glass-item-${item.id}`" :title="item.name"
        :variants="item.glass_variants" class="bg-white" />
    </div>
    <AppLoading v-if="isLoading" />
  </div>
</template>