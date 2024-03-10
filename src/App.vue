<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
    <OrbitControls />
    <Suspense>
      <EarthComponent />
    </Suspense>
    <!-- <TresMesh ref="earthRef">
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh> -->
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<script setup>
import { shallowRef } from 'vue';
import {
  TresCanvas, useRenderLoop,
} from '@tresjs/core';
// eslint-disable-next-line import/no-unresolved
import { OrbitControls } from '@tresjs/cientos';
import EarthComponent from './components/EarthComponent.vue';

const { onLoop } = useRenderLoop();

const earthRef = shallowRef();

onLoop(({ delta }) => {
  if (earthRef.value) {
    earthRef.value.rotation.y += delta;
  }
});
</script>
