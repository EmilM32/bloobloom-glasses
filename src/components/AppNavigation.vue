<script setup lang="ts">
import type { Collection } from '@/interfaces'
import { useCollectionsStore } from '@/stores/useCollections'
import { useFiltersStore } from '@/stores/useFilters'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMouseInElement } from '@vueuse/core'

const navigationButtonRef = ref<HTMLElement | null>(null)
const navigationRef = ref<HTMLElement | null>(null)
const { isOutside: isOutsideNavigationButtonRef } = useMouseInElement(navigationButtonRef)
const { isOutside: isOutsideNavigationRef } = useMouseInElement(navigationRef)

const showNav = ref(false)
watch(isOutsideNavigationButtonRef, () => {
  toggleNav()
})
watch(isOutsideNavigationRef, () => {
  toggleNav()
})

const toggleNav = () => {
  setTimeout(() => {
    showNav.value = !isOutsideNavigationButtonRef.value || !isOutsideNavigationRef.value
  }, 100)
}

const showSubMenu = ref(false)
const subMenuParentKey = ref('')
const setSubMenu = (item: string) => {
  if (isItemActive(item)) {
    subMenuParentKey.value = item
    showSubMenu.value = true
  } else {
    showSubMenu.value = false
  }
}

const collectionStore = useCollectionsStore()
const collections = collectionStore.collectionsSerialized

const emptyNavigationItems = ['home try on', 'pair for pair']

const menuItems = [...Object.keys(collections), ...emptyNavigationItems]

const isItemActive = (item: string): boolean => {
  return !emptyNavigationItems.includes(item)
}

const getSubMenuItems = (): Collection[] => {
  return collections[subMenuParentKey.value as keyof typeof collections]
}

const filtersStore = useFiltersStore()

const { push } = useRouter()
const navigateTo = (category: string) => {
  showNav.value = false
  showSubMenu.value = false
  filtersStore.setCategory(category)
  push(`/${category}`)
}
</script>

<template>
  <div>
    <div
      class="fixed top-0 left-0 w-full bg-white h-14 border-black border-b flex items-center justify-between"
    >
      <div ref="navigationButtonRef" class="ml-10 hover:underline cursor-pointer">MENU</div>
    </div>
    <div v-show="showNav" ref="navigationRef" class="fixed bg-white h-full flex md:w-auto w-full">
      <div class="flex-col md:w-[250px] w-full md:border-black md:border-r">
        <div
          v-for="item in menuItems"
          :key="item"
          class="pl-3 pt-5 pb-5 uppercase hover:bg-black hover:text-white border-black border-b"
          :class="`${isItemActive(item) ? 'cursor-pointer' : 'cursor-not-allowed'}`"
          @mouseenter="setSubMenu(item)"
        >
          {{ item }}
        </div>
      </div>
      <div v-show="showSubMenu" class="flex-col md:w-[250px] w-full md:border-black md:border-r">
        <div
          v-for="el in getSubMenuItems()"
          :key="el.id"
          @click="navigateTo(el.configuration_name)"
          class="pl-3 pt-5 pb-5 uppercase hover:bg-black hover:text-white border-black border-b cursor-pointer"
        >
          {{ el.name }}
        </div>
      </div>
    </div>
  </div>
</template>
