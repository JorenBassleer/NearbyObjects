<template>
  <TresCanvas
    window-size
    shadows
  >
    <OrbitControls />
    <AstroidComponent
      :rotation-earth="currentEarthRotation"
      :position-earth="currentEarthPosition"
    />
    <EarthComponent
      v-model:rotation-earth="currentEarthRotation"
      v-model:position-earth="currentEarthPosition"
      :rotation-sun="currentSunRotation"
    />
    <SunComponent v-model:sunRotation="currentSunRotation" />
    <Suspense>
      <Stars :rotation="[0, currentSunRotation, 0]" />
    </Suspense>
    <TresAmbientLight />
  </TresCanvas>
</template>

<script setup>
import { shallowRef, onMounted } from 'vue';
import { TresCanvas } from '@tresjs/core';
// eslint-disable-next-line import/no-unresolved
import { OrbitControls, Stars } from '@tresjs/cientos';
import EarthComponent from './components/EarthComponent.vue';
import AstroidComponent from './components/AstroidComponent.vue';
import SunComponent from './components/SunComponent.vue';
import { fetchLast7Days } from './api/asteroid';

const currentSunRotation = shallowRef(0);
const currentEarthRotation = shallowRef(0);
const currentEarthPosition = shallowRef({ x: 0, y: 0, z: 0 });

onMounted(async () => {
  // await fetchLast7Days();
});
</script>
