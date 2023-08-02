<script setup lang="ts">
import type { GlassVariant } from '@/interfaces';
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  variants: GlassVariant[];
}>();

const firstVariant = computed(() => props.variants[0])
const imagesUrl = firstVariant.value.media.map((variant) => variant.url);
</script>

<template>
  <div class="bg-cover bg-center h-80 w-full flex justify-center text-2xl pt-5"
    :style="`background-image: url('${imagesUrl[0]}')`">
    {{ title }}
  </div>
</template>