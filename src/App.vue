<template>
  <Suspense>
    <LoaderSlider />
  </Suspense>
  <TresCanvas
    :key="reRender"
    window-size
    shadows
  >
    <MainSpace @re-render="reRender += 1" />
  </TresCanvas>
</template>

<script setup>
import { ref } from 'vue';
import { TresCanvas } from '@tresjs/core';

import MainSpace from './components/MainSpace.vue';
import LoaderSlider from './components/overlay/LoaderSlider.vue';

const reRender = ref(6546);
</script>
