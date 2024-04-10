<template>
  <Suspense>
    <LoaderSlider />
  </Suspense>
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
      :position="[currentFocus.position.x + 10, currentFocus.position.y + 10, currentFocus.position.z + 10]"
      :look-at="[currentFocus.position.x, currentFocus.position.y, currentFocus.position.z]"
    />
    <!-- <CameraControls
        v-bind="controlsState"
      /> -->
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
  </TresCanvas>
</template>

<script setup>
import {
  shallowRef, onMounted, ref,
} from 'vue';
import { gsap } from 'gsap';
import { TresCanvas } from '@tresjs/core';
import { CameraControls } from '@tresjs/cientos';
import EarthComponent from './components/EarthComponent.vue';
import AsteroidComponent from './components/AsteroidComponent.vue';
import SunComponent from './components/SunComponent.vue';
import AsteroidNavigation from './components/AsteroidNavigation.vue';
import StarsBackground from './components/StarsBackground.vue';
import LoaderSlider from './components/LoaderSlider.vue';
import { fetchLast7Days } from './api/asteroid';

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

const hasFinishedLoading = ref(false);

// const controlsState = shallowRef({
//   minDistance: 0,
//   maxDistance: 500,
// });

// const animateZoom = () => {
// gsap.to(currentZoom, {
//   duration: 1.5,
//   value: 100,
//   onUpdate: () => {
//     console.log('currentZoom', currentZoom.value);
//   }
// });
// };

const animateCameraPosition = (newPosition, duration = 2) => {
  gsap.to(currentFocus.value.position, {
    duration,
    x: newPosition.x + 10,
    y: newPosition.y + 10,
    z: newPosition.z + 10,
    ease: 'power3.out',
    onComplete: () => {
      // animateZoom();
    },
  });
};

const toggleFocus = (asteroid) => {
  if (currentFocus.value?.id === asteroid.id) {
    currentFocus.value.id = '0';
    animateCameraPosition({ x: 0, y: 0, z: 0 });
  } else {
    const foundAsteroid = allAsteroidRefs.value.find((astroidRef) => astroidRef.id === asteroid.id);
    currentFocus.value.id = foundAsteroid.id;
    animateCameraPosition(foundAsteroid.position);
  }
};

onMounted(async () => {
  const fetchedData = await fetchLast7Days();
  allAsteroids.value = Object.values(fetchedData).flat();
});
</script>
