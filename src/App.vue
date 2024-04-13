<template>
  <Suspense>
    <LoaderSlider />
  </Suspense>
  <TresCanvas
    window-size
    shadows
  >
    <MainSpace />
  </TresCanvas>
</template>

<script setup>
import { TresCanvas } from '@tresjs/core';

import MainSpace from './components/MainSpace.vue';
import LoaderSlider from './components/overlay/LoaderSlider.vue';
</script>
