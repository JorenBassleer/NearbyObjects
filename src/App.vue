<template>
  <TresCanvas
    window-size
    shadows
  >
    <AsteroidNavigation
      :asteroids="allAsteroids"
      :current-focus="currentFocus"
      @on-focus="toggleFocus($event)"
    />
    <TresPerspectiveCamera
      :position="!currentFocus ? 35 : [currentFocus.position.x + 10, currentFocus.position.y + 10, currentFocus.position.z + 10]"
      :look-at="!currentFocus ? 0 : [currentFocus.position.x, currentFocus.position.y, currentFocus.position.z]"
    />
    <CameraControls
      v-bind="controlsState"
      make-default
    />
    <AsteroidComponent
      v-for="asteroid in allAsteroids"
      :key="asteroid.id"
      :asteroid="asteroid"
      :rotation-earth="currentEarthRotation"
      :position-earth="currentEarthPosition"
      :is-focused="currentFocus?.id === asteroid.id"
      @update:component="allAsteroidRefs.push({id: asteroid.id, ...$event})"
      @click="toggleFocus(asteroid)"
      @on-unfocus="toggleFocus(asteroid)"
    />
    <EarthComponent
      v-model:rotation-earth="currentEarthRotation"
      v-model:position-earth="currentEarthPosition"
      :rotation-sun="currentSunRotation"
      @update:component="earthRef = $event"
    />
    <Suspense>
      <SunComponent v-model:sunRotation="currentSunRotation" />
    </Suspense>
    <Suspense>
      <Stars :rotation="[0, currentSunRotation, 0]" />
    </Suspense>
    <TresAmbientLight :intensity="2.5" />
  </TresCanvas>
</template>

<script setup>
import {
  shallowRef, onMounted,
} from 'vue';
import { TresCanvas } from '@tresjs/core';
// eslint-disable-next-line import/no-unresolved
import { CameraControls, Stars } from '@tresjs/cientos';
import EarthComponent from './components/EarthComponent.vue';
import AsteroidComponent from './components/AsteroidComponent.vue';
import SunComponent from './components/SunComponent.vue';
import AsteroidNavigation from './components/AsteroidNavigation.vue';
import { fetchLast7Days } from './api/asteroid';

const currentSunRotation = shallowRef(0);
const currentEarthRotation = shallowRef(0);
const currentEarthPosition = shallowRef({ x: 0, y: 0, z: 0 });
const allAsteroids = shallowRef([]);
const allAsteroidRefs = shallowRef([]);
const currentFocus = shallowRef(null);

const earthRef = shallowRef();

const toggleFocus = (asteroid) => {
  if (currentFocus.value?.id === asteroid.id) currentFocus.value = null;
  else currentFocus.value = allAsteroidRefs.value.find((astroidRef) => astroidRef.id === asteroid.id);
};

const controlsState = shallowRef({
  minDistance: 0,
  maxDistance: 500,
});

onMounted(async () => {
  let fetchedData = await fetchLast7Days();
  fetchedData = Object.values(fetchedData).flat();
  allAsteroids.value = fetchedData.slice(0, 10);
});
</script>
