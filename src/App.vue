<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
    <OrbitControls />
    <Suspense>
      <AstroidComponent :rotation-earth="currentRotation" />
    </Suspense>
    <Suspense>
      <EarthComponent />
    </Suspense>
    <TresMesh ref="earthRef">
      <TresTorusGeometry :args="[1, 0.5, 32, 64]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
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
import AstroidComponent from './components/AstroidComponent.vue';

const { onLoop } = useRenderLoop();

const earthRef = shallowRef();
const currentRotation = shallowRef();

onLoop(({ delta }) => {
  if (earthRef.value) {
    earthRef.value.rotation.y += delta;
    currentRotation.value = delta;
  }
});
</script>
