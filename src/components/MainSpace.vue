<template>
  <AsteroidNavigation
    :asteroids="allAsteroids"
    :current-focus="currentFocus"
    @on-focus="toggleFocus($event)"
  />
  <TresPerspectiveCamera
    ref="cameraRef"
    :position="[10, 10, 10]"
  />
  <OrbitControls
    ref="orbitControlsRef"
    :target="[currentFocus.position.x, currentFocus.position.y, currentFocus.position.z]"
  />
  <AsteroidComponent
    v-for="asteroid in allAsteroids"
    :key="asteroid.id"
    :asteroid="asteroid"
    :rotation-earth="currentEarthRotation"
    :position-earth="currentEarthPosition"
    :is-focused="currentFocus?.id === asteroid.id"
    @update:component="allAsteroidRefs.push({id: asteroid.id, ...$event})"
    @on-unfocus="toggleFocus(asteroid)"
  />
  <EarthComponent
    v-model:rotation-earth="currentEarthRotation"
    v-model:position-earth="currentEarthPosition"
    :rotation-sun="currentSunRotation"
    @update:component="earthRef = $event"
  />

  <SunComponent v-model:sunRotation="currentSunRotation" />

  <StarsBackground :current-sun-rotation="currentSunRotation" />

  <TresAmbientLight :intensity="2.5" />
</template>

<script setup>
import { shallowRef, onMounted, ref } from 'vue';
import { gsap } from 'gsap';

import { OrbitControls } from '@tresjs/cientos';

import EarthComponent from './bodies/EarthComponent.vue';
import AsteroidComponent from './bodies/AsteroidComponent.vue';
import SunComponent from './bodies/SunComponent.vue';
import AsteroidNavigation from './overlay/AsteroidNavigation.vue';
import StarsBackground from './StarsBackground.vue';
import { fetchLast7Days } from '../api/asteroid';

const orbitControlsRef = shallowRef();
const cameraRef = shallowRef();

const currentSunRotation = shallowRef(0);

const earthRef = shallowRef();
const currentEarthRotation = shallowRef(0);
const currentEarthPosition = shallowRef({ x: 0, y: 0, z: 0 });

const allAsteroids = shallowRef([]);
const allAsteroidRefs = shallowRef([]);

const currentFocus = ref({
  id: '0',
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
});

const animateCameraPosition = (newPosition, duration = 1) => {
  gsap.to(cameraRef.value.position, {
    duration,
    x: newPosition.x + 10,
    y: newPosition.y + 10,
    z: newPosition.z + 10,
    ease: 'power4.out',
    onComplete: () => {
      // animateZoom();
    },
  });
};

const animateFocusPosition = (newPosition, duration = 1) => {
  gsap.to(currentFocus.value.position, {
    duration,
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    ease: 'power3.in',
    onComplete: () => {
      // animateZoom();
    },
  });
};

const toggleFocus = (asteroid) => {
  if (currentFocus.value?.id === asteroid.id) {
    currentFocus.value.id = '0';
    animateCameraPosition({ x: 10, y: 10, z: 10 });
    animateFocusPosition({ x: 0, y: 0, z: 0 });
  } else {
    const foundAsteroid = allAsteroidRefs.value.find((astroidRef) => astroidRef.id === asteroid.id);
    currentFocus.value.id = foundAsteroid.id;
    animateCameraPosition(foundAsteroid.position);
    animateFocusPosition(foundAsteroid.position);
  }
};

onMounted(async () => {
  const fetchedData = await fetchLast7Days();
  allAsteroids.value = Object.values(fetchedData).flat();
});
</script>
