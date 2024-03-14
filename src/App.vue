<template>
  <TresCanvas
    window-size
    shadows
  >
    <TresPerspectiveCamera />
    <OrbitControls />
    <Suspense>
      <AstroidComponent
        :rotation-earth="currentEarthRotation"
        :position-earth="currentEarthPosition"
      />
    </Suspense>
    <Suspense>
      <EarthComponent />
    </Suspense>
    <TresMesh
      ref="earthRef"
      cast-shadow
      receive-shadow
    >
      <TresTorusGeometry :args="[1, 0.5, 32, 64]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <SunComponent v-model:sunRotation="currentSunRotation" />
    <Stars :rotation="[0, starsRotation, 0]" />
    <TresPointLight
      :args="['0xff0000', 500, 1000]"
      :position="[0,0,0]"
      cast-shadow
    />
  </TresCanvas>
</template>

<script setup>
import { shallowRef } from 'vue';
import {
  TresCanvas, useRenderLoop,
} from '@tresjs/core';
// eslint-disable-next-line import/no-unresolved
import { OrbitControls, Stars } from '@tresjs/cientos';
import EarthComponent from './components/EarthComponent.vue';
import AstroidComponent from './components/AstroidComponent.vue';
import SunComponent from './components/SunComponent.vue';

const { onLoop } = useRenderLoop();

const earthRef = shallowRef();
const currentSunRotation = shallowRef(0);
const starsRotation = shallowRef(0);
const currentEarthRotation = shallowRef(0);
const currentEarthPosition = shallowRef({ x: 0, y: 0, z: 0 });

onLoop(({ delta, elapsed }) => {
  if (earthRef.value) {
    earthRef.value.rotation.y += delta;
    starsRotation.value += (delta / 100);
    currentEarthRotation.value = earthRef.value.rotation.y;
    // Get from astroid data
    const orbitRadiusX = 10;
    // Get from astroid data
    const orbitRadiusZ = 15;
    const orbitSpeed = 0.05;
    const angle = (currentSunRotation.value + elapsed) * orbitSpeed;
    earthRef.value.position.x = orbitRadiusX * Math.sin(angle);
    earthRef.value.position.z = orbitRadiusZ * Math.cos(angle);
    currentEarthPosition.value.x = earthRef.value.position.x;
    currentEarthPosition.value.z = earthRef.value.position.z;
  }
});
</script>
